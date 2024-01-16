import { PhotographerApi } from "../api/Api.js";
import { photographerTemplate } from "../templates/photographerTemplate.js";

const data = "/data/photographers.json";
let tabIndexCounter = 2;

async function getPhotographers() {
    const response = new PhotographerApi(data);
    const photographers = await response.getPhotographersApi();

    console.log("Réponse : ", response);
    console.log("Photographes : ", { photographers });

    return { photographers };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        // console.log(photographer);
        const photographerModel = new photographerTemplate(photographer, tabIndexCounter);
        const userCardDOM = photographerModel.getUserCardDOM();
        tabIndexCounter++;
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();