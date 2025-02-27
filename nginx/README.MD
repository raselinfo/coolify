> you can set is to "auto" to tell nginx to use intelligently set based on the number of CPUs

if you have 1 worker process then you will be able to server 1024 clients request
if you have 2 then 2\*1024 = 2048 clients request

```
worker_processes 1
```

### events

- This sets the maximum number of simultaneous connections that each worker process can handle to 1024
- Worker processes handle the actual processing of requests

```
worker_connections 1024;
```

### http -> server

- upstream: Define the group of service here. Nginx use default round-robin algorithm to handle and send the request in cicely order ( app1(1), app2(2), app3(2), app1(4), app2(5), app3(6)). If one server is handling slow requests (like file uploads) and Other servers can handle quick requests (like page views). then you can use 'least_conn' load balancing algorithm. then nginx send the request who have less connection to the client.
- mime.types: Nginx use this mime types . and if server send the file to the client then with the help of mime.type client can know the type of file and handle it accordingly
- listens : The ip address and port number on which the server will accept connections
- server_name: Which domain or ip address this server will respond to
- location: How to handle requests to specific paths or URLs or files (/ is the root path)
- location.proxy_pass: Forward the request to the upstream (the server that will handle the request) and send the response back to the client
- location.proxy_http_version:
- location.proxy_set_header: send the client request headers information to the upstream server. it has various headers like upgrade, connection, host, x-forwarded-for, x-forwarded-proto, x-real-ip, cookie, referer, user-agent, authorization, custom-headers etc
-

## Generate Self-Signed SSL Certificate

Let me explain the OpenSSL command shown in the image:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

Command breakdown:

1. `openssl req`: Initiates OpenSSL's certificate signing request (CSR) management
2. `-x509`: Creates a self-signed certificate instead of a CSR
3. `-nodes`: No DES - means the private key won't be encrypted (no passphrase needed)
4. `-days 365`: Certificate will be valid for 1 year
5. `-newkey rsa:2048`: Creates a new RSA key pair with 2048-bit length
6. `-keyout nginx-selfsigned.key`: Saves the private key to this file
7. `-out nginx-selfsigned.crt`: Saves the certificate to this file

This command generates:

1. A self-signed SSL certificate (`nginx-selfsigned.crt`)
2. A private key (`nginx-selfsigned.key`)

These files can be used to enable HTTPS in your Nginx configuration. This is useful for development or testing environments, though for production you should use certificates from a trusted Certificate Authority (CA).

Note: When you run this command, you'll be prompted to enter information for the certificate (country, state, etc.).

Note: After enable the SSL, you we can connect to the server using https://localhost:443/
Also we can connect with http://localhost:8080/ if the 8080 port is open. But it is not recommended to use 8080 port for production. and redirection user to the https connection even if the request for http
