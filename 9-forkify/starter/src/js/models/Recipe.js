import axios from 'axios';
import { proxy } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?&q=${this.id}`);
            this.results = res.data.recipes;
        }catch (err) {
            console.log('Error: ', err);
        }
    }
}