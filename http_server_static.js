var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  if(urlObj.pathname === "/getcity"){
    fs.readFile("cities.dat.txt", function (err,data) {
      var cities = data.toString().split("\n").filter(function(item){
        return (item.lastIndexOf(urlObj.query.q, 0) === 0);
      });
      var city_string = "[\n";
      for(var city = 0; city < cities.length; city++){
        if(city_string.length != 2){
          city_string += ",\n";
        }
        city_string += "{\"city\":\"" + cities[city] + "\"}";
      }
      city_string += "\n]";
      res.end(city_string);
    });
  }
  else{
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
      if (err) {
	res.writeHead(404);
	res.end(JSON.stringify(err));
	return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(80);



/*var options = {
    hostname: 'localhost',
    port: '80',
    path: '/hello.html'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    console.log(serverData);
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();*/
