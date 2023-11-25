import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { initChangeLike } from "./init-change-like.js"; 

export function renderPostsPageComponent({ appEl, token }) {
  
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${posts.map((post) => {
                    return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}"
                        id="like-button-${post.id}"
                        class="like-button"
                        data-is-like="${post.isLiked}" >
                        <img id="img-like-${post.id}"
                        src="./assets/images/like-${post.isLiked ? "" : "not-"}active.svg">
                      </button>
                      <p class="post-likes-text">
                      Нравится: <strong id="post-likes-text-strong-${post.id}">${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                    </li>`
                }).join("")
              }
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  initChangeLike({ classLike: "like-button", token, likeChanged: ({postId, likes}) => {
    document.getElementById("post-likes-text-strong-"  + postId).innerHTML = likes.length;
    let isLike = !(document.getElementById("like-button-"  + postId).getAttribute("data-is-like") == "true"
      ? true
      : false) ;
    document.getElementById("like-button-"  + postId).setAttribute("data-is-like", isLike);
    document.getElementById("img-like-"  + postId).setAttribute("src", `./assets/images/like-${isLike ? "" : "not-"}active.svg`);
    
  }});
}
