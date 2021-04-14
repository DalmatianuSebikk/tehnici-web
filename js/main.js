const burgerMenu = document.querySelector(".menu-btn");
const menuNav = document.querySelector(".menu-nav");
const burger = document.querySelector(".menu-btn__burger")
var isShown = 0;
burgerMenu.addEventListener("click", function() {
    if(isShown == 0){
        menuNav.classList.add("is-shown");
        burger.classList.add("open");
        isShown = 1;
    }
    else{
        burger.classList.remove("open");
        menuNav.classList.remove("is-shown");
        isShown = 0;
    }
    
});
