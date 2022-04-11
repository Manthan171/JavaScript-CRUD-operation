let isEdit = false;
let editIndex = -1;
window.onload = displayData();
// < --------------- Get Data ------------------>
function getData() {
  event.preventDefault();
  let data = JSON.parse(localStorage.getItem("data")) || [];
  let bookId = isEdit ? data[editIndex].bookId : makeid(4);
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let categoryEle = document.querySelector("input[type=radio]:checked");
  let category = (categoryEle || {}).value;
  let price = document.getElementById("price").value;
  let checkbox = document.getElementsByName('check');

  const imageElement = document.getElementById("img").files;

  const image = (imageElement[0] || {}).name || "";

  console.log(checkbox);
  let check = [];
  for(let i = 0; i<checkbox.length;i++){
    if(checkbox[i].checked){
      check.push(checkbox[i].value)
    }
  }

  const updatedData = {
    bookId,
    bookName,
    authorName,
    category,
    price,
    checkbox:check.join(`,<br>`),
    image,
  };
if(validateForm(updatedData)){
  if(isEdit){
    isEdit = false;
    data[editIndex] = updatedData;
    editIndex = -1;
    document.getElementById("main-btn").innerHTML = "Submit";
  }else{
    data.push(updatedData);
  }
  localStorage.setItem("data", JSON.stringify(data));
  displayData();
  return true;
}else{
  displayData(); 
  return false;
}
}

// < --------------------- Generate random string for book id ---------------->
function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// <----------------------- display data to the table ---------------------->
function displayData() {
  let createData = "";
  let tableData = document.getElementById("table-info");
  let getData = JSON.parse(localStorage.getItem("data"));
  console.log("getdata", getData);
  getData.forEach((element, index) => {
    createData += `<tr>
                        <td>${element.bookId}</td>
                        <td>${element.bookName}</td>
                        <td>${element.authorName}</td>
                        <td>${element.category}</td>
                        <td>${element.checkbox}</td>
                        <td>${element.price}</td>
                        <td>${element.image}</td>
                        <td class="btn">
                            <button id="editBtn" onclick = "editbtn(${index})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button onclick = "deleteBtn(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>`;
  });
  tableData.innerHTML = createData;
  document.getElementById("form").reset();
}

// < ------------------------ Edit functionality ------------------------------>

function editbtn(index){
    isEdit = true;
    editIndex = index;
    document.getElementById("main-btn").innerHTML = "Save Data";
    const editData = JSON.parse(localStorage.getItem('data'))||[];

    let bookName = editData[index].bookName;
    let author = editData[index].authorName;
    let category = editData[index].category;
    let bookPrice = editData[index].price;
    let check = editData[index].checkbox;

    document.getElementById("book-name").value = bookName;
    document.getElementById("author-name").value = author;
    document.getElementById("price").value = bookPrice;
    let radioBtn = document.querySelectorAll('input[type="radio"]'); 
    for(let i = 0;i<radioBtn.length;i++){
      console.log(radioBtn[i].value,'radio');
      radioBtn[i].checked = radioBtn[i].value===category;
    }
  let checkbox = document.getElementsByName('check');
  for(let i = 0;i<checkbox.length;i++){
    checkbox[i].checked = check.includes(checkbox[i].value);
  }

}

// < -------------------- Delete Functionality ---------------------->

function deleteBtn(index) {
  let getData = JSON.parse(localStorage.getItem("data"));
  getData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(getData));
  displayData();
}

// < -------------------- Form Validation ------------------------------->

function imageValid(){
  let imageEle = document.getElementById("img");
  let filepath = imageEle.value;

  let allowExtension = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowExtension.exec(filepath)) {
    document.getElementById("warning").innerHTML = "*Please select the valid file";
    imageEle.value = '';
    return false;
} 
}
function validateForm(data) {
    // Book name validation
  if (data.bookName.trim() === "") {
    document.getElementById("warn").innerHTML = "*Please enter the value in the field";
    return false;
  }
  else{
    document.getElementById("warn").innerHTML = "";
  }

    // Author name validation
  if (data.authorName.trim() === "") {
    document.getElementById("warn1").innerHTML = "*Please enter the value in the field";
    return false;
  }else{
    document.getElementById("warn1").innerHTML = "";
  }

  // Radio button validation
if(!data.category || (!!data.category && data.category === "")){
  document.getElementById("warn3").innerHTML = "*please choose the category of the book";
  return false;
}else{
  document.getElementById("warn3").innerHTML = "";
}
    //  CheckBox validation
  
  if(data.checkbox.length == 0){
    document.getElementById("warn2").innerHTML = "*Please check atleast one checkbox";
    return false;
  }else{
    document.getElementById("warn2").innerHTML = "";
  }

    // Price field validation
  
  if(data.price.length == 0){
    document.getElementById("warn4").innerHTML = "*Please enter the price";
    return false;
  }else{
    document.getElementById("warn4").innerHTML = "";
  }

  // Image validation
  const imgValid = document.getElementById("img");
  if(imgValid.files.length == 0){
    document.getElementById("warn5").innerHTML = "*Please enter the price";
    return false;
  }else{
    document.getElementById("warn5").innerHTML = "";
  }    
  return true;
}