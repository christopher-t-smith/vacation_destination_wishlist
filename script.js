// Select the form and add an event listener to the submit event which calls the submitDestination function.
document.querySelector("#wishlistForm").addEventListener("submit", submitDestination);


// Submit values entered in form for fields
function submitDestination(event) {
    // prevent browser from sending form data to server.
    event.preventDefault();
    // Takes input from form into variables
    var name = event.target.elements["name"].value;
    var location = event.target.elements["location"].value;
    var photo = event.target.elements["photo"].value;
    var description = event.target.elements["description"].value;
    // Reference ID myWishlistWrapper for the variable
    var myWishlistWrapper = document.querySelector("#myWishlistWrapper");
    // Calls the resetForm function
    resetForm(event.target);
    // Calls the creatWishlistDestination function
    createWishlistDestination(name, location, photo, description);
    // If there are no child element inside of myWishlistWrapper, then change the innerHTML text to My WishList
    if (myWishlistWrapper.children.length > 0) {
        document.querySelector("#enterDetails").innerHTML = "My WishList";
    }
}


// Reset or Clears Form Values
function resetForm(form) {
    for (var i = 0; i < form.length; i++) {
        form.elements[i].value = "";
    }
}

// Passes values as arguements and created div elements with the class "wishListDestination". It is then appended to the page.
function createWishlistDestination(name, location, photo, description) {
    var wishlistDestination = document.createElement("div");
    wishlistDestination.setAttribute("class", "wishlistDestination");
    wishlistDestination.style.margin = "20px;";
    wishlistDestination.style.height = "fit-content";
    wishlistDestination.style.width = "15rem";

    var img = document.createElement("img");
    img.setAttribute("class", "wishlistDestinationImg");

    var alternatePhoto = "https://www.abwe.org/sites/default/files/paragraphs/hero/eva-darron-oCdVtGFeDC0-unsplash.jpg";

    // Div for wishlistDestinationBody
    var wishlistDestinationBody = document.createElement("div");
    wishlistDestinationBody.setAttribute("class", "wishlistDestinationInfo");

    var wishlistDestinationName = document.createElement("h5");
    wishlistDestinationName.setAttribute("class", "wishlistDestinationName")
    wishlistDestinationName.innerText = name;
    wishlistDestinationBody.appendChild(wishlistDestinationName);

    var wishlistDestinationLocation = document.createElement("H6");
    wishlistDestinationLocation.setAttribute("class", "wishlistDestinationLocation");
    wishlistDestinationLocation.innerText = location;
    wishlistDestinationBody.appendChild(wishlistDestinationLocation);

    // create buttonWrapper divider
    var buttonsWrapper = document.createElement("div");
    buttonsWrapper.setAttribute("class", "buttonsWrapper")
    // Creates the edit Button and adds and event listener when the button is clicked to call the editWishlistDestination function.
    var wishlistDestinationEditBtn = document.createElement("button");
    wishlistDestinationEditBtn.setAttribute("class", "btn btn-warning");
    wishlistDestinationEditBtn.innerText = "Edit";
    wishlistDestinationEditBtn.addEventListener("click", function () { editWishlistDestination(wishlistDestination) });
    // Creates the remove Button and adds and event listener when the button is clicked to call the removeWishlistDestination function.
    var wishlistDestinationDeleteBtn = document.createElement("button");
    wishlistDestinationDeleteBtn.setAttribute("class", "btn btn-danger");
    wishlistDestinationDeleteBtn.innerText = "Remove";
    wishlistDestinationDeleteBtn.addEventListener("click", function () { removeWishlistDestination(wishlistDestination) });

    // if photo input is empty, then use the alternate photo url as the src.
    if (photo.length === 0) {
        img.setAttribute("src", alternatePhoto);
    } else {
        img.setAttribute("src", photo);
    }

    // add photo as child to whishlistDestination
    wishlistDestination.appendChild(img);

    if (description.length !== 0) {
        var wishlistDestinationDescription = document.createElement("p");
        wishlistDestinationDescription.setAttribute("class", "wishlistDestinationDescription")
        wishlistDestinationDescription.innerText = description;
        wishlistDestinationBody.appendChild(wishlistDestinationDescription);
    }

    // Create buttons for Edit and Delete
    buttonsWrapper.appendChild(wishlistDestinationEditBtn);
    buttonsWrapper.appendChild(wishlistDestinationDeleteBtn);

    wishlistDestinationBody.appendChild(buttonsWrapper);

    wishlistDestination.appendChild(wishlistDestinationBody);

    // Add the created wishlistDestination myWishlistWrapper
    document.querySelector("#myWishlistWrapper").appendChild(wishlistDestination)

    return wishlistDestination;
}

// Function to delete the wishlistDestination
function removeWishlistDestination(wishlistDestination) {
    wishlistDestination.parentNode.removeChild(wishlistDestination);
    // Change text back if no children
    if (myWishlistWrapper.children.length === 0) {
        document.querySelector("#enterDetails").innerHTML = "Enter Destination Details";
    }
}

// Function to edit the wishlistDestination
function editWishlistDestination(wishlistDestination) {
    var wishlistDestinationBody = wishlistDestination.querySelector(".wishlistDestinationInfo");
    var wishlistDestinationName = wishlistDestinationBody.querySelector(".wishlistDestinationName");
    var wishlistDestinationLocation = wishlistDestinationBody.querySelector(".wishlistDestinationLocation");
    var photo = wishlistDestination.querySelector("img")

    // Prompts when editing wishlistDestination and inputs the values into the variables
    var newWishlistDestinationName = window.prompt("Enter new name");
    var newWishlistDestinationLocation = window.prompt("Enter new location");
    var newPhoto = window.prompt("Enter new photo url");

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