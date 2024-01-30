export class PhotographerTemplate {
    constructor(photographer, tabIndexCounter) {
        this._photographer = photographer
        this._tabIndexCounter = tabIndexCounter;
    }

    getUserCardDOM() {
        return new DOMParser().parseFromString(`
                <article role="article" aria-label="${this._photographer._name}, ${this._photographer._city}, ${this._photographer._country}">
                    <a href="photographer.html?id=${this._photographer._id}" tabindex="${this._photographer._tabIndexCounter}">
                    <div class="container">
                        <img class="container__img" src="assets/photographers/${this._photographer._portrait}" alt="">
                    </div>
                        <h2>${this._photographer._name}</h2> 
                    </a>
                    <h3>${this._photographer._city}, ${this._photographer._country}</h3>
                    <p class="tagline">${this._photographer._tagline}</p>
                    <i class="price">${this._photographer._price}€/jour</i>
                </article>
            `, "text/html").body.firstChild;
    }

    getCurrentUserImgDOM() {
        return new DOMParser().parseFromString(`
            <div class="container">
                <img class="container__img" src="assets/photographers/${this._photographer._portrait}" alt="${this._photographer._name}" tabindex="${this._photographer._tabIndexCounter}">
            </div>
            `, "text/html").body.firstChild;
    }

    getCurrentUserInfoDOM() {
        return new DOMParser().parseFromString(`
        <div>
            <h1 class="photograph-info__name">${this._photographer._name}</h1>
            <h2 class="photograph-info__address">${this._photographer._city}, ${this._photographer._country}</h2>
            <p class="photograph-info__tagline">${this._photographer._tagline}</p>
        </div>
        `, "text/html").body.firstChild;
    }
}