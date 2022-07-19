require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        dietType: el.dietType,
        dishType: el.dishType,
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
    console.error(err);
  }
};

// doing the get route for recipes. This route could be followed by a query, taking that into account as well.
router.get("/recipes", async (req, res) => {
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

module.exports = router;
