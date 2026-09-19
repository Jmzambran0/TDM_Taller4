// Definimos los valores permitidos para tu campo de lista cerrada (ejemplo: categoría)
const CATEGORIAS_PERMITIDAS = ["Electrónica", "Ropa", "Libros"];

export function validarItem(req, res, next) {
  const { precio, categoria } = req.body; // Cambia estos nombres por tus campos reales
  const errores = [];

  // 1. Validar campo numérico (debe ser número y >= 0)
  if (precio === undefined || typeof precio !== "number" || precio < 0) {
    errores.push("El precio debe ser un número mayor o igual a 0.");
  }

  // 2. Validar campo de lista cerrada
  if (!categoria || !CATEGORIAS_PERMITIDAS.includes(categoria.toLowerCase())) {
    errores.push(`La categoría debe ser una de las siguientes: ${CATEGORIAS_PERMITIDAS.join(", ")}`);
  }

  // Si existen errores, se retorna 400 sin romper el servidor
  if (errores.length > 0) {
    return res.status(400).json({ status: "error", errores });
  }

  next(); // Si pasa la validación, continúa a la ruta
}
