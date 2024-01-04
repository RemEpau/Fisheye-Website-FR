/**
 * Génère un modèle de photographe basé sur les données fournies.
 *
 * @param {Object} data - L'objet de données contenant les informations du photographe.
 * @param {string} data.name - Le nom du photographe.
 * @param {string} data.portrait - Le chemin vers l'image du portrait du photographe.
 * @returns {Object} - Un objet contenant le nom du photographe, l'image et une fonction pour générer le DOM de la carte utilisateur.
 */
function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = portrait ? `assets/photographers/${portrait}` : 'assets/photographers/account.png'

    function getUserCardDOM() {
        // Elements à créer
        const article = document.createElement('article');
        const container = document.createElement('div');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');

        // Ajout des classes et attributs
        container.classList.add('container');
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Portrait de ${name}`)

        // Ajout du contenu
        h2.textContent = name;
        article.appendChild(container);
        container.appendChild(img);
        article.appendChild(h2);

        // Retourner le DOM
        return (article);
    }

    // Retourner la fonction getUserCardDOM et les données name et picture
    return { name, picture, getUserCardDOM }
}