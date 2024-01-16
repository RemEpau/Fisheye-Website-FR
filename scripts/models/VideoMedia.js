class VideoMedia {
    constructor(photographerDataMediaById, photographerDataById, titleTranslations) {
        this.type = "video";
        this.src = `../assets/medias/${photographerDataById.name}/${photographerDataMediaById.video}`;
        this.alt = photographerDataMediaById.title;
        this.translatedTitle = titleTranslations[this.alt];
        this.title = this.translatedTitle;
    }
}

export { VideoMedia }