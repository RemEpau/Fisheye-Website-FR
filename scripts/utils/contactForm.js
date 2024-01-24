
export function displayModal() {
    // Récupération de la modal et du formulaire
    const modal = document.getElementById("contact_modal");
    const modalForm = document.getElementById("contact_form");
    const nonModalElements = document.querySelectorAll("body *:not(.modal-element)");

    // Ouverture de la modal
    modal.style.display = "grid";

    // Reset du formulaire à la fermeture de la page
    window.addEventListener("beforeunload", () => {
        modalForm.reset();
    });

    //Set le tabindex des éléments non modaux à -1
    nonModalElements.forEach(node => {
        node._prevTabIndex = node.getAttribute("tabindex");
        node.setAttribute("tabindex", "-1");
    });

    function formSubmitHandler(e) {
        e.preventDefault();

        const firstName = modalForm.elements["prenom"].value;
        const lastName = modalForm.elements["nom"].value;
        const email = modalForm.elements["email"].value;
        const message = modalForm.elements["message"].value;

        console.log("Test");
        let errorMessage;


        if (!firstName || !lastName || !email || !message) {
            errorMessage = "Veuillez remplir tous les champs";
        } else if (firstName.length < 2 || lastName.length < 2) {
            errorMessage = "Le prénom et le nom doivent contenir au moins 2 caractères";
        } else {

            const rgxName = /^[a-zA-ZÀ-ÖØ-öøç ]{2,31}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç ]{0,31}$/; // Nom et Prenom
            const rgxEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //Email

            if (!rgxEmail.test(email) || !rgxName.test(firstName) || !rgxName.test(lastName)) {
                errorMessage = "Veuillez remplir correctement les champs";
            } else if (message.length > 255) {
                errorMessage = "Le message ne doit pas dépasser 255 caractères";
            }
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            alert("Merci de m'avoir contacté, " + firstName + ". J'ai bien reçu votre message et je vous répondrai dès que possible. A très bientôt !")
            closeModal();
        }

        console.log("Prénom : " + firstName);
        console.log("Nom : " + lastName);
        console.log("Email : " + email);
        console.log("Message : " + message);
    }

    modalForm.removeEventListener("submit", formSubmitHandler);
    modalForm.addEventListener("submit", formSubmitHandler);
}

export function closeModal() {
    // Récupération de la modal et du formulaire
    const modal = document.getElementById("contact_modal");
    const modalForm = document.getElementById("contact_form");
    const nonModalElements = document.querySelectorAll("body *:not(.modal-element)");

    // Restore le tabindex des éléments non modaux
    nonModalElements.forEach(node => {
        if (node._prevTabIndex) {
            node.setAttribute("tabindex", node._prevTabIndex);
            node._prevTabIndex = null;
        } else {
            node.removeAttribute("tabindex");
        }
    });

    // Réinitialisation du formulaire et fermeture de la modal
    modalForm.reset();
    modal.style.display = "none";
}