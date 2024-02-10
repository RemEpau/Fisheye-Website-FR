import { MediaFactory } from "../factories/MediaFactory.js";
import { createMediaElement } from "../utils/filters.js";
import { displayLightbox } from "./lightbox.js";

export function displayPhotographerGallery(photographer, photographerMedia) {
    const gallery = document.querySelector(".gallery");
    let tabindexCount = 11;

    if (gallery && photographer) {
        let totalLikes = 0;
        const photographerId = photographer.id;

        const photographerMediaFiltered = photographerMedia.filter(
            (mediaData) => mediaData.photographerId === photographerId
        );

        gallery.innerHTML = "";

        photographerMediaFiltered.forEach((mediaData) => {
            const media = new MediaFactory({
                ...mediaData,
                photographer: photographer.name,
            });
            console.log(media.type);
            const mediaElement = createMediaElement(media);

            const mediaContainer = new DOMParser().parseFromString(`
                <article>
                    <figure>
                        <a class="media-container" title="${media.title}" tabindex="${tabindexCount++}" role="button" href="#" data-media="${media.id}">
                            ${mediaElement.outerHTML}
                        </a>
                        <figcaption>
                            <h4>${media.title}</h4>
                            <div>
                                <button tabindex="${tabindexCount++}" aria-label="likes" id="likeBtn">
                                <i class="fa-regular fa-heart"></i>
                                </button>
                                <span id="likeNbr">${media.likes}</span>
                            </div>
                        </figcaption>
                    </figure>
                </article>
            `, "text/html").body.firstChild;

            const likeBtn = mediaContainer.querySelector("#likeBtn");
            const heartIcon = mediaContainer.querySelector(".fa-heart");
            const likeNbr = mediaContainer.querySelector("#likeNbr");

            likeBtn.addEventListener("click", function () {
                const currentLikes = parseInt(likeNbr.textContent, 10);
                const isLiked = heartIcon.classList.contains("fa-solid");

                if (isLiked) {
                    likeNbr.textContent = currentLikes - 1;
                    heartIcon.classList.replace("fa-solid", "fa-regular");
                    totalLikes -= 1;
                } else {
                    likeNbr.textContent = currentLikes + 1;
                    heartIcon.classList.replace("fa-regular", "fa-solid");
                    totalLikes += 1;
                }

                document.querySelector("#like_counter__number span").textContent = totalLikes;
            });

            const mediaLink = mediaContainer.querySelector(".media-container");
            mediaLink.addEventListener("click", function (e) {
                e.preventDefault();
                displayLightbox(media, photographerMediaFiltered);
            });

            totalLikes += media.likes;
            document.querySelector("#like_counter__number span").textContent = totalLikes;
            document.querySelector("#like_counter__number").setAttribute("aria-label", `Nombre d'intéractions: ${totalLikes}`);
            document.querySelector("#like_counter__price").textContent = `${photographer.price}€ / jour`;
            document.querySelector("#like_counter__price").setAttribute("aria-label", `Prix par jour: ${photographer.price}€`);
            gallery.appendChild(mediaContainer);
        });
    }
}