import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";


export function renderAddPostPageComponent({
   appEl,
    onAddPostClick
   }) {
  const render = () => {
  
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

         <div class="form-input-component">
            <div id="component-form-adding" style="display: none;">
               Пост публикуется...
             </div>
             <h3 class="form-input-title">Добавить пост</h3>
            <div class="upload-image-container"></div>
            <label>
                Комментарий к посту:
                <textarea class="input textarea" rows="4"></textarea>
            </label>    
           <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
  let link  ="";
  renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange: (imageLink)=>{
         link  = imageLink;
          // TODO: как-то использовать данные из (imageUrl)
        }
    });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: link,
      });
    });
  };
 
  render();
}
