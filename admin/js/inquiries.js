"use strict";



async function loadInquiries() {

    try {

        const response = await fetch(`${API}/inquiries`);
        const result = await response.json();

        const tbody =
        document.querySelector("#inquiryTable tbody");

        tbody.innerHTML = "";
        document.getElementById("totalInquiry").textContent =
result.data.length;

        result.data.forEach(inquiry => {

            tbody.innerHTML += `

            <tr>

                <td>${inquiry.productName}</td>

                <td>${inquiry.customerName}</td>

                <td>${inquiry.customerPhone}</td>

                <td>${inquiry.customerEmail || "-"}</td>

                <td>${inquiry.quantity || "-"}</td>

                <td>${inquiry.customerCity || "-"}</td>

                <td>${inquiry.customerAddress || "-"}</td>

                <td>${inquiry.customerMessage || "-"}</td>

                <td>${new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td>

<button 
class="delete-btn"
onclick="deleteInquiry('${inquiry._id}')">

Delete

</button>

</td>

            </tr>

            `;

        });

    }

    catch(error){

        console.error("Inquiry Error:", error);

    }

}

loadInquiries();
async function deleteInquiry(id){

    const confirmDelete =
    confirm("Delete this inquiry?");


    if(!confirmDelete) return;


    try{

        const response =
        await fetch(
        `http://shibani-chemicals-backend.onrender.com/api/inquiries/${id}`,
        {
            method:"DELETE"
        });


        const result =
        await response.json();


        if(result.success){

            alert("Inquiry Deleted ✅");

            loadInquiries();

        }


    }catch(error){

        console.error(error);

    }

}