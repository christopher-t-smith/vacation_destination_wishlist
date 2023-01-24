import { submitDestination } from "../main.js";

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
    let photoElement = wishlistDestination.children[0];

    const wishlistDestinationBody = wishlistDestination.querySelector(".wishlistDestinationInfo");
    let wishlistDestinationName = wishlistDestinationBody.querySelector(".wishlistDestinationName");
    let wishlistDestinationLocation = wishlistDestinationBody.querySelector(".wishlistDestinationLocation");
    let wishlistDestinationDescription = wishlistDestinationBody.querySelector(".wishlistDestinationDescription");

    // Prompts when editing wishlistDestination and inputs the values into the variables
    let newWishlistDestinationName = window.prompt("Enter new name");
    let newWishlistDestinationLocation = window.prompt("Enter new location");
    let newWishlistDestinationDescription = window.prompt("Enter new destination description");

    // Check is length of the input for Destination name is greater than 0, if true, then sets the inner text as the value.
    if (newWishlistDestinationName.length > 0) {
        wishlistDestinationName.innerText = newWishlistDestinationName;
    }

    // Check is length of the input for Destination location is greater than 0, if true, then sets the inner text as the value.
    if (newWishlistDestinationLocation.length > 0) {
        wishlistDestinationLocation.innerText = newWishlistDestinationLocation;
    }

    // Check is length of the input for Destination description is greater than 0, if true, then sets the inner text as the value.
    if (newWishlistDestinationDescription.length > 0) {
        wishlistDestinationDescription.innerText = newWishlistDestinationDescription;
    }

    // Construct the API url with the name and location values
    const apiUrl = `https://api.unsplash.com/search/photos?query=${newWishlistDestinationName}%20${newWishlistDestinationLocation}&per_page=1&page=1&client_id=YPru8CtTFuzEdXY-8cxB4bKiyDfiA4wy5g6O8BbsmBs`;

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }


    //Promise & parse image section
    const promise = fetchProducts();
    promise.then((data) => {
        // set image & append it to newCard element. 
        let imageElement = data.results[0].urls.regular;
        photoElement.setAttribute("src", imageElement);
    });

    // Async function for API images & render remaining body upon completion   
    async function renderCardBody() {
        await fetchProducts();
    }
    renderCardBody();        
}

export { removeWishlistDestination, editWishlistDestination}
