import { opine } from "https://deno.land/x/opine@2.1.2/mod.ts";
import { parse } from "https://deno.land/std@0.128.0/flags/mod.ts"

const args = parse(Deno.args);
const app = opine();

app.all('/proxy', function(req, res) {

  // Set CORS headers: allow all origins, methods, and headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

  if(req.method === 'OPTIONS') { // CORS Preflight
    res.send();
  } else {
    fetch(req.query.url).then(r => r.body.pipe(res));
  }
  
});

const listener = app.listen(args.port || 3000, function() {
  console.log('Proxy is listening on port ' + args.port || 3000);
});
