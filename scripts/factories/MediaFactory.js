import { VideoMedia } from "../models/VideoMedia";
import { ImageMedia } from "../models/ImageMedia";


class MediaFactory {
    constructor(photographerDataMediaById, photographerDataById, titleTranslations) {
        if (photographerDataMediaById.image) {
            return new ImageMedia(photographerDataMediaById, photographerDataById, titleTranslations);
        } else if (photographerDataMediaById.video) {
            return new VideoMedia(photographerDataMediaById, photographerDataById, titleTranslations);
        }
    }
}

export { MediaFactory };