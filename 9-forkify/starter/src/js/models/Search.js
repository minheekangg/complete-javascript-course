import axios from 'axios';
import { proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.results = res.data.recipes;
        } catch (err) {
            alert(err);
        }
    }
}

