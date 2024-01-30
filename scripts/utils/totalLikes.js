export function totalLikes(filteredMedia) {
    let totalLikes = 0;
    filteredMedia.forEach((media) => {
        totalLikes += media.likes;
    });
    return totalLikes;
}