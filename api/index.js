//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

    // copying all diets from https://spoonacular.com/food-api/docs#Diets to load into DB.
    // const diets = [
    //   "gluten free",
    //   "ketogenic",
    //   "vegetarian",
    //   "lacto ovo vegetarian",
    //   "dairy free",
    //   "vegan",
    //   "pescatarian",
    //   "paleo",
    //   "primal",
    //   "whole30",
    //   "paleolithic",
    //   "fodmap friendly",
    // ];

    // diets.forEach(
    //   async (diet) => await Diet.findOrCreate({ where: { name: diet } })
    // );

    // diets.forEach((diet) => Diet.findOrCreate({ where: { name: diet } }));

    // Promise.all([diets]).then(() => console.log("OK"));
  });
});
