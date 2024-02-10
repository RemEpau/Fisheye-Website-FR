import { PhotographerApi } from "../api/Api.js";
import { Photographer } from "../models/Photographer.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { displayPhotographerGallery } from "../utils/displayPhotographerGallery.js";
import { closeLightbox } from "../utils/lightbox.js";
import { sortByPopularity, sortByDate, sortByTitle } from "../utils/filters.js";

let currentPhotographer = null; // Variable globale pour stocker le photographe courant


export function setCurrentPhotographer(photographer) {
    currentPhotographer = photographer;
}

export function getCurrentPhotographer() {
    return currentPhotographer;
}

export function displayFilters(photographerMedia) {
    // On récupère le select "sort"
    const select = document.getElementById("sort");

    // On ajoute un event listener sur le select afin de filtrer en fonction de la valeur
    select.addEventListener("change", function () {
        switch (this.value) {
            case "popularity":
                displayPhotographerGallery(getCurrentPhotographer(), sortByPopularity(photographerMedia));
                break;
            case "date":
                displayPhotographerGallery(getCurrentPhotographer(), sortByDate(photographerMedia));
                break;
            case "title":
                displayPhotographerGallery(getCurrentPhotographer(), sortByTitle(photographerMedia));
                break;
        }
    });
    displayPhotographerGallery(getCurrentPhotographer(), sortByPopularity(photographerMedia));
}

async function getPhotographerMediaById(id) {
    const media = await new PhotographerApi("./data/photographers.json").getMediasApi();
    return media.filter((media) => media.photographerId == id);
}

async function getPhotographerById(id) {
    const photographers = await new PhotographerApi("./data/photographers.json").getPhotographersApi();
    return photographers.find((photographer) => photographer.id == id);
}

async function displayData(currentPhotographer, photographerMedia) {
    const photographersSection = document.querySelector('.photograph-header');
    const photographersInfo = document.querySelector('.photograph-info');

    const photographerData = new Photographer(currentPhotographer);
    const photographModel = new PhotographerTemplate(photographerData);

    // On récupère le DOM de la photo et des infos du photographe
    const userCardDOM = photographModel.getCurrentUserImgDOM();
    const userInfoDOM = photographModel.getCurrentUserInfoDOM();

    photographersSection.appendChild(userCardDOM);
    photographersInfo.appendChild(userInfoDOM);

    // On récupère les éléments filtrés du photographe
    displayFilters(photographerMedia);

    // On affiche le nom du photographe dans le modal
    document.querySelector('#modalTitle').innerHTML += `</br> ${photographerData._name}`

    // On affiche le nombre de likes et le prix du photographe
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    const photographerMedia = await getPhotographerMediaById(photographerId);
    setCurrentPhotographer(await getPhotographerById(photographerId));
    displayData(getCurrentPhotographer(), photographerMedia);

    document.querySelector('.contact_button').addEventListener('click', displayModal);
    document.querySelector('.contact_close').addEventListener('click', closeModal);
    document.querySelector('.lightbox_close').addEventListener('click', closeLightbox);

    document.title = "FishEye | " + getCurrentPhotographer().name;
}

init();