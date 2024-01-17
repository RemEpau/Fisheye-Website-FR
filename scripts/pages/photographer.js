import { PhotographerApi } from "../api/Api.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { photographerTemplate } from "../templates/photographerTemplate.js";

let currentPhotographer = null; // Variable globale pour stocker le photographe courant

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

    const userCardDOM = photographModel.getCurrentUserCardDOM();
    photographModel.getCurrentUserInfoDOM();
    photographersSection.appendChild(userCardDOM);
    photographModel.displayFilters(data.photographerMedia);
    console.log(data.photographerMedia);
    photographModel.displayPhotographerGallery(
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