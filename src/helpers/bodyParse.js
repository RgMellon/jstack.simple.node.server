function bodyParse(request, callback) {
  let body = "";

  request.on("data", (chunk) => {
    console.log(chunk);
    body += chunk;
  });

  request.on("end", () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

module.exports = bodyParse;
