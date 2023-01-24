import { removeWishlistDestination, editWishlistDestination } from "./cardButtons.js";

// Passes values as arguements and created elements with the class "wishListDestination". It is then appended to the page.
function createWishlistDestination(name, location, description) {
    // create wishlistDestination section
    const wishlistDestination = document.createElement("section");
    wishlistDestination.setAttribute("class", "wishlistDestination");
    wishlistDestination.style.margin = "20px;";
    wishlistDestination.style.height = "fit-content";
    wishlistDestination.style.width = "15rem";

    // Construct the API url with the name and location values
    const apiUrl = `https://api.unsplash.com/search/photos?query=${name}%20${location}&per_page=1&page=1&client_id=YPru8CtTFuzEdXY-8cxB4bKiyDfiA4wy5g6O8BbsmBs`;
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
        // set image in case user doesn't provide one & append it to newCard element. 
        let imageElement = data.results[0].urls.regular;
        let img = document.createElement("img");
        img.style.maxHeight = "145px"
        img.setAttribute("src", imageElement);
        wishlistDestination.appendChild(img);
        renderCardBody();
    });


    // Async function for API images & render remaining body upon completion   
    async function renderCardBody() {

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

        // create description element
        const wishlistDestinationDescription = document.createElement("H6");
        wishlistDestinationDescription.setAttribute("class", "wishlistDestinationDescription");
        wishlistDestinationDescription.innerText = description;
        wishlistDestinationBody.appendChild(wishlistDestinationDescription);

        // create buttonWrapper divider
        const buttonsWrapper = document.createElement("section");
        buttonsWrapper.setAttribute("class", "buttonsWrapper")

        // Creates the edit Button and adds and event listener when the button is clicked to call the editWishlistDestination function.
        const editBtn = document.createElement("button");
        editBtn.setAttribute("class", "btn btn-warning");
        editBtn.innerText = "Edit";
        buttonsWrapper.appendChild(editBtn);
        editBtn.addEventListener("click", function () {
            editWishlistDestination(wishlistDestination);
        });

        // Creates the remove Button and adds and event listener when the button is clicked to call the removeWishlistDestination function.
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.innerText = "Remove";
        buttonsWrapper.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {
            removeWishlistDestination(wishlistDestination);
        });

        wishlistDestination.appendChild(wishlistDestinationBody);
        wishlistDestination.appendChild(buttonsWrapper);

        document.querySelector("#myWishlistWrapper").appendChild(wishlistDestination);
        if (document.querySelector("#myWishlistWrapper").children.length > 0) {
            document.querySelector("#enterDetails").innerText = "My WishList";
        }
    }
}

export {createWishlistDestination}