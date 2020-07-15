import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search Object
 * - Shopping list object
 * - Current receipe object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // 4. search for recipes
        await state.search.getResults();

        // 5. render results on UI after promise resolved
        clearLoader();
        searchView.renderResults(state.search.results);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);


// I AM A GLOBAL CONTROLLER