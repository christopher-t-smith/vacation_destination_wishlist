import { createWishlistDestination } from "./modules/wishlistCard.js";

// Select the form and add an event listener to the submit event which calls the submitDestination function.
const form = document.querySelector("#wishlistForm");
form.addEventListener("submit", submitDestination);

// Reference ID myWishlistWrapper for the variable
const myWishlistWrapper = document.querySelector("#myWishlistWrapper");

// Submit values entered in form for fields
function submitDestination(event) {
    // prevent browser from sending form data to server.
    event.preventDefault();
    // Takes input from form into variables
    const name = form.elements["name"].value;
    const location = form.elements["location"].value;
    const description = form.elements["description"].value;
    // Calls the resetForm function
    resetForm(form);
    // Calls the creatWishlistDestination function
    createWishlistDestination(name, location, description);
    // If there are no child element inside of myWishlistWrapper, then change the innerText text to My WishList
    if (myWishlistWrapper.children.length > 0) {
        document.querySelector("#enterDetails").innerText = "My WishList";
    }
}

// Reset or Clears Form Values
function resetForm(form) {
    for (let i = 0; i < form.length; i++) {
        form.elements[i].value = "";
    }
}

export { submitDestination };