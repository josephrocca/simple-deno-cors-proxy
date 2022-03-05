# Simple Deno CORs Proxy

## Usage:
Start the server:
```js
deno run --allow-net https://github.com/josephrocca/simple-deno-cors-proxy/raw/b6537f6/main.js --port=3000
```
Use it like this:
```js
await fetch("http://localhost:3000/?url=https://example.com");
```
