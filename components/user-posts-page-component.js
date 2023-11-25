import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { initChangeLike } from "./init-change-like.js"; 

export function renderUserPostsPageComponent({ appEl, token  }) {

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="post-header-user" data-user-id="${posts[0].user.id}">
                    <img src="${posts[0].user.imageUrl}" class="post-header__user-image">
                    <p class="post-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">
                ${posts.map((post) => {
                    return `<li class="post">
                   
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button" data-is-like="${post.isLike}"
                      id="post-likes-button-${post.id}">
                        <img src="./assets/images/like-${ post.isLike
                          ? ""
                          : "not-"
                        }active.svg">
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

  // for (let userEl of document.querySelectorAll(".post-header")) {
  //   userEl.addEventListener("click", () => {
  //     goToPage(USER_POSTS_PAGE, {
  //       userId: userEl.dataset.userId,
  //     });
  //   });
  // }
initChangeLike({ classLike: "like-button", token, likeChanged: ({postId, likes}) => {
  document.getElementById("post-likes-text-strong-"  + postId).innerHTML = likes.length;
  // TODO: обновить статус нравится/ненравится в кнопке:button и обновить картинку
}});

}
