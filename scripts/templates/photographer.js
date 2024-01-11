/**
 * Créer une carte utilisateur à partir des données d'un utilisateur
 * @param {Object} data Les données d'un utilisateur
 * @returns {HTMLElement} Le DOM de la carte utilisateur
 */
class photographerTemplate {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    getUserCardDOM() {

        // Elements à créer
        const article = document.createElement('article');
        const container = `
            
            <a href="#" tabindex="0">
            <div class="container">
                <img class="container__img" src="assets/photographers/${this.portrait}" alt="">
            </div>
                <h2>${this.name}</h2> 
            </a>
            <h3>${this.city}, ${this.country}</h3>
            <p class="tagline">${this.tagline}</p>
            <i class="price">${this.price}€/jour</i>
        `;
        article.innerHTML = container;

        // Ajouter des attributs et des éléments sémantiques pour l'accessibilité
        article.setAttribute('role', 'article');
        article.setAttribute('aria-label', `${this.name}, ${this.city}, ${this.country}`);

        // Retourner le DOM de la carte utilisateur
        return article;
    }
}