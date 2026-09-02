import { closeModal, showModalCatalogo} from "./ui/ui.js";
// Constante con la URL base de la API
const API_URL = "/api/items";

const catalogContainer = document.getElementById("catalogContainer");

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        const res = await fetch(API_URL);
        const items = await res.json();
        catalogContainer.innerHTML = "";
        items.forEach(renderItem);
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        // TODO: Mostrar mensaje de error en la UI
    }
}

function renderItem(item) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
        <img src="${item.image}" alt="imagen del producto">
        <div class="product-info">
            <div class="card-title">
                <p>${item.name}</p>
            </div>
            <figure>
                <p class="card-price">${item.price}</p>
                <p class="details-modal" id="${item.id}">Detalles</p>
            </figure>
        </div>
    `;
    catalogContainer.appendChild(card);
   card.addEventListener("click", () => showModalCatalogo(item));
}


loadCatalog();