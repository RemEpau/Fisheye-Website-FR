async function getPhotographers() {
    // Récupérer les données des photographes en utilisant fetch depuis le fichier json

    let photographers = await fetch("../../data/photographers.json")
        .then((response) => response.json())

    // Ensuite, retourner les données

    return ({
        photographers: photographers['photographers']
    });
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // console.log(photographer);
        const photographerModel = new photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();