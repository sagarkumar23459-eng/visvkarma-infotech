"use strict";

/*========================================
 VISVKARMA INFOTECH
 Production Script
========================================*/

// ========================================
// CONFIG
// ========================================

const API = "https://visvkarma-infotech.onrender.com/api";



// ========================================
// HELPERS
// ========================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


// ========================================
// DOM
// ========================================

const header = $(".header");

const menuIcon = $("#menuIcon");

const navLinks = $(".nav-links");


// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu(){

if(!menuIcon || !navLinks) return;

menuIcon.addEventListener("click",()=>{

navLinks.classList.toggle("active");

menuIcon.classList.toggle("active");

});

$$(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

menuIcon.classList.remove("active");

});

});

}


// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll(){

$$('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

const href = link.getAttribute("href");

if(href==="#") return;

const target=$(href);

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

}


// ========================================
// HEADER SCROLL
// ========================================

function initHeader(){

if(!header) return;

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

}


// ========================================
// SCROLL REVEAL
// ========================================

function initReveal(){

const items=$$(`
.product-sale,
.about-card,
.why-card,
.gallery-item,
.quality-card
`);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

items.forEach(item=>{

item.classList.add("reveal");

observer.observe(item);

});

}


// ========================================
// FOOTER YEAR
// ========================================

function initFooterYear(){

const footer=$(".footer-bottom p");

if(!footer) return;

footer.innerHTML=footer.innerHTML.replace(

"2026",

new Date().getFullYear()

);

}


// ========================================
// IMAGE LAZY LOAD
// ========================================

function initLazyImages(){

$$("img").forEach(img=>{

img.loading="lazy";

});

}


// ========================================
// CONTACT FORM
// ========================================

function initContactForm(){

const form=$(".contact-form form");

if(!form) return;

form.addEventListener("submit",(e)=>{

let valid=true;

form.querySelectorAll("input,textarea")

.forEach(input=>{

if(input.value.trim()===""){

valid=false;

input.style.borderColor="red";

}else{

input.style.borderColor="#22c55e";

}

});

if(!valid){

e.preventDefault();

alert("Please fill all fields.");

}

});

}


// ========================================
// INIT
// ========================================

document.addEventListener("DOMContentLoaded",()=>{

initMobileMenu();

initSmoothScroll();

initHeader();

initReveal();

initFooterYear();

initLazyImages();

initContactForm();
initProductModal();

initInquiryModal();
initOrderForm();
loadProducts();

});


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts(){

try{

const response=await fetch(`${API}/products`);

const result=await response.json();

const products=result.data || [];

const productGrid=$("#productGrid");

if(!productGrid) return;

productGrid.innerHTML="";

products.forEach(product=>{

productGrid.innerHTML+=`

<div class="product-sale">

<div class="product-image">

<img
src="${
product.image
? "https://visvkarma-infotech.onrender.com"+product.image
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
class="inquiry-btn"
data-name="${product.name}">
Order Now
</button>

<button
class="view-btn"

data-image="${
product.image
? "https://visvkarma-infotech.onrender.com"+product.image
: "assets/images/no-image.png"
}"

data-name="${product.name}"

data-category="${product.category}"

data-description="${product.description}"

data-price="${product.price}"

data-stock="${product.stock}">

View Details

</button>

</div>

</div>

</div>

`;

});

initProductButtons();

}catch(err){

console.log(err);

}


}
// ========================================
// PRODUCT BUTTONS
// ========================================

function initProductButtons(){

// Inquiry

$$(".inquiry-btn").forEach(button=>{

button.addEventListener("click",()=>{

openInquiryModal(button.dataset.name);

});

});

// View Details

$$(".view-btn").forEach(button=>{

button.addEventListener("click",()=>{

openProductModal(button.dataset);

});

});

}

// ========================================
// PRODUCT MODAL
// ========================================

function openProductModal(data){

const modal=$("#productModal");

if(!modal) return;

$("#modalImage").src=data.image;

$("#modalCategory").innerText=data.category;

$("#modalTitle").innerText=data.name;

$("#modalDesc").innerText=data.description;

$("#modalPrice").innerText="₹"+data.price;

$("#modalStock").innerHTML=
Number(data.stock)>0
? "🟢 In Stock"
: "🔴 Out of Stock";

modal.classList.add("active");

}

function initProductModal(){

const modal=$("#productModal");

const close=$("#closeProductModal");

if(!modal || !close) return;

close.addEventListener("click",()=>{

modal.classList.remove("active");

});

modal.addEventListener("click",(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

});

}
// ========================================
// ORDER MODAL
// ========================================

function openInquiryModal(productName){

const modal=$("#inquiryModal");

if(!modal) return;

$("#productName").value=productName;

modal.style.display="flex";

}

function initInquiryModal(){

const modal=$("#inquiryModal");

const close=$("#closeInquiryModal");

if(!modal || !close) return;

close.addEventListener("click",()=>{

modal.style.display="none";

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

}

});

}

// ========================================
// SEND ORDER
// ========================================

function initOrderForm(){

const form=$("#inquiryForm");

if(!form) return;

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const data={

productName:$("#productName").value,

customerName:$("#customerName").value,

customerPhone:$("#customerPhone").value,

customerEmail:$("#customerEmail").value,

quantity:$("#quantity").value,

customerCity:$("#customerCity").value,

customerAddress:$("#customerAddress").value,

customerMessage:$("#customerMessage").value

};

try{

const response=await fetch(`${API}/inquiries`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result=await response.json();

if(result.success){


alert("Order Placed Successfully ✅");

form.reset();

$("#inquiryModal").style.display="none";

}else{

alert(result.message);

}

}catch(err){

console.log(err);

alert("Server Error");

}

});

}