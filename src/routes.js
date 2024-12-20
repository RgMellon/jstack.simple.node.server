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

  {
    method: "PUT",
    endpoint: "/users/:id",
    handler: UsersController.updateUser,
  },

  {
    method: "DELETE",
    endpoint: "/users/:id",
    handler: UsersController.remove,
  },
];
