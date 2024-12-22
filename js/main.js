// 1. Verificar si todos los campos del formulario están completos
function validarFormulario() {
    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const comentario = document.querySelector("textarea[name='comentario']").value.trim();

    if (nombre && email && comentario) {
        console.log("Todos los campos están completos.");
    } else {
        console.log("Por favor, complete todos los campos del formulario.");
    }
}

// Añadir un evento de escucha al botón del formulario
document.querySelector("form button[type='submit']").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    validarFormulario();
});

function listarProductos() {
    // Seleccionar las categorías
    const categorias = ["#remeras", "#pantalones", "#peluches", "#Piyamas"];
    const productosUnicos = new Set(); // Usar un Set para evitar duplicados

    console.log("Lista de productos disponibles:");

    categorias.forEach((categoriaId) => {
        const categoria = document.querySelector(categoriaId);
        const productos = categoria.querySelectorAll(".card");

        productos.forEach((producto) => {
            const nombreProducto = producto.querySelector(".card-title").innerText;
            const precioProducto = producto.querySelector(".card-text").innerText;

            if (!productosUnicos.has(nombreProducto)) {
                productosUnicos.add(nombreProducto);
                console.log(`- Producto: ${nombreProducto}, Precio: ${precioProducto}`);
            }
        });
    });
}

// Llamar a la función para listar los productos
listarProductos();
// Función principal para activar eventos en las tarjetas
function activarDescripcionAmpliada() {
    console.log("Activando eventos en las tarjetas...");
    const productos = document.querySelectorAll(".card"); // Selecciona todas las tarjetas

    if (productos.length === 0) {
        console.error("No se encontraron productos en la página.");
    }

    productos.forEach((producto, index) => {
        console.log(`Tarjeta encontrada en el índice ${index}:`, producto);

        producto.addEventListener("click", () => {
            // Obtener el nombre y el precio del producto
            const nombreProducto = producto.querySelector(".card-title")?.innerText.trim() || "Nombre no disponible";
            const precioProducto = producto.querySelector(".card-text")?.innerText.trim() || "Precio no disponible";

            // Determinar si el producto tiene talles (no es un peluche)
            const tieneTalles = !nombreProducto.toLowerCase().includes("peluche");

            // Mostrar el modal con la información del producto
            mostrarModal(nombreProducto, precioProducto, tieneTalles);
        });
    });
}

// Función para mostrar el modal
function mostrarModal(nombre, precio, tieneTalles) {
    console.log("Intentando mostrar el modal...");

    const modal = document.getElementById("modalProducto");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");

    // Verificar si los elementos del modal existen
    if (!modal) {
        console.error("El modal no se encontró en el DOM.");
        return;
    }

    if (!modalTitle || !modalDescription) {
        console.error("Faltan elementos dentro del modal.");
        return;
    }

    // Asignar valores al modal
    modalTitle.innerText = `Nombre: ${nombre}`;
    modalDescription.innerText = `${tieneTalles ? "Talles: S, M, XL\n" : ""}Precio: ${precio}\n¡Vístete con el encanto de Hello Kitty y sus amigos!`;

    // Mostrar el modal
    modal.style.display = "block";
    console.log("Modal mostrado con éxito.");
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById("modalProducto");
    if (!modal) {
        console.error("No se pudo cerrar el modal porque no existe.");
        return;
    }
    modal.style.display = "none";
    console.log("Modal cerrado.");
}

// Cerrar el modal al hacer clic fuera del contenido o en el botón de cierre
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada. Iniciando eventos...");

    activarDescripcionAmpliada(); // Activar eventos para las tarjetas

    const closeModal = document.querySelector(".close");
    if (closeModal) {
        closeModal.addEventListener("click", cerrarModal);
    } else {
        console.error("El botón de cierre no se encontró en el DOM.");
    }

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("modalProducto");
        if (event.target === modal) {
            cerrarModal();
        }
    });
});