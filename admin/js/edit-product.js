const API = "http://https://shibani-chemicals-backend.onrender.com/api";


const id = new URLSearchParams(
    window.location.search
).get("id");


const form = document.getElementById("editForm");

const message = document.getElementById("message");



async function loadProduct(){

    try{

        const res = await fetch(
            `${API}/products/${id}`
        );


        const data = await res.json();

        console.log("Product:", data);


        const product = data.data || data.product;


        document.getElementById("name").value = product.name;
        document.getElementById("category").value = product.category;
        document.getElementById("brand").value = product.brand;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;


    }
    catch(error){

        console.log(error);

    }

}


loadProduct();





form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const token = localStorage.getItem("token");



const formData = new FormData();



formData.append(
"name",
document.getElementById("name").value
);


formData.append(
"category",
document.getElementById("category").value
);


formData.append(
"brand",
document.getElementById("brand").value
);


formData.append(
"description",
document.getElementById("description").value
);


formData.append(
"price",
document.getElementById("price").value
);


formData.append(
"stock",
document.getElementById("stock").value
);



const imageFile =
document.getElementById("image").files[0];


if(imageFile){

formData.append(
"image",
imageFile
);

}



console.log("Sending Update...");



const res = await fetch(

`${API}/products/${id}`,

{

method:"PUT",

headers:{

Authorization:
`Bearer ${token}`

},

body:formData

}

);



const data =
await res.json();



console.log("Update Response:",data);



if(data.success){

message.innerHTML =
"✅ Product Updated Successfully";


}
else{

message.innerHTML =
"❌ " + data.message;

}


});