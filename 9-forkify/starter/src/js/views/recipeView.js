import { elements } from './base';

export const clearRecipe = () => {
    elements.recipe.innerHTML = "";
}

const createIngredientHTML = ing => {
    const { count, unit, ingredient} = ing;
    return `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${count}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${unit}</span>
                ${ingredient}
            </div>
        </li>
    `;
}

export const renderRecipe = (recipe, isLiked=false) => {
    const { img, title, time, servings, author, url, ingredients } = recipe;
    const markup = `
        <figure class="recipe__fig">
            <img src="${img}" alt="${title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${ isLiked ? '' : '-outlined' }"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${ingredients.map(ingredient=> createIngredientHTML(ingredient)).join("")}
            </ul>

            <button class="btn-small recipe__btn recipe__btn-add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML("afterbegin", markup);
}


export const updateServingsIng = recipe => {
    //update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings

    //update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, idx) => {
        el.textContent = recipe.ingredients[idx].count
    })
};