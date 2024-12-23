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

// Seleccionar productos de todas las categorías
function agregaraTodos() {
    // Seleccionar todas las secciones de categorías
    const categorias = ["#remeras", "#pantalones", "#peluches", "#Piyamas"];
    const Todos = document.querySelector("#todos");

    if (!Todos) {
        console.error("No se encontró la sección #todos en el HTML.");
        return;
    }

    // Recorremos las categorías y sus productos
    categorias.forEach((categoriaId) => {
        const categoria = document.querySelector(categoriaId);
        if (categoria) {
            const productos = categoria.querySelectorAll(".card");

            productos.forEach((producto) => {
                // Clonamos cada tarjeta para no modificar el original
                const tarjetaClonada = producto.cloneNode(true);

                // Añadimos la tarjeta clonada a la sección de más vendidos
                Todos.appendChild(tarjetaClonada);
            });
        } else {
            console.warn(`No se encontró la categoría ${categoriaId} en el HTML.`);
        }
    });
}

// Llamar a la función después de cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    agregaraTodos();
});


//////////////////////

// Inicializar el carrito y el contador desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let contadorCarrito = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carritoContador = document.querySelector("#carrito-contador");
    const carritoContadorPequeno = document.querySelector("#carrito-contador-pequeno");

    if (carritoContador) carritoContador.textContent = contadorCarrito;
    if (carritoContadorPequeno) carritoContadorPequeno.textContent = contadorCarrito;

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para manejar la acción de "Comprar"
function activarBotonesComprar() {
    const botonesComprar = document.querySelectorAll(".btn.btn-primary");

    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = boton.closest(".card");
            const nombre = card.querySelector(".card-title")?.innerText.trim();
            const precio = parseFloat(card.querySelector(".card-text")?.innerText.replace("$", "").trim());

            if (!nombre || isNaN(precio)) {
                console.error("Error al obtener datos del producto:", { nombre, precio });
                return;
            }

            agregarAlCarrito(nombre, precio);
        });
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find((prod) => prod.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    contadorCarrito++;
    actualizarContadorCarrito();
}

// Función para mostrar el modal del carrito
function mostrarCarrito() {
    const modalCarrito = document.getElementById("modalCarrito");
    const tablaCarrito = document.getElementById("tabla-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (!tablaCarrito || !totalCarrito) {
        console.error("El elemento #tabla-carrito o #total-carrito no existe.");
        return;
    }

    // Limpiar la tabla
    tablaCarrito.innerHTML = "";

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        tablaCarrito.innerHTML = "<tr><td colspan='4'>El carrito está vacío.</td></tr>";
        totalCarrito.textContent = "$0.00";
        return;
    }

    // Llenar la tabla con los productos del carrito
    carrito.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <button onclick="modificarCantidad(${index}, -1)">-</button>
                ${producto.cantidad}
                <button onclick="modificarCantidad(${index}, 1)">+</button>
            </td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        tablaCarrito.appendChild(fila);
    });

    // Calcular el total
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    console.log("Total calculado:", total); // Depuración
    totalCarrito.textContent = `$${total.toFixed(2)}`;

    // Mostrar el modal
    modalCarrito.style.display = "block";
}

// Función para modificar la cantidad de un producto
function modificarCantidad(index, cantidad) {
    carrito[index].cantidad += cantidad;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    contadorCarrito = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    contadorCarrito = 0;
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
    const modalCarrito = document.getElementById("modalCarrito");
    modalCarrito.style.display = "none";
}

// Ejecutar funciones al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    activarBotonesComprar();
    actualizarContadorCarrito();

    const carritoIconGrande = document.querySelector(".carrito-icon");
    const carritoIconPequeno = document.querySelector(".carrito-icon-pequeno");

    if (carritoIconGrande) {
        carritoIconGrande.addEventListener("click", mostrarCarrito);
    }

    if (carritoIconPequeno) {
        carritoIconPequeno.addEventListener("click", mostrarCarrito);
    }

    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
    document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
});




// Función para mostrar el modal de pago
function mostrarModalPago() {
    if (carrito.length === 0) {
        mostrarModalCarritoVacio(); // Mostrar mensaje de carrito vacío
        return;
    }

    const modalPago = document.getElementById("modalPago");
    const totalPago = document.getElementById("total-pago");

    // Calcular el total a pagar
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalPago.textContent = `$${total.toFixed(2)}`;

    // Mostrar el modal
    modalPago.style.display = "block";
}

// Función para mostrar el modal de carrito vacío
function mostrarModalCarritoVacio() {
    const modalCarritoVacio = document.getElementById("modalCarritoVacio");
    modalCarritoVacio.style.display = "block";
}

// Función para cerrar el modal de carrito vacío
function cerrarModalCarritoVacio() {
    const modalCarritoVacio = document.getElementById("modalCarritoVacio");
    modalCarritoVacio.style.display = "none";
}

// Función para cerrar el modal de pago
function cerrarModalPago() {
    const modalPago = document.getElementById("modalPago");
    modalPago.style.display = "none";
}

// Añadir evento al botón "Comprar ahora" para mostrar el modal de pago o vacío
document.getElementById("pagar").addEventListener("click", (e) => {
    e.preventDefault(); // Evitar comportamientos predeterminados
    mostrarModalPago();
});

// Añadir evento al botón de cerrar el modal de pago
document.getElementById("cerrar-pago").addEventListener("click", cerrarModalPago);

// Añadir evento al botón de cerrar el modal de carrito vacío
document.getElementById("cerrar-vacio").addEventListener("click", cerrarModalCarritoVacio);

// Opcional: Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", (e) => {
    const modalPago = document.getElementById("modalPago");
    const modalCarritoVacio = document.getElementById("modalCarritoVacio");

    if (e.target === modalPago) {
        cerrarModalPago();
    }

    if (e.target === modalCarritoVacio) {
        cerrarModalCarritoVacio();
    }
});

/////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const botonFlotante = document.getElementById("boton-flotante");
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const imagenCarousel = document.querySelector("#carouselExampleFade .carousel-item.active img");
    const sections = document.querySelectorAll("section"); // Selecciona todas las secciones
    const formulario = document.querySelector("form"); // Selecciona el formulario
    let fondoVioleta = false;

    botonFlotante.addEventListener("click", function () {
        if (!fondoVioleta) {
            // Cambia el fondo de la página
            document.body.style.backgroundImage = "linear-gradient(to right bottom, #542d9f, #4e2489, #461b74, #3d1360, #340c4d, #2d0a44, #26083c, #200533, #1b0530, #17042e, #13032a, #0e0127)";
            
            // Cambia el color del header y nav
            if (header) header.style.backgroundColor = "#1a1a1a";
            if (nav) nav.style.backgroundColor = "#1a1a1a";

            // Cambia la imagen del carousel
            if (imagenCarousel) {
                imagenCarousel.src = "https://wallpapers.com/images/featured/kuromi-ouap9qsclxqc7ngt.jpg";
                imagenCarousel.style.width = "90%";
                imagenCarousel.style.height = "500px";
                imagenCarousel.style.objectFit = "cover";
            }

            // Cambia el fondo de las secciones
            sections.forEach((section) => {
                section.style.backgroundColor = "rgba(34, 34, 34, 0.9)"; // Fondo oscuro con transparencia
                section.style.color = "#ffffff"; // Cambia el texto a blanco
            });

            // Cambia el fondo del formulario
            if (formulario) {
                formulario.style.background = "rgba(50, 50, 50, 0.9)"; // Fondo más oscuro
                formulario.style.color = "#ffffff"; // Cambia el texto a blanco
            }

            // Cambia el botón flotante a color crema con emoji de sol
            botonFlotante.style.backgroundColor = "#f5deb3";
            botonFlotante.textContent = "🌞";
        } else {
            // Restaura el fondo original
            document.body.style.backgroundImage = "linear-gradient(to right top, #ff7ee0, #fe96ea, #fdadf2, #fdc2f9, #fed6fe)";
            
            // Restaura el color del header y nav
            if (header) header.style.backgroundColor = "#b069a6";
            if (nav) nav.style.backgroundColor = "#b069a6";

            // Restaura la imagen original del carousel
            if (imagenCarousel) {
                imagenCarousel.src = "https://cdn.shopify.com/s/files/1/1403/8979/files/hello-kitty-sanrio-stationery-1.png?v=1728238573";
                imagenCarousel.style.width = "100%";
                imagenCarousel.style.height = "auto";
                imagenCarousel.style.objectFit = "cover";
            }

            // Restaura el fondo de las secciones y el color del texto
            sections.forEach((section) => {
                section.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Fondo semitransparente original
                section.style.color = "#000000"; // Restaura el texto a negro
            });

            // Restaura el fondo del formulario y el texto
            if (formulario) {
                formulario.style.background = "rgba(255, 255, 255, 0.9)";
                formulario.style.color = "#000000"; // Restaura el texto a negro
            }

            // Restaura el botón flotante a su estado inicial
            botonFlotante.style.backgroundColor = "rgb(83, 18, 115)";
            botonFlotante.textContent = "🌙";
        }
        fondoVioleta = !fondoVioleta;
    });
});
