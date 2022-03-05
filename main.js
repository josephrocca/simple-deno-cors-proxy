import { parse } from "https://deno.land/std@0.128.0/flags/mod.ts"
const args = parse(Deno.args);
const port = args.port || 3000;

const server = Deno.listen({ port });
console.log(`Proxy server running. Use it like this:  http://localhost:${port}/?url=https://example.com`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    try {
      console.log("Handling:", requestEvent.request.url);
      const queryParams = new URL(requestEvent.request.url).searchParams;
      let url = queryParams.get("url");
      if(!url) {
        requestEvent.respondWith(new Response(""));
        continue;
      }

      let headers = Object.fromEntries(requestEvent.request.headers.entries());
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "GET, PUT, PATCH, POST, DELETE";
      
      let body = await fetch(url).then(r => r.body);
      requestEvent.respondWith( new Response(body, {status:200, headers}) );
    } catch(e) {
      console.error(e);
    }
  }
}
