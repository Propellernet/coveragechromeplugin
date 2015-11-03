angular.module("services", [])
  .value("userId", 1)
  .value("email", 'alan@coveragebook.com')
  .value("name", 'alan')
  .service("user", ["userId", "email", "name", User]);
