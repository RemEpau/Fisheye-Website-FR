class ImageMedia {
    constructor(photographerDataMediaById, photographerDataById, titleTranslations) {
        this.type = "image";
        this.src = `../assets/medias/${photographerDataById.name}/${photographerDataMediaById.image}`;
        this.alt = photographerDataMediaById.title;
        this.translatedTitle = titleTranslations[this.alt];
        this.title = this.translatedTitle;
    }
}

export { ImageMedia };