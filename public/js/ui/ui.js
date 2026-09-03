const MAX_STAT = 255;
const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAbu-8Lkb3QiRaudn91AYcgw8PmtQJq5oN15bJqiwEHwnUeDAraF2VCI&s=10";

export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>${item.price || "Gratis"}</td>
            <td>${item.category || ""}</td>
            <td>${item.stock || "0"}</td>
            <td>${item.createdDate || "Fecha no disponible"}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

export function showModalCatalogo(item) {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalName = document.getElementById("modal-catalogo-name");
    const modalId = document.getElementById("modal-catalogo-id");
    const modalImg = document.getElementById("modal-catalogo-img");
    const modalDesc = document.getElementById("modal-catalogo-descripcion");
    const modalPrice = document.getElementById("modal-catalogo-price");
    const modalSize = document.getElementById("modal-catalogo-size");
    const modalStock = document.getElementById("modal-catalogo-stock");

    if (modalName) modalName.textContent = item.name || "";
    if (modalId) modalId.textContent = item.id ? "#" + item.id.toString().padStart(3, "0") : "";
    if (modalImg) modalImg.src = item.image !== "" ? item.image : DEFAULT_IMAGE;
    if (modalDesc) modalDesc.textContent = item.description || "";
    if (modalPrice) modalPrice.textContent = item.price || "Gratuito";
    if (modalSize) modalSize.textContent = item.size || item.talla || "N/A";
    if (modalStock) modalStock.textContent = item.stock || "Sin existencias";

    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }

    const closeButton = document.querySelector(".close-modal");
    if (closeButton) {
        closeButton.onclick = closeModal;
    }
}

export function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#price").value = item.price || "0";
    form.querySelector("#category").value = item.category || "";
    form.querySelector("#stock").value = item.stock || "0";
    form.querySelector("#image").value = item.image || "";
    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}