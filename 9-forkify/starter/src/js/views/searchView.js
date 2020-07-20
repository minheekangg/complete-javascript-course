import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 12) => {
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

const createButton = (page, type) => {
    return `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page-1 : page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;
}

const renderButtons = (page, numofResults, resPerPage) => {
    const pages = Math.ceil(numofResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //only button to go to next page
        button = createButton(page, 'next');
    } else if (page === pages && pages > 1) {
        //only button to go to prev page
        button = `${createButton(page, 'prev')} ${createButton(page, 'next')}`;
    } else if (page < pages) {
        //button to go to 
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}