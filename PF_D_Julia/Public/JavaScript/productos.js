// Datos de ejemplo: 63 productos
let products = [];
let filteredProducts = null;

fetch("obtener_productos.php") // ← ajusta la ruta si hace falta
  .then(response => response.json())
  .then(data => {
    console.log("Productos recibidos:", data); // <-- Agrega este log
    products = data;
    TOTAL_PAGES = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    renderProducts(1);
    renderPagination(1);
  })
  .catch(error => {
    console.error("Error cargando productos:", error);
    const grid = document.getElementById('productsGrid');
    if (grid) grid.innerHTML = '<p style="color:red;">Error cargando productos.</p>';
  });

const PRODUCTS_PER_PAGE = 21;
let TOTAL_PAGES = Math.ceil(products.length / PRODUCTS_PER_PAGE);

// Variables para búsqueda


function renderProducts(page = 1, list = null) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    const data = list || filteredProducts || products;
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const pageProducts = data.slice(start, end);

    if (pageProducts.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#888;">No hay productos para mostrar.</p>';
        return;
    }

    pageProducts.forEach((prod, idx) => {
        grid.innerHTML += `
        <div class="product-card" data-index="${start + idx}">
            <img src="${prod.image}" alt="${prod.name}">
            <div class="product-info">
                <div>
                    <h3>${prod.name}</h3>
                    <span class="category">${prod.category}</span>
                </div>
                <span class="price">${prod.price}</span>
            </div>
            <button class="more-btn" type="button">
                <span class="material-icons">more_horiz</span>
            </button>
            <div class="product-menu">
                <button type="button">EDITAR</button>
                <button type="button">DUPLICAR</button>
                <button type="button">ELIMINAR</button>
            </div>
        </div>
        `;
    });

    setupProductMenus();
}

function renderPagination(currentPage = 1, list = null) {
    const pag = document.getElementById('pagination');
    pag.innerHTML = '';
    const data = list || filteredProducts || products;
    const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
    for (let i = 1; i <= totalPages; i++) {
        pag.innerHTML += `<button class="page${i === currentPage ? ' active' : ''}" data-page="${i}">${i}</button>`;
    }
}

function setupPagination() {
    document.getElementById('pagination').addEventListener('click', e => {
        if (e.target.classList.contains('page')) {
            const page = Number(e.target.dataset.page);
            renderProducts(page);
            renderPagination(page);
        }
    });
}

function setupProductMenus() {
    function closeAllMenus() {
        document.querySelectorAll('.product-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
    document.querySelectorAll('.product-card').forEach(card => {
        const moreBtn = card.querySelector('.more-btn');
        const menu = card.querySelector('.product-menu');
        moreBtn.onclick = (e) => {
            e.stopPropagation();
            closeAllMenus();
            menu.classList.toggle('active');
        };
        // Redirección al editar
        const editBtn = menu.querySelector('button:nth-child(1)');
        if (editBtn) {
            editBtn.onclick = (e) => {
                e.stopPropagation();
                window.location.href = '../DetallesProductos/detalles.html';
            };
        }
    });
    document.addEventListener('click', closeAllMenus);
    document.querySelectorAll('.product-menu').forEach(menu => {
        menu.onclick = (e) => e.stopPropagation();
    });
}

// Redirección al hacer clic en "CATALOGO"
document.addEventListener('DOMContentLoaded', () => {
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', function () {
            window.location.href = '../catalogo/catalogo.html';
        });
    }
});

// Redirección al hacer clic en "Agregar producto"
document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function () {
            window.location.href = '../DetallesProductos/agregar-producto.html';
        });
    }
});

// Redirección a Banner
document.addEventListener('DOMContentLoaded', () => {
    const bannerBtn = document.querySelectorAll('.sidebar nav ul li')[2];
    if (bannerBtn) {
        bannerBtn.addEventListener('click', function () {
            window.location.href = '../Banner/banner.html';
        });
    }
});

// Redirección a Anuncios
document.addEventListener('DOMContentLoaded', () => {
    const anuncioBtn = document.querySelectorAll('.sidebar nav ul li')[3];
    if (anuncioBtn) {
        anuncioBtn.addEventListener('click', function () {
            window.location.href = '../Anuncios/anuncio.html';
        });
    }
});

// Menú Admin Header
document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('adminMenuBtn');
    const adminDropdown = document.getElementById('adminDropdown');
    if (adminBtn && adminDropdown) {
        adminBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            adminDropdown.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            adminDropdown.classList.remove('active');
        });
        adminDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    // Funcionalidad para Cambiar Contraseña y Cerrar Sesión
    const cambiarBtn = document.querySelector('.admin-dropdown-item.cambiar');
    const cerrarBtn = document.querySelector('.admin-dropdown-item.cerrar');
    if (cambiarBtn) {
        cambiarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Cambiar-Contraseña/cambiar-contraseña.html';
        });
    }
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Loggin/loggin.html';
        });
    }
});

// Funcionalidad de búsqueda y notificaciones
document.addEventListener('DOMContentLoaded', () => {
    // Búsqueda
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    if (searchIcon && searchBox && searchInput) {
        searchIcon.addEventListener('click', () => {
            if (searchBox.style.display === 'none' || searchBox.style.display === '') {
                searchBox.style.display = 'block';
                searchInput.focus();
            } else {
                searchBox.style.display = 'none';
            }
        });

        searchInput.addEventListener('input', () => {
            const value = searchInput.value.trim().toLowerCase();
            if (value === '') {
                filteredProducts = null;
            } else {
                filteredProducts = products.filter(p => p.name.toLowerCase().includes(value));
            }
            renderProducts(1, filteredProducts);
            renderPagination(1, filteredProducts);
        });
    }

    // Notificaciones
    const notifIcon = document.getElementById('notifIcon');
    const notifPanel = document.getElementById('notifPanel');
    if (notifIcon && notifPanel) {
        notifIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.style.display = notifPanel.style.display === 'none' || notifPanel.style.display === '' ? 'block' : 'none';
        });
        document.addEventListener('click', () => {
            notifPanel.style.display = 'none';
        });
        notifPanel.addEventListener('click', e => e.stopPropagation());
    }
});



