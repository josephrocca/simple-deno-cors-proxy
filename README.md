# Simple Deno CORs Proxy

## Usage:
Start the server (be sure to use a commit hash like `d3031a7` to guard against backward-incompatible changes, as shown below):
```sh
deno run --allow-net https://github.com/josephrocca/simple-deno-cors-proxy/raw/d3031a7/main.js --port=3000
```
Use it like this:
```js
let text = await fetch("http://localhost:3000/?url=https://example.com").then(r => r.text());
console.log(text);
```
