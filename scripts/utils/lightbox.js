import { MediaFactory } from "../factories/MediaFactory.js";
import { getCurrentPhotographer } from "../pages/photographer.js";
import { arrowListener, escapeListener } from "../utils/keyboardListeners.js";

let currentIndex = 0;
let filteredMedia = [];
let listeners = {
    arrow: false,
    escape: false
}
const nonModalElements = document.querySelectorAll("body *:not(.modal-element)");

export function updateLightboxContent() {
    const currentMedia = new MediaFactory({
        ...filteredMedia[currentIndex],
        photographer: getCurrentPhotographer().name
    });

    displayLightbox(currentMedia, filteredMedia);
}

export function nextMedia() {
    currentIndex = ((currentIndex + 1) + filteredMedia.length) % filteredMedia.length;
    updateLightboxContent();
}

export function previousMedia() {
    currentIndex = ((currentIndex - 1) + filteredMedia.length) % filteredMedia.length;
    updateLightboxContent();
}

export function displayLightbox(currentMedia, allMedia) {
    const lightbox = document.querySelector("#lightbox_modal");
    const lightboxContent = document.querySelector(".lightbox #lightboxContent")

    //Set le tabindex des éléments non modaux à -1
    nonModalElements.forEach(node => {
        node._prevTabIndex = node.getAttribute("tabindex");
        node.setAttribute("tabindex", "-1");
    });

    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }

    let lightboxMedia;
    let lightboxTitle;

    if (currentMedia.type === "image") {
        lightboxMedia = new DOMParser().parseFromString(`
            <img src="${currentMedia.src}" alt="Image en plein écran" class="lightbox-media modal-element" />
        `, "text/html").body.firstChild;
    } else if (currentMedia.type === "video") {
        lightboxMedia = new DOMParser().parseFromString(`
            <video controls class="lightbox-media modal-element" alt="Vidéo en plein écran">
                <source src="${currentMedia.src}" type="video/mp4">
            </video>
        `, "text/html").body.firstChild;
    }

    lightboxTitle = new DOMParser().parseFromString(`
        <h2 id="lightboxTitle">${currentMedia.title}</h2>
    `, "text/html").body.firstChild;

    lightboxContent.appendChild(lightboxMedia);
    lightboxContent.appendChild(lightboxTitle);


    const existingLeftArrow = document.querySelector(".fa-chevron-left modal-element");
    const existingRightArrow = document.querySelector(".fa-chevron-right modal-element");

    if ((!existingLeftArrow && !existingRightArrow) || allMedia.length === 1) {
        const leftArrow = new DOMParser().parseFromString(`<button class="fas fa-chevron-left arrow"></button>`, "text/html").body.firstChild;
        leftArrow.addEventListener("click", previousMedia);

        const rightArrow = new DOMParser().parseFromString(`<button class="fas fa-chevron-right arrow"></button>`, "text/html").body.firstChild;
        rightArrow.addEventListener("click", nextMedia);

        lightbox.appendChild(leftArrow);
        lightbox.appendChild(rightArrow);
    }

    if (!listeners.arrow) {
        arrowListener(previousMedia, nextMedia)
        listeners.arrow = true;
    }

    if (!listeners.escape) {
        escapeListener(closeLightbox);
        listeners.escape = true;
    }

    lightbox.style.display = "grid";

    filteredMedia = allMedia;

    currentIndex = filteredMedia.findIndex(media => media.id === currentMedia.id);
}

export function closeLightbox() {
    const lightbox = document.getElementById("lightbox_modal");

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