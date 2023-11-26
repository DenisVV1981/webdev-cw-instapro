import { getPosts } from "./api.js";
import { renderAddPostPageComponent } from "./add-post-page-component.js";
import { renderAuthPageComponent } from "./auth-page-component.js";
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    LOADING_PAGE,
    POSTS_PAGE,
    USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./posts-page-component.js";
import { renderUserPostsPageComponent } from "./user-posts-page-component.js";
import { renderLoadingPageComponent } from "./loading-page-component.js";
import {
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    saveUserToLocalStorage,
} from "./helpers.js";
import { uploadNewPost, getUserPosts } from "./api.js";

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

const getToken = () => {
    const token = user ? `Bearer ${user.token}` : undefined;
    return token;
};

export const logout = () => {
    user = null;
    removeUserFromLocalStorage();
    goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
    if (
        [
            POSTS_PAGE,
            AUTH_PAGE,
            ADD_POSTS_PAGE,
            USER_POSTS_PAGE,
            LOADING_PAGE,
        ].includes(newPage)
    ) {
        if (newPage === ADD_POSTS_PAGE) {
            // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
            page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
            return renderApp();
        }

        if (newPage === POSTS_PAGE) {
            page = LOADING_PAGE;
            renderApp();

            return getPosts({ token: getToken() })
                .then((newPosts) => {
                    page = POSTS_PAGE;
                    posts = newPosts;
                    renderApp();
                })
                .catch((error) => {
                    console.error(error);
                    goToPage(POSTS_PAGE);
                });
        }

        if (newPage === USER_POSTS_PAGE) {
            // TODO: реализовать получение постов юзера из API
            console.log("Открываю страницу пользователя: ", data.userId);
            page = USER_POSTS_PAGE;
            posts = [];
            return getUserPosts({ token: getToken(), id: data.userId }).then(
                (userPosts) => {
                    posts = userPosts;
                    renderApp();
                },
            );
        }

        page = newPage;
        renderApp();

        return;
    }

    throw new Error("страницы не существует");
};

const renderApp = () => {
    const appEl = document.getElementById("app");
    if (page === LOADING_PAGE) {
        return renderLoadingPageComponent({
            appEl,
            user,
            goToPage,
        });
    }

    if (page === AUTH_PAGE) {
        return renderAuthPageComponent({
            appEl,
            setUser: (newUser) => {
                user = newUser;
                saveUserToLocalStorage(user);
                goToPage(POSTS_PAGE);
            },
            user,
            goToPage,
        });
    }

    if (page === ADD_POSTS_PAGE) {
        return renderAddPostPageComponent({
            appEl,
            onAddPostClick({ description, imageUrl }) {
                // TODO: реализовать добавление поста в API
                console.log("Добавляю пост...", { description, imageUrl });
                uploadNewPost({
                    description,
                    imageUrl,
                    token: getToken(),
                }).then(() => {
                    goToPage(POSTS_PAGE);
                });
            },
        });
    }

    if (page === POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
            token: getToken(),
        });
    }

    if (page === USER_POSTS_PAGE) {
        return renderUserPostsPageComponent({ appEl, token: getToken() });
    }
};

goToPage(POSTS_PAGE);