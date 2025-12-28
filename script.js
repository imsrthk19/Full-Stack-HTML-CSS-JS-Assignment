const productsContainer = document.getElementById("products");
    const searchBox = document.getElementById("searchBox");
    const detailsDiv = document.getElementById("details");

    async function fetchProducts(url = "https://dummyjson.com/products") {
      const res = await fetch(url);
      const data = await res.json();
      displayProducts(data.products);
    }

    function displayProducts(products) {
      productsContainer.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="image" />
          <h3>${product.title}</h3>
          <p>Price: $${product.price}</p>
          <p>Rating: ⭐ ${product.rating}</p>
        `;
        card.onclick = () => showDetails(product);
        productsContainer.appendChild(card);
      });
    }

    function showDetails(product) {
      detailsDiv.style.display = "block";
      detailsDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
      `;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    searchBox.addEventListener("keyup", (e) => {
      const query = e.target.value;
      if (query.length > 0) {
        fetchProducts(`https://dummyjson.com/products/search?q=${query}`);
      } else {
        fetchProducts();
      }
    });

    fetchProducts();