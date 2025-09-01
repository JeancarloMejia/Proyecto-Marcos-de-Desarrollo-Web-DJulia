const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 10,
    coverflowEffect: {
        rotate: 0,
        strech: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,    
    },
    breakpoints: {
        0: {
            slidesPerView: 1.1,
        },
        480: {
            slidesPerView: 1.4,
        },
        768: {
            slidesPerView: 1.7,
        }
    }
});