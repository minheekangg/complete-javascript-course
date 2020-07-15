import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 13) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr)=>{
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
    }
    return `${newTitle.join(' ')} ...`;
}

const renderRecipe = recipe => {
    const { image_url, recipe_id, title, publisher } = recipe;
    const markup = `
        <li>
            <a class="results__link" href="#${recipe_id}">
                <figure class="results__fig">
                    <img src="${image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(title)}</h4>
                    <p class="results__author">${publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup)
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}