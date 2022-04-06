let isEdit = false;
let editIndex = -1;
window.onload = displayData();
// < --------------- Get Data ------------------>
function getData() {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  let bookId = isEdit ? data[editIndex].bookId : makeid(4);
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let category = document.querySelector("input[type=radio]:checked").value;
  let price = document.getElementById("price").value;
  let checkbox = document.getElementsByName('check');

  const imageElement = document.getElementById("img").files[0];
  const image = URL.createObjectURL(imageElement);

  console.log(checkbox);
  let check = [];
  for(let i = 0; i<checkbox.length;i++){
    if(checkbox[i].checked){
      check.push(checkbox[i].value)
      console.log(check);
    }
  }
  console.log(check);

  console.log(data);
  const updatedData = {
    bookId,
    bookName,
    authorName,
    category,
    price,
    checkbox:check.join(`,<br>`),
    image,
  };
  if(isEdit){
    isEdit = false;
    data[editIndex] = updatedData;
    editIndex = -1;
  }else{
    data.push(updatedData);
  }


  localStorage.setItem("data", JSON.stringify(data));
  displayData();
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
  // console.log("dfsdfdsg", tableData);
  let getData = JSON.parse(localStorage.getItem("data"));
  console.log("getdata", getData);
  getData.forEach((element, index) => {
    // console.log(index);
    createData += `<tr>
                        <td>${element.bookId}</td>
                        <td>${element.bookName}</td>
                        <td>${element.authorName}</td>
                        <td>${element.category}</td>
                        <td>${element.checkbox}</td>
                        <td>${element.price}</td>
                        <td><img class="image" src = "${element.image}" /></td>
                        <td class="btn">
                            <button id="editBtn" onclick = "editbtn(${index})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button onclick = "deleteBtn(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>`;
  });
  tableData.innerHTML = createData;
}

// < ------------------------ Edit functionality ------------------------------>

function editbtn(index){
    isEdit = true;
    editIndex = index;
    document.getElementById("main-btn").innerHTML = "Save Data";
    const editData = JSON.parse(localStorage.getItem('data'))||[];
    console.log(editData);

    let bookName = editData[index].bookName;
    let author = editData[index].authorName;
    let category = editData[index].category;
    let bookPrice = editData[index].price;
    let check = editData[index].checkbox;

    document.getElementById("book-name").value = bookName;
    document.getElementById("author-name").value = author;
    document.getElementById("price").value = bookPrice;
    let radioBtn = document.querySelectorAll('input[type="radio"]'); 
    console.log(radioBtn);
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
  console.log(getData);
  getData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(getData));
  displayData();
}

