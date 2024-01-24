import { Video } from "../models/Video.js";
import { Image } from "../models/Image.js";


export class MediaFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data);
        } else if (data.video) {
            return new Video(data);
        } else {
            throw new Error("Le type de média n'est pas reconnu");
        }
    }
}