import request from "supertest";
import { app } from "../../app";
import createConnection from "../../database";

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new user", async () => {
    const user = {
      name: "John Doe1",
      email: "john@doe1.com",
    };

    const response = await request(app).post("/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should throw an error if the user already exists", async () => {
    const user = {
      name: "John Doe1",
      email: "john@doe1.com",
    };

    const response = await request(app).post("/users").send(user);

    expect(response.status).toBe(409);
  });
});
