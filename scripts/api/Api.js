class Api {
    constructor(url) {
        this._url = url;
    }

    async get() {
        try {
            const response = await fetch(this._url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export class PhotographerApi extends Api {
    constructor(url) {
        super(url);
    }

    async getPhotographersApi() {
        const data = await this.get();
        return data.photographers;
    }

    async getMediasApi() {
        const data = await this.get();
        return data.media;
    }
}