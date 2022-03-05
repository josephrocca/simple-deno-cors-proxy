import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { parse } from "https://deno.land/std@0.128.0/flags/mod.ts"

const args = parse(Deno.args);
const port = args.port || 3000;

async function handler(req) {
  console.log("Handling:", req.url);
  const queryParams = new URL(req.url).searchParams;
  let url = queryParams.get("url");
  if(!url) {
    return new Response("Please pass a url query parameter.");
  }

  let headers = Object.fromEntries(req.headers.entries());
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "GET, PUT, PATCH, POST, DELETE";
  
  let body = await fetch(url).then(r => r.body);
  return new Response(body, {status:200, headers});
}

serve(handler, {port});

console.log(`Proxy server running. Use it like this:  http://localhost:${port}/?url=https://example.com`);
