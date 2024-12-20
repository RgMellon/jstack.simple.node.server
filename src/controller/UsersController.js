let users = require("../mocks/users");

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
    const { body } = request;
    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: Number(lastUserId) + 1,
      name: body.name,
    };

    users.push(newUser);
    return response.send(200, newUser);
  },

  updateUser: (request, response) => {
    const { name } = request.body;
    const { id } = request.params;

    const userExist = users.find((user) => user.id == id);

    if (!userExist) {
      return response.send(404, {
        error: "User not found",
      });
    }

    users = users.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          name,
        };
      } else {
        return user;
      }
    });

    response.send(200, { users });
  },

  remove: (request, response) => {
    const { id } = request.params;

    const userExist = users.find((user) => user.id == id);

    if (!userExist) {
      return response.send(404, {
        error: "User not found",
      });
    }

    users = users.filter((user) => user.id !== id);

    response.send(200, { users });
  },
};
