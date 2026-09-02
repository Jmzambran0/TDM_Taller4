const MAX_STAT = 255;
export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>${item.price || "Gratuito"}</td>
            <td>${item.category || ""}</td>
            <td>${item.stock || "Sin existencias"}</td>
            <td>${item.createdDate || new Date().toLocaleDateString()}</td>
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
    const modalName = document.getElementById("modal-catalogo-name")
    const modalId = document.getElementById("modal-catalogo-id")
    const modalImg = document.getElementById("modal-catalogo-img")
    const modalHeight = document.getElementById("modal-catalogo-height")
    const modalWeight = document.getElementById("modal-catalogo-weight")
    const modalAbilities = document.getElementById("modal-catalogo-abilities")
    const modalStats = document.getElementById("modal-stats")

    modalName.textContent = capitalize(item.name)
    modalId.textContent = "#" + item.id.toString().padStart(3, "0")
    modalImg.src = item.image
    modalHeight.textContent = (Number(item.height)*0.1).toFixed(1) + " m"
    modalWeight.textContent = (Number(item.weight)*0.1).toFixed(1) + " kg"
    modalAbilities.textContent = item.abilities.join(", ")
    modalStats.innerHTML = ""
    item.stats.forEach(stat => {
        const percentage = (stat.value / MAX_STAT) * 100;
        const statRow = document.createElement("div");
        statRow.classList.add("stat-row");
        statRow.innerHTML = `
            <span class="stat-name">${capitalize(stat.name)}</span>
            <div class="stat-bar-track">
                <div class="stat-bar-fill bar-${stat.name.toLowerCase()}" style="width: ${percentage}%"></div>
            </div>
            <span class="stat-value">${stat.value}</span>
        `;
        modalStats.appendChild(statRow);
    })

    const closeButton = document.querySelector(".close-modal")
    closeButton.onclick = closeModal
    modalOverlay.classList.add('active');
}

export function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.classList.remove('active');
}
export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}