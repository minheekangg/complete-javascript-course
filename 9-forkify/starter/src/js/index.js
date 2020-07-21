import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
// I AM A GLOBAL CONTROLLER
/** Global state of the app
 * - Search Object
 * - Shopping list object
 * - Current receipe object
 * - Liked recipes
 */
const state = {
    likes: new Likes(),
};
// window.state = state;

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
            console.log(err)
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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //update search view 
        if (state.search) {
            searchView.highlightSelected(id);
        }

        //3. Create new recipe object
        state.recipe = new Recipe(id);
        
        try {
            //4. Get Recipe Data
            await state.recipe.getRecipe();
            window.r = state.recipe;
    
            //5. calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
    
            //6. render results on UI after promise resolved
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (err) {
            alert('Error processing recipe!')
        }
    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));

// SHOPPING LIST CONTROLLER - triggered by below click fn
const controlList = () => {
    //Create a new list if there's no list yet.
    if (!state.list) state.list = new List();

    //add ingredients to list and UI
    state.recipe.ingredients.forEach(el=>{
        const newItem = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(newItem);
    })

}


// Handle delete and update shopping list
elements.shoppingList.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);
        //delete from ui
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})

likesView.toggleLikeMenu(state.likes.getNumLikes())
//LIKE CONTROLLER
const controlLike = () => {
    // //Create a new likes if there's no likes yet. - set it to global
    // if (!state.likes) state.likes = new Likes();

    const currId = state.recipe.id;
    if (!state.likes.isLiked(currId)) {
        // add like to the data
        const newLike = state.likes.addLike(currId, state.recipe.title, state.recipe.author, state.recipe.img);
        // toggle like button
        likesView.toggleLikeBtn(true);
        // add like to UI list
        likesView.renderLike(newLike);
    } else {
        // remove like to the data
        state.likes.deleteLike(currId);
        // toggle like button
        likesView.toggleLikeBtn(false);
        // remove like to UI list
        likesView.deleteLike(currId);
    }
    // console.log(state.likes)
    likesView.toggleLikeMenu(state.likes.getNumLikes())
}

//Handling recipe button clicks
elements.recipe.addEventListener('click', e=> {
    if (e.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIng(state.recipe)
    }
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIng(state.recipe)

    } 
    
    if (e.target.matches('.recipe__btn-add, .recipe__btn-add *') && state.recipe) {
        //TRIGGER SHOPPING LIST CONTROLLER HERE! - TRIGGERED BY RECIPE VIEW BTTN CLICK
        controlList();
    }

    if (e.target.matches('.recipe__love, .recipe__love *') && state.recipe) {
        controlLike();
    }
    // console.log(state.recipe)
})


