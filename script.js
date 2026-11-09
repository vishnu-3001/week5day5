
let products = [
    { id: 1, name: "M&M", category: "Snacks", price: 1.99 },
    { id: 2, name: "Table", category: "Furniture", price: 199 },
    { id: 3, name: "Kale", category: "Vegetables", price: 2.49 }
];

let nextId = 4;

const tableBody = document.getElementById("products-body");
const form = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const categoryInput = document.getElementById("product-category");
const priceInput = document.getElementById("product-price");

// Display products in the table
function renderProducts() {
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = product.category;

        const priceCell = document.createElement("td");
        priceCell.textContent = "$" + product.price;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(priceCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Add a new product
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !category || !price) {
        return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        return;
    }

    const newProduct = {
        id: nextId++,
        name: name,
        category: category,
        price: numericPrice
    };

    products.push(newProduct);

    renderProducts();
    form.reset();
});

// Delete a product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
}

// Display the default products when the page loads
renderProducts();
