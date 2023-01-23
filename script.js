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
    const photo = form.elements["photo"].value;
    const description = form.elements["description"].value;
    // Calls the resetForm function
    resetForm(form);
    // Calls the creatWishlistDestination function
    createWishlistDestination(name, location, photo, description);
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

function resetForm(form) {
    form.reset();
}


// Passes values as arguements and created elements with the class "wishListDestination". It is then appended to the page.
function createWishlistDestination(name, location, photo, description) {
    // create wishlistDestination section
    const wishlistDestination = document.createElement("section");
    wishlistDestination.setAttribute("class", "wishlistDestination");
    wishlistDestination.style.margin = "20px;";
    wishlistDestination.style.height = "fit-content";
    wishlistDestination.style.width = "15rem";

    // create img element
    const img = document.createElement("img");
    img.setAttribute("class", "wishlistDestinationImg");

    const alternatePhoto = "https://www.abwe.org/sites/default/files/paragraphs/hero/eva-darron-oCdVtGFeDC0-unsplash.jpg";

    // Element for wishlistDestinationBody
    const wishlistDestinationBody = document.createElement("section");
    wishlistDestinationBody.setAttribute("class", "wishlistDestinationInfo");

    // create name element
    const wishlistDestinationName = document.createElement("h5");
    wishlistDestinationName.setAttribute("class", "wishlistDestinationName")
    wishlistDestinationName.innerText = name;
    wishlistDestinationBody.appendChild(wishlistDestinationName);

    // create location element
    const wishlistDestinationLocation = document.createElement("H6");
    wishlistDestinationLocation.setAttribute("class", "wishlistDestinationLocation");
    wishlistDestinationLocation.innerText = location;
    wishlistDestinationBody.appendChild(wishlistDestinationLocation);

    // create photo element
    // if photo input is empty, then use the alternate photo url as the src.
    if (photo.length === 0) {
        img.setAttribute("src", alternatePhoto);
    } else {
        img.setAttribute("src", photo);
    }

    // create buttonWrapper divider
    const buttonsWrapper = document.createElement("footer");
    buttonsWrapper.setAttribute("class", "buttonsWrapper")

    // Creates the edit Button and adds and event listener when the button is clicked to call the editWishlistDestination function.
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn btn-warning");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
        editWishlistDestination(wishlistDestination);
    });

    // Creates the remove Button and adds and event listener when the button is clicked to call the removeWishlistDestination function.
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger");
    deleteBtn.innerText = "Remove";
    deleteBtn.addEventListener("click", function () {
        removeWishlistDestination(wishlistDestination);
    });

    buttonsWrapper.appendChild(editBtn);
    buttonsWrapper.appendChild(deleteBtn);

    wishlistDestination.appendChild(img);
    wishlistDestination.appendChild(wishlistDestinationBody);
    wishlistDestination.appendChild(buttonsWrapper);

    document.querySelector("#myWishlistWrapper").appendChild(wishlistDestination);
    if (document.querySelector("#myWishlistWrapper").children.length > 0) {
        document.querySelector("#enterDetails").innerText = "My WishList";
    }
}

// Function to delete the wishlistDestination
function removeWishlistDestination(wishlistDestination) {
    wishlistDestination.parentNode.removeChild(wishlistDestination);
    // Reference ID myWishlistWrapper for the variable
    const myWishlistWrapper = document.querySelector("#myWishlistWrapper");
    // Change text back if no children
    if (myWishlistWrapper.children.length === 0) {
        document.querySelector("#enterDetails").innerText = "Enter Destination Details";
    }
}


// Function to edit the wishlistDestination
function editWishlistDestination(wishlistDestination) {
    const wishlistDestinationBody = wishlistDestination.querySelector(".wishlistDestinationInfo");
    let wishlistDestinationName = wishlistDestinationBody.querySelector(".wishlistDestinationName");
    let wishlistDestinationLocation = wishlistDestinationBody.querySelector(".wishlistDestinationLocation");
    let photo = wishlistDestination.querySelector("img")

    // Prompts when editing wishlistDestination and inputs the values into the variables
    let newWishlistDestinationName = window.prompt("Enter new name");
    let newWishlistDestinationLocation = window.prompt("Enter new location");
    let newPhoto = window.prompt("Enter new photo url");

    // Check is length of the input for Destination name is greater than 0, if true, then sets the inner text as the value.
    if (newWishlistDestinationName.length > 0) {
        wishlistDestinationName.innerText = newWishlistDestinationName;
    }

    // Check is length of the input for Destination locaiton is greater than 0, if true, then sets the inner text as the value.
    if (newWishlistDestinationLocation.length > 0) {
        wishlistDestinationLocation.innerText = newWishlistDestinationLocation;
    }

    // If photo is empty, then use the already set source value.
    if (newPhoto.length > 0) {
        photo.setAttribute("src", newPhoto);
    }
}