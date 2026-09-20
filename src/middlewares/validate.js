const CATEGORIAS_PERMITIDAS = ["Electrónica", "Ropa", "Libros"];

export function validateItem(req, res, next) {
  const { name, category, price } = req.body;
  const errores = [];

  // 1. Validar Nombre
  if (!name || typeof name !== "string" || name.trim() === "") {
    errores.push("El nombre es obligatorio.");
  }

  // 2. Validar Categoría dentro del arreglo permitido
  if (!category || !CATEGORIAS_PERMITIDAS.includes(String(category))) {
    errores.push(`La categoría debe ser una de las siguientes: ${CATEGORIAS_PERMITIDAS.join(", ")}`);
  }

  // 3. Validar Precio (número y >= 0)
  const precioNum = Number(price);
  if (price === undefined || isNaN(precioNum) || precioNum < 0) {
    errores.push("El precio debe ser un número mayor o igual a 0.");
  }

  if (errores.length > 0) {
    return res.status(400).json({ status: "error", errores });
  }

  next();
}