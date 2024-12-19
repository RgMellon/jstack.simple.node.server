const http = require("http");
const routes = require("./routes");
const url = require("url");
const bodyParse = require("./helpers/bodyParse");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  let { pathname } = parsedUrl;
  let id = null;

  let splitedEndpoint = pathname.split("/").filter(Boolean);

  if (splitedEndpoint.length > 1) {
    pathname = `/${splitedEndpoint[0]}/:id`;
    id = splitedEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.method === request.method && routeObj.endpoint === pathname
  );

  if (route) {
    request.query = parsedUrl.query;
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {
        "Content-type": "application.json",
      });

      response.end(JSON.stringify(body));
    };

    if (["POST", "PUT"].includes(request.method)) {
      bodyParse(request, () => {
        route.handler(request, response);
      });
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, {
      "content-type": "text-html",
    });

    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen("3000", () => {
  console.log("to on!");
});
