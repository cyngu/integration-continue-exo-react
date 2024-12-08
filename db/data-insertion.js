db = db.getSiblingDB("ynov-ci");

db.roles.insertMany([
  {
    name: "admin",
    permissions: ["delete", "read"]
  },
  {
    name: "employee",
    permissions: ["read"]
  }
]);

const adminRole = db.roles.findOne({ name: "admin" });

db.users.insertOne({
  name: "fenoll",
  firstname: "loise",
  email: "loise.fenoll@ynov.com",
  password: "ANKymoUTFu4rbybmQ9Mt",
  birthDate: "1990-01-01T00:00:00.000Z",
  city: "Paris",
  zipcode: "75001",
  roleId: adminRole._id
});