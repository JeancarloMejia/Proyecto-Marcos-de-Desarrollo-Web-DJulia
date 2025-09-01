document.addEventListener('DOMContentLoaded', () => {
    // Redirección menú lateral
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) catalogoBtn.addEventListener('click', () => window.location.href = '../catalogo/catalogo.html');
    const productosBtn = document.querySelectorAll('.sidebar nav ul li')[1];
    if (productosBtn) productosBtn.addEventListener('click', () => window.location.href = '../productos/productos.html');
    const bannerBtn = document.querySelectorAll('.sidebar nav ul li')[2];
    if (bannerBtn) bannerBtn.addEventListener('click', () => window.location.href = '../Banner/banner.html');
    const anuncioBtn = document.querySelectorAll('.sidebar nav ul li')[3];
    if (anuncioBtn) anuncioBtn.addEventListener('click', () => window.location.href = '../Anuncios/anuncio.html');

    // Menú Admin Header
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
    // Asegúrate que los botones tengan las clases: cambiar y cerrar
    const cambiarBtn = document.querySelector('.admin-dropdown-item.cambiar');
    const cerrarBtn = document.querySelector('.admin-dropdown-item.cerrar');
    if (cambiarBtn) {
        cambiarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Cambiar-contraseña/cambiar-contraseña.html';
        });
    }
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Loggin/loggin.html';
        });
    }

    // Función para mostrar imagen o video como banner actual
    function setBannerMedia({ type, url, alt }) {
        const container = document.getElementById('mainBannerContainer');
        container.innerHTML = '';
        if (type === 'image') {
            const img = document.createElement('img');
            img.id = 'mainBannerImg';
            img.src = url;
            img.alt = alt || 'Banner Actual';
            container.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.id = 'mainBannerVideo';
            video.src = url;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            video.style.width = '100%';
            video.style.height = '100%';
            container.appendChild(video);
        }
    }

    // Cambiar banner actual al hacer clic en miniaturas de la derecha (IMAGEN)
    const rightThumbs = document.querySelectorAll('.banner-actual-thumbs img');
    rightThumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            rightThumbs.forEach(t => t.classList.remove('thumb-active'));
            this.classList.add('thumb-active');
            setBannerMedia({ type: 'image', url: this.src, alt: this.alt });
        });
    });

    // Cambiar banner actual al hacer clic en miniaturas de la izquierda (IMAGEN)
    const leftThumbs = document.querySelectorAll('.banner-thumbs img');
    leftThumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            setBannerMedia({ type: 'image', url: this.src, alt: this.alt });
        });
    });

    // Eliminar banner (solo ejemplo)
    const deleteBtn = document.querySelector('.delete-banner-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            setBannerMedia({ type: 'image', url: '', alt: '' });
            alert('Banner eliminado (solo ejemplo visual)');
        });
    }

    // Abrir explorador de archivos al hacer clic en "Subir"
    const subirBtn = document.querySelector('.upload-btn');
    let fileInput = document.getElementById('bannerFileInput');
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.id = 'bannerFileInput';
        document.body.appendChild(fileInput);
    }
    if (subirBtn) {
        subirBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                setBannerMedia({ type: 'image', url: e.target.result, alt: file.name });
            };
            reader.readAsDataURL(file);
        }
    });

    // ---------------------------
    // Biblioteca de imágenes
    // ---------------------------
    const bakeryImages = [
        { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', name: 'Desayuno' },
        { url: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80', name: 'Pastel' },
        { url: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', name: 'Cupcakes' },
        { url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', name: 'Tarta' },
        { url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', name: 'Tarta de frutas' },
        { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', name: 'Pan dulce' },
        { url: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80', name: 'Bizcocho' },
        { url: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', name: 'Galletas' },
        { url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', name: 'Postre' },
        { url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', name: 'Panadería' },
        { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', name: 'Bollería' },
        { url: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80', name: 'Croissant' }
    ];

    const imageLibraryModal = document.getElementById('imageLibraryModal');
    const imageLibraryGrid = document.getElementById('imageLibraryGrid');
    const searchImageInput = document.getElementById('searchImageInput');
    const closeLibraryBtn = document.getElementById('closeLibraryBtn');
    const bibliotecaBtn = Array.from(document.querySelectorAll('.banner-btn')).find(btn => btn.textContent.includes('Biblioteca de imágenes'));

    function renderImageLibrary(images) {
        imageLibraryGrid.innerHTML = '';
        images.forEach(img => {
            const imageElem = document.createElement('img');
            imageElem.src = img.url;
            imageElem.alt = img.name;
            imageElem.title = img.name;
            imageElem.addEventListener('click', () => {
                setBannerMedia({ type: 'image', url: img.url, alt: img.name });
                imageLibraryModal.classList.remove('active');
            });
            imageLibraryGrid.appendChild(imageElem);
        });
    }

    if (bibliotecaBtn) {
        bibliotecaBtn.addEventListener('click', () => {
            renderImageLibrary(bakeryImages);
            imageLibraryModal.classList.add('active');
            searchImageInput.value = '';
        });
    }
    if (closeLibraryBtn) {
        closeLibraryBtn.addEventListener('click', () => {
            imageLibraryModal.classList.remove('active');
        });
    }
    if (searchImageInput) {
        searchImageInput.addEventListener('input', () => {
            const value = searchImageInput.value.toLowerCase();
            const filtered = bakeryImages.filter(img => img.name.toLowerCase().includes(value));
            renderImageLibrary(filtered);
        });
    }
    if (imageLibraryModal) {
        imageLibraryModal.addEventListener('click', (e) => {
            if (e.target === imageLibraryModal) {
                imageLibraryModal.classList.remove('active');
            }
        });
    }

    // ---------------------------
    // Biblioteca de videos
    // ---------------------------
    const bakeryVideos = [
        { url: 'https://www.w3schools.com/html/mov_bbb.mp4', name: 'Video Panadería 1' },
        { url: 'https://www.w3schools.com/html/movie.mp4', name: 'Video Pastelería 2' }
        // Puedes agregar más videos relacionados a panadería/pastelería
    ];

    const videoLibraryModal = document.getElementById('videoLibraryModal');
    const videoLibraryGrid = document.getElementById('videoLibraryGrid');
    const searchVideoInput = document.getElementById('searchVideoInput');
    const closeVideoLibraryBtn = document.getElementById('closeVideoLibraryBtn');
    const bibliotecaVideoBtn = Array.from(document.querySelectorAll('.banner-btn')).find(btn => btn.textContent.includes('Biblioteca de videos'));

    function renderVideoLibrary(videos) {
        videoLibraryGrid.innerHTML = '';
        videos.forEach(vid => {
            const videoElem = document.createElement('video');
            videoElem.src = vid.url;
            videoElem.title = vid.name;
            videoElem.controls = false;
            videoElem.muted = true;
            videoElem.style.background = "#000";
            videoElem.addEventListener('mouseenter', () => videoElem.play());
            videoElem.addEventListener('mouseleave', () => { videoElem.pause(); videoElem.currentTime = 0; });
            videoElem.addEventListener('click', () => {
                setBannerMedia({ type: 'video', url: vid.url });
                videoLibraryModal.classList.remove('active');
            });
            videoLibraryGrid.appendChild(videoElem);
        });
    }

    if (bibliotecaVideoBtn) {
        bibliotecaVideoBtn.addEventListener('click', () => {
            renderVideoLibrary(bakeryVideos);
            videoLibraryModal.classList.add('active');
            searchVideoInput.value = '';
        });
    }
    if (closeVideoLibraryBtn) {
        closeVideoLibraryBtn.addEventListener('click', () => {
            videoLibraryModal.classList.remove('active');
        });
    }
    if (searchVideoInput) {
        searchVideoInput.addEventListener('input', () => {
            const value = searchVideoInput.value.toLowerCase();
            const filtered = bakeryVideos.filter(vid => vid.name.toLowerCase().includes(value));
            renderVideoLibrary(filtered);
        });
    }
    if (videoLibraryModal) {
        videoLibraryModal.addEventListener('click', (e) => {
            if (e.target === videoLibraryModal) {
                videoLibraryModal.classList.remove('active');
            }
        });
    }
});