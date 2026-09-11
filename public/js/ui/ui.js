export function renderItems(items, container) {
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
            <tr>
                <td colspan="8" class="px-4 py-6 text-center text-slate-400">
                    No hay productos registrados.
                </td>
            </tr>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
            <td class="px-4 py-3 font-mono text-xs text-slate-500">${item.id}</td>
            <td class="px-4 py-3 font-medium text-slate-800">${item.name}</td>
            <td class="px-4 py-3 text-slate-500">${item.description || '-'}</td>
            <td class="px-4 py-3 text-slate-600">${item.category}</td>
            <td class="px-4 py-3 font-semibold text-slate-700">$${item.price}</td>
            <td class="px-4 py-3 text-slate-600">${item.stock}</td>
            <td class="px-4 py-3 text-xs text-slate-400">${item.createdAt || item.createdDate || '-'}</td>
            <td class="px-4 py-3 text-right space-x-2">
                <button data-id="${item.id}" class="btn-edit text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    Editar
                </button>
                <button data-id="${item.id}" class="btn-delete text-xs text-red-600 hover:text-red-800 font-medium">
                    Eliminar
                </button>
            </td>
        </tr>
    `).join("");
}

export function resetForm(form, submitBtn, cancelBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
    if (cancelBtn) cancelBtn.hidden = true;
}

export function fillForm(form, item, submitBtn, cancelBtn) {
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
   MODAL DE DETALLES DEL CATÁLOGO
   ============================================================ */

export function showModalCatalogo(item) {
    const modal = document.getElementById("catalogo-modal");
    if (!modal) return;

    document.getElementById("modal-catalogo-name").textContent = item.name || "";
    document.getElementById("modal-catalogo-id").textContent = `ID: ${item.id}`;
    document.getElementById("modal-catalogo-img").src = item.image || "";
    document.getElementById("modal-catalogo-descripcion").textContent = item.description || "-";

    const price = Number(item.price);
    document.getElementById("modal-catalogo-precio").textContent =
        price ? "$" + price.toLocaleString("es-ES") : "Gratis";

    document.getElementById("modal-catalogo-categoria").textContent = item.category || "";
    document.getElementById("modal-catalogo-stock").textContent = item.stock ?? "";

    modal.hidden = false;
}

export function closeModal() {
    const modal = document.getElementById("catalogo-modal");
    if (modal) modal.hidden = true;
}