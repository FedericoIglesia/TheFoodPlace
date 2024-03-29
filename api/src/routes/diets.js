require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

const router = Router();

// router.get("/", async (req, res) => {
router.get("/", async (req, res) => {
  // Getting all diets from the API and loading them into the DB ==>  (i don't get all diets according to the Read me so i manually loaded them in the sync method)
  const dietsFromApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=900000`
  );

  const diets = await dietsFromApi.data.results;

  const plainDiets = diets.map((el) => el.diets).flat();

  let filteredDiets = [...new Set(plainDiets)];
  console.log(filteredDiets);
  filteredDiets.forEach(
    async (diet) => await Diet.findOrCreate({ where: { name: diet } })
  );

  try {
    // const dietsFromDb = await Diet.findAll();
    Diet.findAll().then((dietsFromDb) => {
      res.send(dietsFromDb.map((d) => d.name));
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
