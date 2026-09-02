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

export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}

export function renderCards(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        // const row = document.createElement("tr");
        // row.innerHTML = `
        //     <td>${item.id}</td>
        //     <td>${item.name}</td>
        //     <td>${item.description || ""}</td>
        //     <td>${item.price || "Gratuito"}</td>
        //     <td>${item.category || ""}</td>
        //     <td>${item.stock || "Sin existencias"}</td>
        //     <td>${item.createdDate || new Date().toLocaleDateString()}</td>
        //     <td>
        //         <button class="btn-edit" data-id="${item.id}">Editar</button>
        //         <button class="btn-delete" data-id="${item.id}">Eliminar</button>
        //     </td>
        // `;
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${imageUrl}" alt="${imageAlt}">
            <div class="product-info">
                <div>
                    <p>${price}</p>
                    <p>${title}</p>
                </div>
                <figure>
                    <img src="../icons/bt_add_to_cart.svg" alt="añadir al carrito">
                </figure>
            </div>
        `;
    cardContainer.appendChild(card);
        tableBody.appendChild(row);
    });
}
