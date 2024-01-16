export function sortByDate(mediaData, displayPhotographerGallery) {
    const sortedByDate = mediaData.sort((a, b) => { new Date(a.date) - new Date(b.date); });
    displayPhotographerGallery(currentPhotographer, sortedByDate);
}

export function sortByTitle(mediaData, displayPhotographerGallery) {
    const sortedByTitle = mediaData.sort((a, b) => { a.title.localeCompare(b.title); });
    displayPhotographerGallery(currentPhotographer, sortedByTitle);
}

export function sortByPopularity(mediaData, displayPhotographerGallery) {
    const sortedByPopularity = mediaData.sort((a, b) => { b.likes - a.likes; });
    displayPhotographerGallery(currentPhotographer, sortedByPopularity);
}