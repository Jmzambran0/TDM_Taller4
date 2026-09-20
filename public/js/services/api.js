const API_URL = "/api/items";

async function request(url, options) {
    let res;
    try {
        res = await fetch(url, options);
    } catch (err) {
        // fetch() lanza esto cuando no hay red en absoluto
        throw new Error("No disponible sin conexión");
    }

    if (!res.ok) {
        let message = `Error ${res.status}`;
        try {
            const body = await res.json();
            if (body.error) message = body.error;
            if (body.errores) message = body.errores.join(", ");
        } catch {
            // Sin conexión o respuesta no-JSON
        }
        throw new Error(message);
    }

    return res.json();
}

const JSON_HEADERS = { "Content-Type": "application/json" };

export function getItems(filtros = {}) {
    const params = new URLSearchParams();
    for (const [clave, valor] of Object.entries(filtros)) {
        if (valor) params.set(clave, valor);
    }
    const query = params.toString();
    const url = query ? `${API_URL}?${query}` : API_URL;
    return request(url);
}

export function getItem(id) {
    return request(`${API_URL}/${id}`);
}

export function createItem(data) {
    return request(API_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(data)
    });
}

export function updateItem(id, data) {
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify(data)
    });
}

export function deleteItem(id) {
    return request(`${API_URL}/${id}`, { method: "DELETE" });
}