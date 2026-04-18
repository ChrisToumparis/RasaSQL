#!/usr/bin/env python3
"""
HTTP server that:
  - Serves static files from the current directory on port 8000
  - Proxies POST /webhooks/rest/webhook to Rasa on localhost:5005
"""

import http.server
import urllib.request
import urllib.error
import json
import os

RASA_URL = "http://localhost:5005/webhooks/rest/webhook"
PORT = 8000


class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    """Extends SimpleHTTPRequestHandler with a reverse proxy for Rasa."""

    def do_POST(self):
        if self.path == "/webhooks/rest/webhook":
            self._proxy_to_rasa()
        else:
            self.send_error(404, "Not Found")

    def _proxy_to_rasa(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length) if content_length > 0 else b""

        req = urllib.request.Request(
            RASA_URL,
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                response_body = resp.read()
                self.send_response(resp.status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Length", str(len(response_body)))
                self.end_headers()
                self.wfile.write(response_body)
        except urllib.error.HTTPError as e:
            error_body = e.read()
            self.send_response(e.code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(error_body)))
            self.end_headers()
            self.wfile.write(error_body)
        except Exception as e:
            msg = json.dumps({"error": str(e)}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, fmt, *args):
        print(f"[HTTP] {self.address_string()} - {fmt % args}")


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.ThreadingHTTPServer(("", PORT), ProxyHandler) as httpd:
        print(f"[HTTP] Serving on port {PORT}")
        print(f"[HTTP] Proxying /webhooks/rest/webhook -> {RASA_URL}")
        httpd.serve_forever()
