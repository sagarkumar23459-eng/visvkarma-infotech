
const form =
document.getElementById("productForm");


form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const token =
localStorage.getItem("token");



const formData =
new FormData();



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



const image =
document.getElementById("image").files[0];


if(image){

formData.append(
"image",
image
);

}



const response =
await fetch(
"https://shibani-chemicals-backend.onrender.com/api/products",
{

method:"POST",

headers:{

Authorization:
`Bearer ${token}`

},

body:formData

}

);



const data =
await response.json();



if(data.success){


document.getElementById("message")
.innerText =
"Product Added Successfully ✅";


form.reset();


}
else{


document.getElementById("message")
.innerText =
data.message;


}


});