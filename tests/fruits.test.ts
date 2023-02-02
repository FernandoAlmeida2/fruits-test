import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";

const server = supertest(app);

describe("POST /fruits", () => {
  it("should respond with status 409 when body is not valid", async () => {
    const response = await server.post("/fruits").send({
      fruit: "banana",
      price: 2000,
    });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should respond with status 201 when body is valid", async () => {
    const response = await server.post("/fruits").send({
      name: "banana",
      price: 2000,
    });

    expect(response.status).toBe(httpStatus.CREATED);
  });
  it("should respond with status 404 when the name already exists", async () => {
    const response = await server.post("/fruits").send({
      name: "banana",
      price: 2000,
    });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe("GET /fruits", () => {
  it("should respond with status 200 and a fruits array", async () => {
    const response = await server.get("/fruits");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /fruits/:id", () => {
  it("should respond with status 404 when the fruit name not found", async () => {
    const response = await server.get("/fruits/100");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    
  });
  it("should respond with status 200 and a fruit object", async () => {
    const response = await server.get("/fruits/1");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });
});
