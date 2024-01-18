import { PhotographerApi } from "../api/Api.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { photographerTemplate, displayPhotographerGallery } from "../templates/photographerTemplate.js";

export let currentPhotographer = null; // Variable globale pour stocker le photographe courant

async function getPhotographerById(id) {
    const photographers = await new PhotographerApi("/data/photographers.json").getPhotographersApi();
    const media = await new PhotographerApi("/data/photographers.json").getMediasApi();

    currentPhotographer = photographers.find((photographer) => photographer.id == id);
    const photographerMedia = media.filter((media) => media.photographerId == id);
    return { currentPhotographer, photographerMedia, media };
}

async function displayData(data) {
    console.log(data);

    const photographersSection = document.querySelector('.photograph-header');
    const photographModel = new photographerTemplate(data.currentPhotographer);

    console.log(photographModel);
    // On récupère le DOM de la photo et des infos du photographe
    const userCardDOM = photographModel.getCurrentUserCardDOM();
    photographModel.getCurrentUserInfoDOM();
    photographersSection.appendChild(userCardDOM);
    // On récupère les éléments filtrés du photographe
    photographModel.displayFilters(data.photographerMedia);
    // On affiche la gallery du photographe
    displayPhotographerGallery(
        data.currentPhotographer,
        data.photographerMedia
    );
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));
    const { currentPhotographer, photographerMedia } = await getPhotographerById(photographerId);
    displayData({ currentPhotographer, photographerMedia });

    document.querySelector('.contact_button').addEventListener('click', displayModal);
    document.querySelector('.contact_close').addEventListener('click', closeModal);
}

init();