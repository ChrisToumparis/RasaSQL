#!/usr/bin/env python3
"""Simple HTTP server to serve static files on port 8000."""

import http.server
import socketserver

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving static files on port {PORT}")
    httpd.serve_forever()
