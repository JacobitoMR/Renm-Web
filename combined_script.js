document.addEventListener('DOMContentLoaded', () => {
    // Configuración del scroll suave para los enlaces de navegación
    const enlaces = document.querySelectorAll('nav a[href^="#"]');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionDestino = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: seccionDestino.offsetTop - 80, // Ajuste para el header fijo
                behavior: 'smooth'
            });
        });
    });

    // Detectar la sección visible actual para resaltarla en el menú
    const secciones = document.querySelectorAll('section');
    const itemsMenu = document.querySelectorAll('nav a');
    window.addEventListener('scroll', () => {
        let seccionActual = '';
        secciones.forEach(seccion => {
            const distanciaTop = seccion.offsetTop;
            if (pageYOffset >= distanciaTop - 150) {
                seccionActual = seccion.getAttribute('id');
            }
        });
        itemsMenu.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === seccionActual) {
                item.classList.add('active');
            }
        });
    });

    // Efecto de animación en cada sección al hacer scroll
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    secciones.forEach(seccion => {
        seccion.classList.add('fade-in');
        observer.observe(seccion);
    });

    // Mostrar el botón "Volver arriba" al hacer scroll hacia abajo
    function mostrarBotonVolverArriba() {
        const botonArriba = document.createElement('button');
        botonArriba.innerHTML = '↑';
        botonArriba.className = 'boton-arriba';
        document.body.appendChild(botonArriba);

        window.addEventListener('scroll', () => {
            botonArriba.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        botonArriba.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Inicializar el botón de volver arriba
    mostrarBotonVolverArriba();
});
