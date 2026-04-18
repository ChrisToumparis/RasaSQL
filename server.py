#!/usr/bin/env python3
"""
Reverse proxy + static file server.

- Serves static files on port 8000 (like SimpleHTTPRequestHandler)
- Proxies POST /webhooks/rest/webhook to http://localhost:5005/webhooks/rest/webhook
- Adds CORS headers so the browser can reach Rasa through the same domain
"""

import http.server
import urllib.request
import urllib.error
import json
import os

RASA_URL = "http://localhost:5005"
PORT = 8000


class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    """Extend SimpleHTTPRequestHandler with a Rasa reverse-proxy route."""

    # ------------------------------------------------------------------ #
    # CORS helpers                                                         #
    # ------------------------------------------------------------------ #

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        """Handle pre-flight CORS requests."""
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    # ------------------------------------------------------------------ #
    # Proxy route                                                          #
    # ------------------------------------------------------------------ #

    def do_POST(self):
        """Proxy POST /webhooks/rest/webhook → Rasa."""
        if self.path == "/webhooks/rest/webhook":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)

            rasa_endpoint = f"{RASA_URL}/webhooks/rest/webhook"
            req = urllib.request.Request(
                rasa_endpoint,
                data=body,
                headers={"Content-Type": "application/json"},
                method="POST",
            )

            try:
                with urllib.request.urlopen(req) as resp:
                    response_body = resp.read()
                    self.send_response(resp.status)
                    self.send_header("Content-Type", "application/json")
                    self._send_cors_headers()
                    self.end_headers()
                    self.wfile.write(response_body)
            except urllib.error.HTTPError as e:
                error_body = e.read()
                self.send_response(e.code)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(error_body)
            except urllib.error.URLError as e:
                error_payload = json.dumps({"error": str(e.reason)}).encode()
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(error_payload)
        else:
            self.send_response(404)
            self.end_headers()

    # ------------------------------------------------------------------ #
    # Static files (GET / HEAD handled by SimpleHTTPRequestHandler)       #
    # ------------------------------------------------------------------ #

    def do_GET(self):
        # Let the parent class serve static files as usual
        super().do_GET()

    def log_message(self, fmt, *args):  # noqa: N802
        print(f"[server] {self.address_string()} - {fmt % args}")


if __name__ == "__main__":
    # Serve files from the directory where this script lives
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with http.server.HTTPServer(("", PORT), ProxyHandler) as httpd:
        print(f"[server] Serving static files and proxying Rasa on port {PORT}")
        httpd.serve_forever()
