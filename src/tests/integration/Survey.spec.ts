import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../../app";
import createConnection from "../../database";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const survey = {
      title: "test title 1",
      description: "test description 1",
    };

    const response = await request(app).post("/surveys").send(survey);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    const survey = {
      title: "test title 2",
      description: "test description 2",
    };

    await request(app).post("/surveys").send(survey);

    const response = await request(app).get("/surveys");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
