// Check JWT Token

const token = localStorage.getItem("token");


if(!token){

    window.location.href = "index.html";

}



// Logout

const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){

logoutBtn.addEventListener("click",()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("admin");


    window.location.href="index.html";


});


}