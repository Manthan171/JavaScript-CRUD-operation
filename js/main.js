let isEdit = false;
displayData();
// < --------------- Get Data ------------------>
function getData() {
  let bookId = makeid(5);
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let category = document.getElementById("category").value;
  let price = document.getElementById("price").value;

  let data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);

  data.push({
    bookId: bookId,
    bookName: bookName,
    authorName: authorName,
    category: category,
    price: price,
  });

  localStorage.setItem("data", JSON.stringify(data));
  displayData();
}

// < --------------------- Generate random string for book id ---------------->
function makeid(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
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
  console.log("dfsdfdsg", tableData);
  let getData = JSON.parse(localStorage.getItem("data"));
  console.log("getdata", getData);
  getData.forEach((element, index) => {
    console.log(index);
    createData += `<tr>
                        <td>${element.bookId}</td>
                        <td>${element.bookName}</td>
                        <td>${element.authorName}</td>
                        <td>${element.category}</td>
                        <td>${element.price}</td>
                        <td class="btn">
                            <button id="editBtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button onclick = "deleteBtn(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>`;
  });
  tableData.innerHTML = createData;
}

// < ------------------------ Edit functionality ------------------------------>

// function editbtn(){
//     // isEdit = true;
//     // editIndex = i;
//     document.getElementById("main-btn").innerHTML = "Save Data";
//     const editData = JSON.parse(localStorage.getItem('data'))||[];
//     console.log(editData);
// }

// < -------------------- Delete Functionality ---------------------->

function deleteBtn(index) {
  let getData = JSON.parse(localStorage.getItem("data"));
  console.log(getData);
  getData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(getData));
  displayData();
}