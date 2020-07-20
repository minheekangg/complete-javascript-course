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
}