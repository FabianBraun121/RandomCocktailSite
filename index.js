import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("http://www.thecocktaildb.com/api/json/v1/1/random.php");
        const drink = response.data.drinks[0];
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            if (ingredient) {
                const measure = drink[`strMeasure${i}`];
                ingredients.push({ ingredient, measure });
            } else {
                break;
            }
        }
        console.log(ingredients);
        res.render("index.ejs", {
            drinkName: drink.strDrink,
            drinkCategory: drink.strCategory,
            instructions: drink.strInstructions,
            imageRef: drink.strDrinkThumb,
            ingredients: ingredients
        });
    } catch (error) {
        console.error("Error fetching drink:", error);
        res.status(500).send("Error fetching drink");
    }
});

app.listen(port, () => {
    console.log(`Listening at port ${port}!`);
});