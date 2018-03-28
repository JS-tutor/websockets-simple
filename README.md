# websockets-simple
Testing socket.io on node.js and browser client

## How to start

### Development mode

1. Run two node instances with `npm run dev-client` and `npm run dev-server`
2. Open your browser with address [http://localhost:8000](http://localhost:8000)

### Production mode

1. Build javascript application and style bundle with `npm run client`
2. Configure your web server folder to `./public` folder. You can user **Nginx** for example
3. Run node server with `npm run server`
4. Open your browser with your web-server in address. For default [http://localhost](http://localhost)
 