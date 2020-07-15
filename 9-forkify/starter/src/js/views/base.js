export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
}

const elementString = {
    loader: 'loader'
}

export const renderLoader = parentEl => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parentEl.insertAdjacentHTML("afterbegin", loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);

    if (loader) loader.parentElement.removeChild(loader);
}