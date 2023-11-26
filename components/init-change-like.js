import { addLike, removeLike } from "./api.js";

export const initChangeLike = ({ classLike, token, likeChanged }) => {
    if (!token) return;

    const likeButtons = document.querySelectorAll("." + classLike);
    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = likeButton.dataset.postId;

            if (likeButton.dataset.isLike === "true") {
                removeLike({ token, id }).then((response) => {
                    likeChanged({ postId: id, likes: response.post.likes });
                });
            } else {
                addLike({ token, id }).then((response) => {
                    likeChanged({ postId: id, likes: response.post.likes });
                });
            }
        });
    }
};
