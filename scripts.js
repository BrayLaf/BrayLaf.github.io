const hamMenu = document.querySelector(".ham");

const mobileMenu = document.querySelector(".mobilemenu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
})