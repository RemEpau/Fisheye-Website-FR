export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    console.log("display modal");
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
