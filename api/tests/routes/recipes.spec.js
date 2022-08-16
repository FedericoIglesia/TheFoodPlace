/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

let agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
  summary: "bla bla",
};

describe("Recipe routes", () => {
  beforeEach(() => {
    agent = session(app);
  });

  describe("/recipes/:id", () => {
    it("should return 200 and an id, title and description", async () => {
      await agent
        .get("/recipes/716426")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("summary");
        });
    });
  });
  describe("/recipe", () => {
    it("deberia devolver la receta creada con un id en formato UUID", async () => {
      const response = await agent.post("/recipe").send({
        name: "tortilla de acelga",
        summary: "comida muy rica",
        diets: "vegetarian",
      });
      expect(response.status).to.eql(200);
    });
  });
});
