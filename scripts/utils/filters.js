export function sortByDate(mediaData) {
    return mediaData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function sortByTitle(mediaData) {
    return mediaData.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByPopularity(mediaData) {
    return mediaData.sort((a, b) => b.likes - a.likes);
}

export function createMediaElement(mediaData) {
    let element;
    if (mediaData.type === "image") {
        element = new DOMParser().parseFromString(`<img src="${mediaData.src}" alt="${mediaData.title}" />`, "text/html");
    } else {
        element = new DOMParser().parseFromString(`<video src="${mediaData.src}" alt="${mediaData.title}" />`, "text/html");
    }
    return element.body.firstChild;
}

