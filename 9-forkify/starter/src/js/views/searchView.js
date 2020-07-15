import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
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
                    <h4 class="results__name">${title}</h4>
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