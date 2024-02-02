import { PhotographerApi } from "../api/Api.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { Photographer } from "../models/Photographer.js";

let tabIndexCounter = 2;

async function getPhotographers() {
    return await new PhotographerApi("./data/photographers.json").getPhotographersApi();
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