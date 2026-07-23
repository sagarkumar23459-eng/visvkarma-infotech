"use strict";


/*
====================================
 SIBHANI CHEMICALS
 Production JavaScript
====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

  



/* =========================
 MOBILE NAVBAR
========================= */




/* =========================
 SMOOTH SCROLL
========================= */
document
.querySelectorAll('a[href^="#"]')
.forEach(link=>{


link.addEventListener("click",function(e){


const href = this.getAttribute("href");


if(href === "#") return;


const target = document.querySelector(href);


if(target){

    e.preventDefault();

    target.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


});


});




/* =========================
 NAVBAR SCROLL EFFECT
========================= */


const header =
document.querySelector(
".header"
);



if(header){


window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.classList.add(
"scrolled"
);


}

else{


header.classList.remove(
"scrolled"
);


}


}

);


}







/* =========================
 SCROLL REVEAL ANIMATION
========================= */


const revealElements =
document.querySelectorAll(
".product-card, .why-card, .industry-card, .gallery-item, .about-card, .quality-card"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


observer.unobserve(
entry.target
);


}


});


},
{

threshold:.15

}

);



revealElements.forEach(
(element)=>{


element.classList.add(
"reveal"
);


observer.observe(
element
);


}

);







/* =========================
 FOOTER YEAR AUTO UPDATE
========================= */


const year =
document.querySelector(
".footer-bottom p"
);



if(year){


year.innerHTML =
year.innerHTML.replace(
"2026",
new Date().getFullYear()
);


}







/* =========================
 CONTACT FORM VALIDATION
========================= */


const form =
document.querySelector(
".contact-form form"
);



if(form){


form.addEventListener(
"submit",
(e)=>{


const inputs =
form.querySelectorAll(
"input, textarea"
);



let valid=true;



inputs.forEach(
(input)=>{


if(input.value.trim()===""){


valid=false;


input.style.borderColor=
"red";


}

else{


input.style.borderColor=
"#22c55e";


}



}

);




if(!valid){


e.preventDefault();


alert(
"Please fill all fields"
);


}



}

);


}







/* =========================
 IMAGE LAZY LOAD
========================= */


document
.querySelectorAll("img")
.forEach(img=>{


img.loading="lazy";


});

/* =========================
   SEND INQUIRY
========================= */


/* =========================
   INQUIRY MODAL
========================= */

const inquiryModal =
document.getElementById("inquiryModal");

const closeModal =
document.getElementById("closeModal");

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("inquiry-btn")){

        inquiryModal.style.display="flex";

        document.getElementById("productName").value =
        e.target.dataset.name;

    }

});

if(closeModal){

    closeModal.addEventListener("click",()=>{

        inquiryModal.style.display="none";

    });

}

window.addEventListener("click",(e)=>{

    if(e.target===inquiryModal){

        inquiryModal.style.display="none";

    }

});

const inquiryForm =
document.getElementById("inquiryForm");

if(inquiryForm){

    inquiryForm.addEventListener("submit", async(e)=>{

        e.preventDefault();

        const data = {

            productName:
            document.getElementById("productName").value,

            customerName:
            document.getElementById("customerName").value,

            customerPhone:
            document.getElementById("customerPhone").value,

            customerEmail:
            document.getElementById("customerEmail").value,

            customerMessage:
            document.getElementById("customerMessage").value

        };

        try{

            const response = await fetch(
                "https://shibani-chemicals-backend.onrender.com/api/inquiries",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(data)
                }
            );

            const result = await response.json();

            if(result.success){

                alert("Inquiry Sent Successfully ✅");

                inquiryForm.reset();

                inquiryModal.style.display="none";

            }else{

                alert("Something went wrong!");

            }

        }catch(error){

            console.error(error);

            alert("Server Error!");

        }

    });

}

});
/* =========================
   LOAD PRODUCTS
========================= */

const API = "https://shibani-chemicals-backend.onrender.com/api";
async function loadProducts() {

    try {

        const response = await fetch(`${API}/products`);
        const result = await response.json();

        const products = result.data || [];
        

        const productGrid =
            document.getElementById("productGrid");

        if (!productGrid) return;

        productGrid.innerHTML = "";

        products.forEach(product => {

            productGrid.innerHTML += `

           <div class="product-sale">

    <div class="product-image">

        <img
        src="${
            product.image
            ? "https://shibani-chemicals-backend.onrender.com" + product.image
            : "assets/images/no-image.png"
        }"
        alt="${product.name}">

    </div>

    <div class="product-content">

        <span>${product.category}</span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <h4>₹${product.price}</h4>

        <div class="product-buttons">

            

          <button
    class="inquiry-btn "
    data-id="${product._id}"
    data-name="${product.name}">
    Inquiry Now
</button>

        </div>

    </div>

</div>

`;
        });

    }

    catch(error){

        console.error("Products Error:", error);

    }

}

loadProducts();

document.addEventListener("DOMContentLoaded",()=>{


const menuIcon =
document.getElementById("menuIcon");


const navLinks =
document.querySelector(".nav-links");



if(menuIcon && navLinks){


menuIcon.addEventListener("click",()=>{


navLinks.classList.toggle("active");


menuIcon.classList.toggle("active");


});


}


// Menu link click hone par close

document.querySelectorAll(".nav-links a")
.forEach(link=>{


link.addEventListener("click",()=>{


navLinks.classList.remove("active");


menuIcon.classList.remove("active");


});


});


});