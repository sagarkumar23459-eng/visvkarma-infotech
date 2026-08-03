const API = "https://visvkarma-infotech.onrender.com/api";



async function loadProducts() {

    try {

        const response = await fetch(
            `${API}/products`
        );


        const data = await response.json();

        console.log(data); // Debug ke liye


        const table =
        document.getElementById("productTable");


        if(!table){
            console.log("Table not found");
            return;
        }


        table.innerHTML = "";


        data.data.forEach(product => {


            table.innerHTML += `

            <tr>

                <td>

${
product.image
?
`<img src="https://visvkarma-infotech.onrender.com${product.image}" width="60">`
:
"No Image"
}

</td>

                <td>
                    ${product.name}
                </td>


                <td>
                    ${product.category}
                </td>


                <td>
                    ₹${product.price}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

<div class="action-buttons">

<button
class="edit-btn"
onclick="editProduct('${product._id}')">
✏️ Edit
</button>

<button
class="delete-btn"
onclick="deleteProduct('${product._id}')">
🗑 Delete
</button>

</div>

</td>


            </tr>

            `;


        });


    }

    catch(error){

        console.log(
            "Product Load Error:",
            error
        );

    }


}



loadProducts();
function editProduct(id){

    window.location.href =
    `edit-product.html?id=${id}`;

}

async function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `https://visvkarma-infotech.onrender.com/api/products/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("✅ Product deleted successfully.");

            loadProducts();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Something went wrong.");

    }

}