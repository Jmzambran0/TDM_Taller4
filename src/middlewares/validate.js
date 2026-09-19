// Definimos los valores permitidos para tu campo de lista cerrada (ejemplo: categoría)
const CATEGORIAS_PERMITIDAS = ["Electrónica", "Ropa", "Libros"];

export function validateItem(req, res, next) {
  const { nombre, categoria, precio } = req.body;
  const errores = [];

  // 1. Validar Nombre
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    errores.push("El nombre es obligatorio.");
  }

  // 2. Validar Categoría dentro del arreglo permitido
  if (!categoria || !CATEGORIAS_PERMITIDAS.includes(String(categoria).toLowerCase())) {
    errores.push(`La categoría debe ser una de las siguientes: ${CATEGORIAS_PERMITIDAS.join(", ")}`);
  }

  // 3. Validar Precio (número y >= 0)
  const precioNum = Number(precio);
  if (precio === undefined || isNaN(precioNum) || precioNum < 0) {
    errores.push("El precio debe ser un número mayor o igual a 0.");
  }

  // Si algo falla, responde 400 sin tumbar el servidor
  if (errores.length > 0) {
    return res.status(400).json({ status: "error", errores });
  }

  next();
}