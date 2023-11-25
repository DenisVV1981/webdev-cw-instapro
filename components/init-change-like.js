import { addLike, removeLike } from "../api.js";

export const initChangeLike = ({classLike, token, likeChanged}) => {
const likeButtons  =  document.querySelectorAll("." + classLike)
for (const likeButton of likeButtons){
    likeButton.addEventListener("click", (event)=> {
        event.stopPropagation();
        
        const id = likeButton.dataset.postId;

        if(likeButton.dataset.isLike){
            removeLike({ token, id })
                .then((response) => {
                    likeChanged({postId: id, likes : response.post.likes});
                });
        }
        else{
            addLike({ token, id })
                .then((response) => {
                    likeChanged({postId: id, likes : response.post.likes});
                });
        }
    })
}
}