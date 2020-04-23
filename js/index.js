// Hamburger Menu
let stringToBool = (str = "") => {
    if(str.toLowerCase() === "true") {
        return true;
    } else if (str.toLowerCase() === "false") {
        return false;
    } else {
        throw new Error("String must be `true` or `false`.")
    }
}

let burger = document.getElementById("burger");
let menu = document.getElementById("menu");
burger.addEventListener("click", evt => {
    const isMenuShown = !stringToBool(burger.getAttribute("aria-expanded"));

    burger.setAttribute("aria-expanded", isMenuShown);
    menu.classList.toggle("is-shown-mobile");
});