showCategories()
  .then((categories) => {
    categories.forEach((category) => {
      //   console.log(category.name);
      console.log(categories);

      let categoryRow = document.querySelector(".category--row");
      let categoryContainer = document.createElement("div");
      categoryContainer.classList.add("col-3");

      let categoryPicture = document.createElement("img");
      categoryPicture.classList.add("country--pix");
      categoryPicture.setAttribute("src", category.image);

      let categoryName = document.createElement("h3");
      categoryName.classList.add("category-title");
      countryName.innerText = `${category.name}`;

      // Appending the elements
      categoryRow.appendChild(categoryContainer);
      categoryContainer.appendChild(categoryPicture);
      categoryContainer.appendChild(categoryName);

      console.log(categoryPicture);
    });
  })
  .catch((error) => {
    console.error("Error fetching countries:", error);
  });

async function showCategories() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

showCategories();

function addToCart(id_product) {
  const isEqual = (value) => {
    value.product_id == product_id;
  };
  console.log(isEqual);

  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (cart.length > 0) {
    let positionInCart = cart.findIndex(isEqual);
    if (positionInCart <= 0) {
      cart.push({
        product_id: product_id,
        quantity: 1,
      });
    } else {
      console.log(cart[positionInCart].quantity);
    }
  }
  console.log(cart);
}
