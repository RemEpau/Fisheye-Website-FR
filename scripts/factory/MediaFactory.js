class MediaFactory {
    createMedia(photographerDataMediaById, photographerDataById, titleTranslations) {
        if (photographerDataMediaById.image) {
            return new ImageMedia(photographerDataMediaById, photographerDataById, titleTranslations);
        } else if (photographerDataMediaById.video) {
            return new VideoMedia(photographerDataMediaById, photographerDataById, titleTranslations);
        }
    }
}

class ImageMedia {
    constructor(
        photographerDataMediaById,
        photographerDataById,
        titleTranslations) {
        this.type = "image";
        this.src = `../assets/medias/${photographerDataById.name}/${photographerDataMediaById.image}`;
        this.alt = photographerDataMediaById.title;
        this.translatedTitle = titleTranslations[this.alt];
        this.title = this.translatedTitle;
    }
}

class VideoMedia {
    constructor(
        photographerDataMediaById,
        photographerDataById,
        titleTranslations) {
        this.type = "video";
        this.src = `../assets/medias/${photographerDataById.name}/${photographerDataMediaById.video}`;
        this.alt = photographerDataMediaById.title;
        this.translatedTitle = titleTranslations[this.alt];
        this.title = this.translatedTitle;
    }
}