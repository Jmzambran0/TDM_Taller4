import { getItems, getItem } from "./services/api.js";
import { closeModal, showModalCatalogo, showToast, renderCatalogCards } from "./ui/ui.js";

const catalogBody = document.getElementById("catalogContainer");
const modal = document.getElementById("catalogo-modal");

async function loadCatalog() {
    try {
        const items = await getItems();
        renderCatalogCards(items, catalogBody);
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        showToast(err.message);
    }
}

// Cerrar modal con el botón "X"
document.querySelector(".close-modal")?.addEventListener("click", closeModal);

// Cerrar modal al hacer clic fuera del contenido (en el overlay)
modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

catalogBody?.addEventListener("click", async (e) => {
    if (e.target.classList.contains("details-modal")) {
        const itemId = e.target.id;
        const item = await getItem(itemId);
        showModalCatalogo(item);
    }
});

loadCatalog();