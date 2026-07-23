const loginBtn = document.getElementById("loginBtn");


if(loginBtn){

loginBtn.addEventListener("click", async()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



try{


const res = await fetch(
"http://localhost:5000/api/auth/login",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

}
);



const data = await res.json();



if(data.success){


localStorage.setItem(
"token",
data.token
);


localStorage.setItem(
"admin",
JSON.stringify(data.admin)
);



window.location.href =
"dashboard.html";


}
else{


document.getElementById("message")
.innerText=data.message;


}



}

catch(error){

console.log(error);

}


});


}