import { opine } from "https://deno.land/x/opine@2.1.2/mod.ts";
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

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Proxy is listening on port ' + listener.address().port);
});
