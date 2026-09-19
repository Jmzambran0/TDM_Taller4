export function renderLoading(container) {
    if (!container) return;
    container.innerHTML = `
        <div class="col-span-full py-12 text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-500 border-r-transparent"></div>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Cargando productos...</p>
        </div>`;
}

export function renderEmpty(container, esBusqueda = false) {
    if (!container) return;
    const mensaje = esBusqueda
        ? "No se encontraron resultados para tu búsqueda."
        : "No hay productos registrados en el inventario.";

    container.innerHTML = `
        <div class="col-span-full py-12 text-center">
            <p class="text-base font-medium text-slate-600 dark:text-slate-400">${mensaje}</p>
        </div>`;
}

export function renderError(container, mensaje) {
    if (!container) return;
    container.innerHTML = `
        <div class="col-span-full rounded-lg bg-red-50 p-4 text-center text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            Error al cargar los datos: ${mensaje}
        </div>`;
}

/* TABLA DE GESTIÓN (index.html) */

export function renderItems(items, container) {
    if (!container) return;

    if (!items || !items.length) {
        container.innerHTML = `
            <tr>
                <td colspan="8" class="px-4 py-6 text-center text-slate-400">
                    No hay productos registrados.
                </td>
            </tr>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <tr class="hover:bg-slate-50 border-b border-slate-100 dark:hover:bg-slate-800/50 dark:border-slate-800">
            <td class="px-4 py-3 font-mono text-xs text-slate-500">${item.id}</td>
            <td class="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">${item.name}</td>
            <td class="px-4 py-3 text-slate-500 dark:text-slate-400">${item.description || '-'}</td>
            <td class="px-4 py-3"><span class="badge">${item.category}</span></td>
            <td class="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">$${item.price}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-400">${item.stock}</td>
            <td class="px-4 py-3 text-xs text-slate-400">${item.createdAt || item.createdDate || '-'}</td>
            <td class="px-4 py-3 text-right space-x-2">
                <button data-id="${item.id}" class="btn-edit text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium cursor-pointer">Editar</button>
                <button data-id="${item.id}" class="btn-delete text-xs text-red-600 hover:text-red-800 dark:text-red-400 font-medium cursor-pointer">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

export function resetForm(form, submitBtn, cancelBtn) {
    if (!form) return;
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
    if (cancelBtn) cancelBtn.hidden = true;
}

export function fillForm(form, item, submitBtn, cancelBtn) {
    if (!form) return;
    form.querySelector("#name").value = item.name || "";
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#price").value = item.price || "";
    form.querySelector("#category").value = item.category || "";
    form.querySelector("#stock").value = item.stock || "";
    form.querySelector("#image").value = item.image || "";

    if (submitBtn) submitBtn.textContent = "Guardar";
    if (cancelBtn) cancelBtn.hidden = false;
}

export function showToast(message, type = "error") {
    console.log(`[TOAST ${type.toUpperCase()}]: ${message}`);
}

/* ============================================================
   MODAL DE DETALLES Y RENDER DEL CATÁLOGO
   ============================================================ */

export function showModalCatalogo(item) {
    const modal = document.getElementById("catalogo-modal");
    if (!modal || !item) return;

    document.getElementById("modal-catalogo-name").textContent = item.name || "";
    document.getElementById("modal-catalogo-id").textContent = `ID: ${item.id}`;
    document.getElementById("modal-catalogo-img").src = item.image || "/icons/icon-192.png";
    document.getElementById("modal-catalogo-img").alt = item.name || "Producto";
    document.getElementById("modal-catalogo-descripcion").textContent = item.description || "-";

    const price = Number(item.price);
    document.getElementById("modal-catalogo-precio").textContent =
        price ? "$" + price.toLocaleString("es-ES") : "Gratis";

    document.getElementById("modal-catalogo-categoria").textContent = item.category || "";
    document.getElementById("modal-catalogo-stock").textContent = item.stock ?? "0";

    modal.hidden = false;
}

export function closeModal() {
    const modal = document.getElementById("catalogo-modal");
    if (modal) modal.hidden = true;
}

export function renderCatalogCards(items, container) {
    if (!container) return;

    container.innerHTML = items.map(item => `
        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
                <img src="${item.image || '/icons/icon-192.png'}" alt="${item.name}" class="h-40 w-full rounded-md object-cover">
                <div class="mt-3 flex items-center justify-between gap-2">
                    <h3 class="font-bold text-slate-800 dark:text-slate-100">${item.name}</h3>
                    <span class="badge">${item.category}</span>
                </div>
                <p class="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">${item.description || ''}</p>
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span class="font-bold text-brand-700 dark:text-blue-400">$${item.price}</span>
                <button data-id="${item.id}" class="details-modal text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 cursor-pointer">
                    Detalles
                </button>
            </div>
        </div>
    `).join("");
}