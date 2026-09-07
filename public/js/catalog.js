import { closeModal, showModalCatalogo} from "./ui/ui.js";
// Constante con la URL base de la API
const API_URL = "/api/items";
const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAbu-8Lkb3QiRaudn91AYcgw8PmtQJq5oN15bJqiwEHwnUeDAraF2VCI&s=10";

const catalogContainer = document.getElementById("catalogContainer");
const noticeContainer = document.getElementById("noticeContainer");

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        const res = await fetch(API_URL);
        const items = await res.json();
        catalogContainer.innerHTML = "";
        if (!Array.isArray(items) || items.length === 0) {
            noticeContainer.innerHTML = `<p class="no-items">No hay items disponibles.</p>`;
            return;
        }
        items.forEach(renderItem);
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        noticeContainer.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/5219/5219070.png" alt="Error" class="error-icon">
            <p class="load-error">No se pudo cargar el catálogo.</p>`;
    }
}

function renderItem(item) {
    const price = Number(item.price)
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
        <img src="${item.image !== "" ? item.image : DEFAULT_IMAGE}" alt="imagen del producto">
        <div class="product-info">
            <div class="card-title">
                <p>${item.name}</p>
            </div>
            <figure>
                <p class="card-price">${price && "$" + price.toLocaleString('es-ES') || "Gratis"}</p>
                <p class="details-modal" id="${item.id}">Detalles</p>
            </figure>
        </div>
    `;
    const detailsBtn = card.querySelector(".details-modal");
    detailsBtn.addEventListener("click", () => showModalCatalogo(item));
    catalogContainer.appendChild(card);
}


loadCatalog();