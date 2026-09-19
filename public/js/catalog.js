import { getItems, getItem } from "../services/api.js";
import { 
    closeModal, 
    showModalCatalogo, 
    showToast, 
    renderCatalogCards, 
    renderLoading, 
    renderEmpty, 
    renderError 
} from "./ui/ui.js";

const catalogBody = document.getElementById("catalogContainer");
const modal = document.getElementById("catalogo-modal");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const sortOrder = document.getElementById("sortOrder");
const themeToggleBtn = document.getElementById("themeToggleBtn");

async function loadCatalog() {
    renderLoading(catalogBody);

    // Mapeo flexible de parámetros para el API
    const query = searchInput?.value.trim() || "";
    const category = filterCategory?.value || "";
    const sort = sortOrder?.value || "";

    const filtros = { q: query, search: query, category, sort };

    try {
        let items = await getItems(filtros);

        // Si la API no filtra en backend, realizamos un filtro local de respaldo
        if (Array.isArray(items)) {
            if (category) {
                items = items.filter(item => item.category === category);
            }
            if (query) {
                const qLower = query.toLowerCase();
                items = items.filter(item => 
                    item.name?.toLowerCase().includes(qLower) || 
                    item.description?.toLowerCase().includes(qLower)
                );
            }
        }

        if (!items || items.length === 0) {
            renderEmpty(catalogBody, Boolean(query || category));
        } else {
            renderCatalogCards(items, catalogBody);
        }
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        renderError(catalogBody, err.message);
    }
}

// Escuchar cambios en los inputs
searchInput?.addEventListener("input", loadCatalog);
filterCategory?.addEventListener("change", loadCatalog);
sortOrder?.addEventListener("change", loadCatalog);

// Eventos de Modal
document.querySelector(".close-modal")?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

catalogBody?.addEventListener("click", async (e) => {
    const btnDetails = e.target.closest(".details-modal");
    if (btnDetails) {
        const itemId = btnDetails.dataset.id || btnDetails.id;
        try {
            const item = await getItem(itemId);
            if (item) showModalCatalogo(item);
        } catch (err) {
            showToast("No se pudo cargar el detalle del producto.");
        }
    }
});

// Toggle del Modo Oscuro
themeToggleBtn?.addEventListener("click", () => {
    const esOscuro = document.documentElement.classList.toggle("dark");
    localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
});

loadCatalog();