import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import { validateItem } from "../middlewares/validate.js"; // Importación del middleware

const router = Router();
const DATA_PATH = path.join(import.meta.dirname, "..", "data", "items.json");

function readData() {
    try {
        const data = fs.readFileSync(DATA_PATH, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// 2.2 GET /api/items - Búsqueda, Filtro y Orden mediante Query Params
router.get("/", (req, res) => {
    const { q, category, sort } = req.query; // Extraer query params
    let resultado = readData();

    // 1. Filtro 'q': busca texto en nombre y descripción
    if (q) {
        const busqueda = String(q).toLowerCase();
        resultado = resultado.filter(item =>
            (item.name && item.name.toLowerCase().includes(busqueda)) ||
            (item.description && item.description.toLowerCase().includes(busqueda))
        );
    }

    // 2. Filtro por campo de lista cerrada (ejemplo: 'category')
    if (category) {
        resultado = resultado.filter(item =>
            item.category && item.category.toLowerCase() === String(category).toLowerCase()
        );
    }

    // 3. Ordenamiento 'sort' por campo numérico
    if (sort) {
        resultado = [...resultado].sort((a, b) => {
            const valA = Number(a[sort]) || 0;
            const valB = Number(b[sort]) || 0;
            return valA - valB;
        });
    }

    // Sin parámetros o tras filtrar, devuelve el arreglo correspondiente
    res.json(resultado);
});

// GET /api/items/:id - Obtener un item por ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const items = readData();
    const item = items.find(i => Number(i.id) === id);

    if (!item) {
        return res.status(404).json({ error: "No encontrado" });
    }

    res.json(item);
});

// POST /api/items - Crear con middleware de validación
router.post("/", validateItem, (req, res) => {
    const items = readData();
    const nuevo = req.body;

    const maxId = items.reduce((max, i) => Math.max(max, Number(i.id) || 0), 0);
    nuevo.id = maxId + 1;
    nuevo.createdAt = new Date().toISOString();

    items.push(nuevo);
    writeData(items);

    res.status(201).json(nuevo);
});

// PUT /api/items/:id - Actualizar con middleware de validación
router.put("/:id", validateItem, (req, res) => {
    const id = parseInt(req.params.id, 10);
    let items = readData();
    const idx = items.findIndex(i => Number(i.id) === id);

    if (idx === -1) {
        return res.status(404).json({ error: "No encontrado" });
    }

    const updated = { ...items[idx], ...req.body, id };
    items[idx] = updated;
    writeData(items);

    res.json(updated);
});

// DELETE /api/items/:id - Eliminar un item
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    let items = readData();
    const newItems = items.filter(i => Number(i.id) !== id);

    if (newItems.length === items.length) {
        return res.status(404).json({ error: "No encontrado" });
    }

    writeData(newItems);
    res.json({ mensaje: "Eliminado" });
});

export default router;