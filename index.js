
console.log('dj is back')
appear();
function appear(e){
    let library = localStorage.getItem('library');
    let tableBody = document.getElementById('tableBody');
    let tableObj = [];
    if (library==null) {
        tableObj=[];
    }else {
        tableObj=JSON.parse(library);
        
    }
    tableObj.forEach(function(book,index){
        let uiString = `
            <tr >
                <td>${index+1}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                <td><button id="${index}" onclick="deleteBook(this.id)" type="button" class="btn btn-secondary">Delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += uiString;
    })
}

//function to show after deletion
// function showBook(){
//     let library = localStorage.getItem('library');
//     let tableBody = document.getElementById('tableBody');
//     let tableObj = [];
//     if (library==null) {
//         tableObj=[];
//     }else {
//         tableObj=JSON.parse(library);
        
//     }
//     tableObj.forEach(function(book,index){
//         let uiString = `
//             <tr >
//                 <td>${index+1}</td>
//                 <td>${book.name}</td>
//                 <td>${book.author}</td>
//                 <td>${book.type}</td>
//                 <td><button id="${index}" onclick="deleteBook(this.id)" type="button" class="btn btn-secondary">Delete</button></td>
//             </tr>
//         `;
//         tableBody.innerHTML += uiString;
//     })
// }

//function to delete a book
function deleteBook(index) {
    let library = localStorage.getItem('library');
    let tableObj = [];
    if(library==null){
        tableObj = [];
    }
    else{
        tableObj=JSON.parse(library);
    }
    tableObj.splice(index,1);
    localStorage.setItem('library',JSON.stringify(tableObj));
    console.log("sfdsfgdsfdsfvd", JSON.parse(library) )
    appear();
}



function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {
    
}
Display.prototype.set = function (book) {
    let tableBody = document.getElementById('tableBody');
    let library = localStorage.getItem('library');
    let tableObj = [];
    if (library==null) {
        tableObj=[];
    }else {
        tableObj=JSON.parse(library);
        
    }
    tableObj.push(book);
    localStorage.setItem('library',JSON.stringify(tableObj));
    console.log(tableObj);
    
    tableObj.forEach(function(book,index){
        if(tableObj.length-1===index){
            let uiString = `
                <tr >
                    <td>${index+1}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" type="button" class="btn btn-secondary">Delete</button></td>
                </tr>
            `;
            tableBody.innerHTML += uiString;
        }
    })
}

//add methods to display prototype

Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let uiString = `
            <tr >
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>
    `;
    tableBody.innerHTML += uiString;
}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 4 || book.author.length < 4) {
        return false;
    }
    else {
        return true;
    }
}
//implement the show function

Display.prototype.show = function (type, message) {
    let messages = document.getElementById('message');
    let ui = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${message}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    messages.innerHTML = ui;
    setTimeout(() => {
        messages.innerHTML = '';
    }, 2000);
}

//add submit eventlistner to libraryForm

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault();
    // console.log('form is submitted');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    // console.log(fiction);
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }
    // console.log(type)

    let book = new Book(name, author, type);
    // console.log(book);
    e.preventDefault();
    // console.log(book);
    display = new Display();
    if (display.validate(book)) {
        display.set(book);
        // display.add(book);
        display.clear();
        display.show("success", "Your book has been successfully added");
    }
    else {
        display.clear();
        display.show("danger", "Sorry! you cannot add this book");
    }

    display.clear();
}
