import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
// I AM A GLOBAL CONTROLLER
/** Global state of the app
 * - Search Object
 * - Shopping list object
 * - Current receipe object
 * - Liked recipes
 */
const state = {};

// SEARCH CONTROLLER
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

        try {
            // 4. search for recipes
            await state.search.getResults();
    
            // 5. render results on UI after promise resolved
            clearLoader();
            searchView.renderResults(state.search.results);
        } catch (err) {
            alert('Error processing search!')
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage)
    }
})

// RECIPE CONTROLLER
const controlRecipe = async () => {
    // 1. Get id from URL
    const id = window.location.hash.replace("#", "");

    if (id) {
        //2. Prepare for UI changes
        
        //3. Create new recipe object
        state.recipe = new Recipe(id);
        
        try {
            //4. Get Recipe Data
            await state.recipe.getRecipe();
    
            //5. calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            //6. render results on UI after promise resolved
            console.log(state.recipe)
        } catch (err) {
            alert('Error processing recipe!')
        }
    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));