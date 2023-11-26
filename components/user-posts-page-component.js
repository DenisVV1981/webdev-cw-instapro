import { renderHeaderComponent } from "./header-component.js";
import { posts } from "./app.js";
import { initChangeLike } from "./init-change-like.js";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export function renderUserPostsPageComponent({ appEl, token }) {
    const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="post-header-user" data-user-id="${
                    posts[0].user.id
                }">
                    <img src="${
                        posts[0].user.imageUrl
                    }" class="post-header__user-image">
                    <p class="post-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">
                ${posts
                    .map((post) => {
                        return `<li class="post">
                   
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}"
                        id="like-button-${post.id}"
                        class="like-button"
                        data-is-like="${post.isLiked}" >
                        <img id="img-like-${post.id}"
                        src="./assets/images/like-${
                            post.isLiked ? "" : "not-"
                        }active.svg">
                      </button>
                      <p class="post-likes-text">
                      Нравится: <strong id="post-likes-text-strong-${
                          post.id
                      }">${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                    ${formatDistance(new Date(post.createdAt), new Date(), {
                        addSuffix: true,
                        locale: ru,
                    })} 
                    </p>
                    </li>`;
                    })
                    .join("")}
                </ul>
              </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    initChangeLike({
        classLike: "like-button",
        token,
        likeChanged: ({ postId, likes }) => {
            document.getElementById(
                "post-likes-text-strong-" + postId,
            ).innerHTML = likes.length;
            let isLike = !(document
                .getElementById("like-button-" + postId)
                .getAttribute("data-is-like") === "true"
                ? true
                : false);
            document
                .getElementById("like-button-" + postId)
                .setAttribute("data-is-like", isLike);
            document
                .getElementById("img-like-" + postId)
                .setAttribute(
                    "src",
                    `./assets/images/like-${isLike ? "" : "not-"}active.svg`,
                );
        },
    });
}
