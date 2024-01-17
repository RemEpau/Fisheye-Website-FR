import { sortByPopularity, sortByDate, sortByTitle } from "../utils/filters.js";
import { MediaFactory } from "../factories/MediaFactory.js";

export class photographerTemplate {
    constructor(data, tabIndexCounter) {
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
        this._tabIndexCounter = tabIndexCounter;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const container = `
            <a href="photographer.html?id=${this._id}" tabindex="${this._tabIndexCounter}">
            <div class="container">
                <img class="container__img" src="assets/photographers/${this._portrait}" alt="">
            </div>
                <h2>${this._name}</h2> 
            </a>
            <h3>${this._city}, ${this._country}</h3>
            <p class="tagline">${this._tagline}</p>
            <i class="price">${this._price}€/jour</i>
    `;
        article.innerHTML = container;
        article.setAttribute('role', 'article');
        article.setAttribute('aria-label', `${this._name}, ${this._city}, ${this._country}`);
        return article;
    }

    getCurrentUserCardDOM() {
        const photographInfo = `
                <img class="container__img" src="assets/photographers/${this._portrait}" alt="${this._name}" tabindex="${this._tabIndexCounter}">
            `;
        const photographerHeader = document.createElement('div');
        photographerHeader.classList.add('container');
        photographerHeader.innerHTML = photographInfo;
        return photographerHeader;
    }

    getCurrentUserInfoDOM() {
        const photographerTitle = `
        <h1 class="photograph-info__name">${this._name}</h1>
        <h2 class="photograph-info__address">${this._city}, ${this._country}</h2>
        <p class="photograph-info__tagline">${this._tagline}</p>
        `;
        const photographerInfo = document.querySelector('.photograph-info');
        photographerInfo.innerHTML = photographerTitle;
    }

    displayFilters(photographerMedia) {
        const select = document.querySelector("#sort");
        const filterSelect = Array.from(select.options);
        const defaultOption = filterSelect.find(option => option.value === "popularity");

        const btnPopularity = document.getElementById("opt-popularity");
        const btnDate = document.getElementById("opt-date");
        const btnTitle = document.getElementById("opt-title");

        select.addEventListener("change", function () {
            switch (this.value) {
                case "popularity":
                    sortByPopularity(photographerMedia);
                    break;
                case "date":
                    sortByDate(photographerMedia);
                    break;
                case "title":
                    sortByTitle(photographerMedia);
                    break;
            }
        });

        // function updateTabIndex(activeButton) {
        //     filterSelect.forEach(element => {
        //         const tabIndex = button === activeButton ? 10 : 10;
        //         button.setAttribute("tabindex", tabIndex);
        //     });
        // }
    }

    displayPhotographerGallery(photographer, photographerMedia) {
        const gallery = document.querySelector(".gallery");
        const mediaFactory = new MediaFactory();
        let tabindexCount = 11;

        if (gallery && photographer) {
            let totalLikes = 0;
            const photographerId = photographer.id;

            const photographerMediaFiltered = photographerMedia.filter(
                (mediaData) => mediaData.photographerId === photographerId
            );

            gallery.innerHTML = "";

            photographerMediaFiltered.forEach((mediaData) => {
                const media = mediaFactory.createMedia({
                    ...mediaData,
                    photographer: photographer.name,
                });

                const mediaElement = document.createElement(
                    media.type === "image" ? "img" : "video"
                );
                const mediaLink = document.createElement("a");
                const card = document.createElement("article");
                const figure = document.createElement("figure");
                const figcaption = document.createElement("figcaption");
                const titleElement = document.createElement("h4");
                const likesContainer = document.createElement("span");
                const heartIcon = document.createElement("i");

                // Image
                mediaElement.src = media.src;
                mediaElement.alt = media.title;

                // Link container
                mediaLink.classList.add("media-container");
                mediaLink.setAttribute("title", "Lilac breasted roller, closeup view");
                mediaLink.appendChild(mediaElement);
                mediaLink.setAttribute("tabindex", tabindexCount);
                tabindexCount++;

                // Likes container
                likesContainer.setAttribute("tabindex", tabindexCount);
                tabindexCount++;

                heartIcon.className = "fas fa-heart";
                heartIcon.setAttribute("aria-label", "likes");
                likesContainer.appendChild(heartIcon);

                const likesNumber = document.createElement("span");
                likesNumber.textContent = media.likes;
                likesContainer.appendChild(likesNumber);

                titleElement.textContent = media.title;

                mediaLink.setAttribute("role", "button");
                mediaLink.setAttribute("href", "#/");
                mediaLink.setAttribute("data-media", media.id);

                likesContainer.addEventListener("click", function () {
                    const currentLikes = parseInt(likesNumber.textContent, 10);
                    const isLiked = heartIcon.classList.contains("liked");

                    if (isLiked) {
                        likesNumber.textContent = currentLikes - 1;
                        heartIcon.classList.remove("liked");
                    } else {
                        likesNumber.textContent = currentLikes + 1;
                        heartIcon.classList.add("liked");
                    }

                    totalLikes = isLiked ? totalLikes - 1 : totalLikes + 1;
                });

                // Add elements to DOM
                figcaption.appendChild(titleElement);
                figcaption.appendChild(likesContainer);
                figure.appendChild(mediaLink);
                figure.appendChild(figcaption);
                card.appendChild(figure);

                totalLikes += media.likes;
                gallery.appendChild(card);
            });
        }
    }
}