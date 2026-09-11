import fs from "node:fs";
import path from "node:path";
import { Router } from "express";

const router = Router();
const DATA_PATH = path.join(import.meta.dirname, "..", "data", "items.json");

// Helper para leer el JSON
function readData() {
    try {
        const data = fs.readFileSync(DATA_PATH, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Helper para escribir el JSON
function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /api/items - Obtener todos los items
router.get("/", (req, res) => {
    res.json(readData());
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

// POST /api/items - Crear un nuevo item
router.post("/", (req, res) => {
    const items = readData();
    const nuevo = req.body; // Express analiza el JSON automáticamente

    const maxId = items.reduce((max, i) => Math.max(max, Number(i.id) || 0), 0);
    nuevo.id = maxId + 1;
    nuevo.createdAt = new Date().toISOString();

    items.push(nuevo);
    writeData(items);

    res.status(201).json(nuevo);
});

// PUT /api/items/:id - Actualizar un item
router.put("/:id", (req, res) => {
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