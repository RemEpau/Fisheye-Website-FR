import { MediaFactory } from "../factories/MediaFactory.js";
import { currentPhotographer } from "../pages/photographer.js";

let currentIndex = 0;
let filteredMedia = [];

export function updateLightboxContent() {
    const currentMedia = new MediaFactory({
        ...filteredMedia[currentIndex],
        photographer: currentPhotographer.name
    });

    displayLightbox(currentMedia, filteredMedia);
}

export function nextMedia() {
    currentIndex = ((currentIndex + 1) + filteredMedia.length) % filteredMedia.length;
    console.log("Current Index : ", currentIndex);
    updateLightboxContent();
}

export function previousMedia() {
    currentIndex = ((currentIndex - 1) + filteredMedia.length) % filteredMedia.length;
    console.log("Current Index : ", currentIndex);
    updateLightboxContent();
}

export function displayLightbox(currentMedia, allMedia) {
    const lightbox = document.querySelector("#lightbox_modal");
    const lightboxContent = document.querySelector(".lightbox #lightboxContent")
    const nonModalElements = document.querySelectorAll("body *:not(.modal-element)");

    //Set le tabindex des éléments non modaux à -1
    nonModalElements.forEach(node => {
        node._prevTabIndex = node.getAttribute("tabindex");
        node.setAttribute("tabindex", "-1");
    });

    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }

    let lightboxMediaElement;
    let lightboxTitleElement;

    console.log("Current Media : ", currentMedia.type);

    if (currentMedia.type === "image") {
        lightboxMediaElement = new DOMParser().parseFromString(`
            <img src="${currentMedia.src}" alt="Image en plein écran" class="lightbox-media modal-element" />
        `, "text/html").body.firstChild;
    } else if (currentMedia.type === "video") {
        lightboxMediaElement = new DOMParser().parseFromString(`
            <video controls class="lightbox-media modal-element" alt="Vidéo en plein écran">
                <source src="${currentMedia.src}" type="video/mp4">
                Votre navigateur ne prend pas en charge les vidéos.
            </video>
        `, "text/html").body.firstChild;
    } else {
        throw Error("Le type de média n'est pas reconnu");
    }

    lightboxTitleElement = new DOMParser().parseFromString(`
        <h2 id="lightboxTitle">${currentMedia.title}</h2>
    `, "text/html").body.firstChild;

    lightboxContent.appendChild(lightboxMediaElement);
    lightboxContent.appendChild(lightboxTitleElement);


    const existingLeftArrow = document.querySelector(".fa-chevron-left modal-element");
    const existingRightArrow = document.querySelector(".fa-chevron-right modal-element");

    if (!existingLeftArrow && !existingRightArrow) {
        const leftArrow = new DOMParser().parseFromString(`<button class="fas fa-chevron-left arrow"></button>`, "text/html").body.firstChild;
        leftArrow.addEventListener("click", previousMedia);

        const rightArrow = new DOMParser().parseFromString(`<button class="fas fa-chevron-right arrow"></button>`, "text/html").body.firstChild;
        rightArrow.addEventListener("click", nextMedia);

        lightbox.appendChild(leftArrow);
        lightbox.appendChild(rightArrow);
    }

    lightbox.style.display = "grid";

    filteredMedia = allMedia;

    currentIndex = filteredMedia.findIndex(media => media.id === currentMedia.id);
}

export function closeLightbox() {
    const lightbox = document.getElementById("lightbox_modal");
    const nonModalElements = document.querySelectorAll("body *:not(.modal-element)");

    nonModalElements.forEach(node => {
        if (node._prevTabIndex) {
            node.setAttribute("tabindex", node._prevTabIndex);
            node._prevTabIndex = null;
        } else {
            node.removeAttribute("tabindex");
        }
    });

    lightbox.style.display = "none";
}