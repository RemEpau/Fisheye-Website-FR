export function sortByDate(mediaArray) {
    return [...mediaArray].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function sortByTitle(mediaArray) {
    return [...mediaArray].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByPopularity(mediaArray) {
    return [...mediaArray].sort((a, b) => b.likes - a.likes);
}