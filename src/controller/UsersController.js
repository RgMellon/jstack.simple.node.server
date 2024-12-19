const users = require("../mocks/users");

module.exports = {
  listAll: (request, response) => {
    const { order } = request.query;

    const result = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });

    response.send(200, result);
  },

  getUserById: (request, response) => {
    const { id } = request.params;

    result = users.find((user) => user.id == Number(id));

    if (!result) {
      return response.send(400, { error: "User not found" });
    }
    return response.send(200, { user: result });
  },

  createUser: (request, response) => {
    let body = "";

    request.on("data", (chunk) => {
      console.log(chunk);
      body += chunk;
    });

    request.on("end", () => {
      body = JSON.parse(body);

      const lastUserId = users[users.length - 1].id;

      const newUser = {
        id: Number(lastUserId) + 1,
        name: body.name,
      };

      users.push(newUser);
      return response.send(200, newUser);
    });
  },
};
