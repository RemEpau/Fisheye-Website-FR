// Fonction qui ajoute un event listener sur la touche "Escape" et appelle une fonction callback si la touche est pressée.

export function escapeListener(callback) {
    // On ajoute un event listener sur le document
    document.addEventListener("keydown", function (e) {
        // Si la touche "Escape" est pressée, on appelle la fonction callback
        if (e.code === "Escape") {
            callback();
        }
    });
}

export function enterListener(callback) {
    document.addEventListener("keydown", function (e) {
        // Si la touche "Enter" est pressée, on appelle la fonction callback et annule le comportement par défaut
        if (e.code === "Enter") {
            callback();
            e.preventDefault();
        }
    });
}

export function arrowListener(callbackLeft, callbackRight) {
    document.addEventListener("keydown", function (e) {
        if (e.code === "ArrowLeft") {
            callbackLeft();
        } else if (e.code === "ArrowRight") {
            callbackRight();
        }
    })
}

