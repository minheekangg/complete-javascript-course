import axios from 'axios';
import { proxy } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch (err) {
            console.log('Error: ', err);
            alert('Something went wrong!')
        }
    }

    calcTime() {
        //assuming we need 15 min for each ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng/3);
        this.time = period * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'ozs', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']

        const newIngredients = this.ingredients.map(i=> {
            // uniform units
            let ingredient = i.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " " );

            // parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(" ");
            const unitIndex = arrIng.findIndex(each=>units.includes(each));

            let objIngredient;
            if (unitIndex === -1) {
                // there is no unit and no number in first position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            } else if (unitIndex > -1) {
                // there is a unit 
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace("-", "+"));
                } else {
                    // eg. 4 1 / 2 cups will be arrCount is[4, 1 / 2] => 4+1/2 => 4.5
                    count = eval(arrIng.slice(0, unitIndex).join("+"))
                }

                objIngredient = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(" ")
                }

            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit but element is a number
                objIngredient = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(" ")
                }
            }

            return objIngredient;
        })
        this.ingredients = newIngredients;
    }
}