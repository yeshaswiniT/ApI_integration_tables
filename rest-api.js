//  const { response } = require("express");

const API_URL = "http://localhost:3000/api/items";
const form = document.querySelector("#form");
const form2 = document.getElementById("search-button");



form.addEventListener('submit', async event => {
    event.preventDefault();
    const jsondata = buildJsonFormData(form);


try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsondata)
    });
  await response.json();
 
  
  showmessage("#add");
  
   
   fetchItems();
   form.reset();
        
} 
catch (error) {
  showmessage("#connection");
    console.error("Error creating item:", error);
}

});




function buildJsonFormData(form) {
    const jsondata = { };
    for (const pair of new FormData(form)) { 
        jsondata[pair[0]] = pair[1];
    }
     return jsondata;
}







form2.addEventListener('click',  async event => {
  event.preventDefault();
  
  let mysearch;
  mysearch = document.getElementById("searchid").value.trim();
   if (mysearch === "") {
      fetchItems();
      hidemessage();
  }
  else 
      getitembyid(mysearch);
  
});


 
  async function getitembyid(id){
  
  try {
    // console.log(JSON.stringify(data));
   const response = await fetch(`http://localhost:3000/api/items/${id}`, {
    method: 'GET',
  headers: {
   'Content-Type': 'application/json'
  },
  
 })
//  await response.json();
let item = await response.json();
let rows = "";
console.log(item);

if (!item || !item.id ){
  showmessage("#Error");
  //  console.log("item");
 
 }
 else
{
 hidemessage();
  rows+= `<tr id =${item.id}><td class = data>${item.id}</td><td class = data>${item.firstname}</td><td class = data>${item.lastname}</td><td class = data>${item.email}</td><td class = data>${item.phone}</td>
   <td class = button>
   <div id = "actionbutton" style="display: flex; gap: 10px;">
  
             <button class="Edit" id="editButton" onclick="editItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf044;</i></button>
             <button class="Delete" id="deleteButton" onclick="deleteItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf014;</i></button>
            <button class="Save" id="saveButton" onclick="saveItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf0c7;</i></button>
            <button class="Cancel" id="cancelButton" onclick="cancel()"><i style="font-size:24px;color:#002C54" class="fa">&#xf00d;</i></button>
  </td>
  </tr>
  </div>
 `;         

document.getElementById("tableRows").innerHTML=rows; 
cells = document.getElementById("tableRows")
rows = cells.querySelectorAll('.Save')
console.log(rows);
for (let i = 0; i < rows.length; i++) {
rows[i].style.display = 'none';
}
rows = cells.querySelectorAll('.Cancel')
for (let i = 0; i < rows.length; i++) {
rows[i].style.display = 'none';
}
}


} catch (error) {
  
    console.error("Error fetching data:", error);
   
    // Handle errors (e.g., revert changes, display error message)
  }
}
//   }


// fetch data  and display
async function fetchItems() {
    try{

        let response = await fetch("http://localhost:3000/api/items"); 
        let items = await response.json();
       let rows = "";
      items.forEach(item=>{
         rows+= `<tr id =${item.id}><td class = data>${item.id}</td><td class = data>${item.firstname}</td><td class = data>${item.lastname}</td><td class = data>${item.email}</td><td class = data>${item.phone}</td>
          <td class = button>
          <div id = "actionbutton" style="display: flex; gap: 10px;">
         
             <button class="Edit" id="editButton" onclick="editItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf044;</i></button>
             <button class="Delete" id="deleteButton" onclick="deleteItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf014;</i></button>
            <button class="Save" id="saveButton" onclick="saveItem(${item.id})"><i style="font-size:24px;color:#002C54" class="fa">&#xf0c7;</i></button>
            <button class="Cancel" id="cancelButton" onclick="cancel()"><i style="font-size:24px;color:#002C54" class="fa">&#xf00d;</i></button>
         </td>
         </tr>
         </div>
        `;         
   } )
   document.getElementById("tableRows").innerHTML=rows; 
   cells = document.getElementById("tableRows")
   rows = cells.querySelectorAll('.Save')
   console.log(rows);
   for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = 'none';
  }
  rows = cells.querySelectorAll('.Cancel')
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = 'none';
  }

     } catch (error) {
        console.error("Error fetching item:", error);
    }
}

async function saveItem(id) {
  const row = document.getElementById(id);
  const cells = row.querySelectorAll('td.data');
  console.log(cells);
  data = {};
  cells.forEach((cell, index) => {
    const input = cell.querySelector('input');
    console.log(input)
    // if (index == 0) {
    //   // Save the new value from the input field
    //   data.id = input.value
    // }
    if (index == 1) {
      // Save the new value from the input field
      data.firstname = input.value
    }
    if (index == 2) {
      // Save the new value from the input field
      data.lastname = input.value
    }
    if (index == 3) {
      // Save the new value from the input field
      data.email = input.value
    }
    if (index == 4) {
      // Save the new value from the input field
      data.phone = input.value
    }
    })
    
  try {
    console.log(JSON.stringify(data));
   const response = await fetch(`http://localhost:3000/api/items/${id}`, {
    method: 'PUT',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
 })
//  await response.json();

showmessage("#edit");

 fetchItems();



} catch (error) {
    console.error(error);
    // Handle errors (e.g., revert changes, display error message)
  }
}
  
  

  

async function deleteItem(id, rowId) {
  try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      showmessage("#delete");
      fetchItems(); // Remove the row from the table
      
  } catch (error) {
    showmessage("#Error");
      console.error("Error deleting item:", error);
  }
}

async function cancel(){   
fetchItems();
}


function showmessage(id){
  hidemessage();
  const header4=  document.querySelector(id);
   header4.style.display='block';
  // setTimeout(showmessage, 4000);
}

function hidemessage(){
  const header=  document.querySelector('#add');
  header.style.display='none';
  const header2=  document.querySelector('#delete');
  header2.style.display='none';
  const header3=  document.querySelector('#edit');
  header3.style.display='none';
  const header5=  document.querySelector('#Error');
  header5.style.display='none';
  const header6=  document.querySelector('#connection');
  header6.style.display='none';
}




// // Edit an item
async function editItem(rowId) {
    console.log(rowId);
   

    // Hide or unhide edit/cancel/saveButton/delete icons
    const row = document.getElementById(rowId);
    const cells = row.querySelectorAll('td.data');
    const editButton = row.querySelector('.Edit');
    const saveButton = row.querySelector('.Save');
    const cancelButton = row.querySelector('.Cancel');
    const deleteButton = row.querySelector('.Delete');
  
    // To hide the "Edit" button
   editButton.style.display = 'none';
   
   
   // To show the "Save" button and hide the "Delete" button
   saveButton.style.display = 'block';  // or 'inline-block' depending on your layout
   deleteButton.style.display = 'none';
   cancelButton.style.display = 'block';

    const data = {};
console.log(cells);
  
    // Extract data from table cells
    
    cells.forEach((cell, index) => { 
       const input = document.createElement('input');
       input.value = cell.textContent;
      cell.innerHTML = '';
      cell.appendChild(input);
      // Assuming the first cell contains the ID
      if (index === 0) {
        data.id = rowId;
        input.disabled = true;
      } 
 
      else {
    //     // Adjust the property names based on your data structure
        data[`column${index}`] = input.value;
        
      }
      
    })};
    
      