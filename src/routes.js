const UsersController = require("./controller/UsersController");

module.exports = [
  {
    method: "GET",
    endpoint: "/users",
    handler: UsersController.listAll,
  },

  {
    method: "GET",
    endpoint: "/users/:id",
    handler: UsersController.getUserById,
  },

  {
    method: "POST",
    endpoint: "/users",
    handler: UsersController.createUser,
  },
];
