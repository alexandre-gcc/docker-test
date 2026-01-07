const API_URL = "http://localhost:3000/api/products";

const log = (data) => {
    document.getElementById("response-output").innerText = JSON.stringify(
        data,
        null,
        2
    );
};

// CREATE
async function createProduct() {
    const payload = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        stock_qty: parseInt(document.getElementById("stock_qty").value),
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        log(data);
        if (res.ok) getAll();
    } catch (err) {
        log({ error: err.message });
    }
}

// READ
async function getAll() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        log(data);

        const listDiv = document.getElementById("product-list");
        listDiv.innerHTML = "";

        data.forEach((p) => {
            const id = p.id || p._id;
            const productData = JSON.stringify(p).replace(/"/g, "&quot;");

            listDiv.innerHTML += `
                <div class="product-card">
                    <div>
                        <strong>${p.name}</strong> (ID: ${id})<br/>
                        <small>${p.description}</small><br/>
                        <span>Price: $${p.price} | Stock: ${p.stock_qty}</span>
                    </div>
                    <div>
                        <button onclick="addStock('${productData}')">+1 Stock</button>
                        <button class="delete-btn" onclick="deleteProduct('${id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        log({ error: err.message });
    }
}

// UPDATE
async function addStock(productJson) {
    try {
        const product = JSON.parse(productJson);
        const id = product.id || product._id;
        const payload = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock_qty: product.stock_qty + 1,
        };

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        log(data);
        getAll();
    } catch (err) {
        log({ error: err.message });
    }
}

// DELETE
async function deleteProduct(id) {
    if (!confirm("Are you sure?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (res.status === 200 || res.status === 204) {
            log({ message: "Deleted successfully" });
        } else {
            log(await res.json());
        }
        getAll();
    } catch (err) {
        log({ error: err.message });
    }
}

getAll();
