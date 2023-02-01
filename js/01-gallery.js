import { galleryItems } from "./gallery-items.js";
// Change code below this line
// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
// Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям.
// Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

const galleryContainer = document.querySelector(".gallery");
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
let instance = {};

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  instance = basicLightbox.create(`
    <img src='${event.target.dataset.source}' alt='${event.target.alt}' width="800">
`);
  onOpenModal(instance);
}

function onOpenModal() {
  instance.show();
  document.addEventListener("keydown", onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code !== "Escape") {
    return;
  }
  instance.close();
  document.removeEventListener("keydown", onEscKeyPress);
}

// Create markup
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
        `;
    })
    .join("");
}
