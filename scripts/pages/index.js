import { PhotographerApi } from "../api/Api";
import { PhotographerTemplate } from "../templates/PhotographerTemplate";
import { Photographer } from "../models/Photographer";

const data = "./data/photographers.json";
let tabIndexCounter = 2;

async function getPhotographers() {
    const response = new PhotographerApi(data);
    const photographers = await response.getPhotographersApi();
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(new Photographer(photographer), tabIndexCounter);
        const userCardDOM = photographerModel.getUserCardDOM();
        tabIndexCounter++;
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();