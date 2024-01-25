import { PhotographerApi } from "../api/Api.js";
import { Photographer } from "../models/Photographer.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import { displayPhotographerGallery } from "../utils/displayPhotographerGallery.js";
import { closeLightbox } from "../utils/lightbox.js";

let currentPhotographer = null; // Variable globale pour stocker le photographe courant


export function serCurrentPhotographer(photographer) {
    currentPhotographer = photographer;
}

export function getCurrentPhotographer() {
    return currentPhotographer;
}

async function getPhotographerById(id) {
    const photographers = await new PhotographerApi("/data/photographers.json").getPhotographersApi();
    const media = await new PhotographerApi("/data/photographers.json").getMediasApi();

    currentPhotographer = photographers.find((photographer) => photographer.id == id);
    const photographerMedia = media.filter((media) => media.photographerId == id);
    return { currentPhotographer, photographerMedia, media };
}

async function displayData(currentPhotographer, photographerMedia) {
    const photographersSection = document.querySelector('.photograph-header');
    const photographersInfo = document.querySelector('.photograph-info');

    const photographerData = new Photographer(currentPhotographer);
    const photographModel = new PhotographerTemplate(photographerData);

    // On récupère le DOM de la photo et des infos du photographe
    const userCardDOM = photographModel.getCurrentUserImgDOM();
    const userInfoDOM = photographModel.getCurrentUserInfoDOM();
    console.log(userInfoDOM);
    photographersSection.appendChild(userCardDOM);
    photographersInfo.appendChild(userInfoDOM);

    // On récupère les éléments filtrés du photographe
    photographModel.displayFilters(photographerMedia);

    // On affiche la gallery du photographe
    displayPhotographerGallery(
        currentPhotographer,
        photographerMedia
    );

    // On affiche le nom du photographe dans le modal
    document.querySelector('#modalTitle').innerHTML += `</br> ${photographerData._name}`
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);

    const photographerId = parseInt(urlParams.get('id'));
    const { currentPhotographer, photographerMedia } = await getPhotographerById(photographerId);
    displayData(currentPhotographer, photographerMedia);

    document.querySelector('.contact_button').addEventListener('click', displayModal);
    document.querySelector('.contact_close').addEventListener('click', closeModal);
    document.querySelector('.lightbox_close').addEventListener('click', closeLightbox);
}

init();