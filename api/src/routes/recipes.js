require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const router = Router();

//function to fetch the data from the api for the required fields, returning those fields
//make sure that there are analyzedInstructions AND steps within it
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const apiInfo = await apiUrl.data.results.map((el) => {
      return {
        id: el.id,
        name: el.title,
        summary: el.summary,
        diets: el.diets,
        dishType: el.dishType,
        image: el.image,
        healthScore: el.healthScore,
        steps:
          el.analyzedInstructions[0] && el.analyzedInstructions[0].steps
            ? el.analyzedInstructions[0].steps.map((s) => s)
            : "",
      };
    });

    return apiInfo;
  } catch (err) {
    console.log(err);
  }
};

//function to get the data from the database. I'm getting the data from Recipe model, and including the Diet model to get the name. Relations are completed in db.js.
const getDbInfo = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//function to concatenate all data from the API & the database. Returning all data.
const getEverything = async () => {
  try {
    const apiData = await getApiInfo();
    const dbData = await getDbInfo();

    const AllInfo = apiData.concat(dbData);

    return AllInfo;
  } catch (err) {
    console.log(err);
  }
};

// doing the get route for recipes. This route could be followed by a query, taking that into account as well.
router.get("/", async (req, res) => {
  const name = req.query.name;
  let allRecipes = await getEverything();

  //if there's a query, filter all recipes containing that name. Making sure to compare lowercase names from the query with lowercase names from the total recipes data.
  if (name) {
    let recipeName = await allRecipes.filter((a) =>
      a.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName.length
      ? res.send(recipeName)
      : res.status(404).send("No existe la receta ingresada");
  } else {
    res.send(allRecipes);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length > 31) {
      const dbId = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (dbId) {
        const dbInfo = {
          id: dbId.id,
          name: dbId.name,
          summary: dbId.summary,
          healthScore: dbId.healthScore,
          steps: dbId.steps,
          diets: dbId.diets,
        };

        res.json(dbInfo);
      } else res.status(404).send("There is no recipe for the provided ID");
    } else {
      const apiId = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      let results = apiId.data;
      let recipe = {
        id: results.id,
        name: results.title,
        summary: results.summary,
        diets: results.diets,
        dishType: results.dishType,
        healthScore: results.healthScore,
        steps:
          results.analyzedInstructions[0] &&
          results.analyzedInstructions[0].steps
            ? results.analyzedInstructions[0].steps.map((s) => s)
            : "",
      };
      if (recipe) res.json(recipe);
      else res.status(404).send("There is no recipe for the provided ID");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  //destructuring the req via body
  let { name, summary, healthScore, steps, createdInDb, diet } = req.body;

  //searching for previous entries to the db that match what will be submitted
  let checks = await Recipe.findAll({
    where: {
      name,
      summary,
      healthScore,
      steps,
    },
  });

  //if a previous entry with the same information exists, posting is not allowed and user is advised about it. The idea is to prevent duplicate recipes being stored in the database.
  if (!checks.length) {
    let recipeCreated = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      createdInDb,
    });
    let dietDb = await Diet.findAll({
      where: { name: diet },
    });

    recipeCreated.addDiet(dietDb);
    res.send("Recipe successfully created");
  } else res.status(409).send("This recipe already exists!");
});

module.exports = router;
