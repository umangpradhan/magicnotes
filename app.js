//Display previous added notes, if any

showNotes();

//search bar

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("h4")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

// if user adds a note. add it to localstorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addText = document.getElementById('addText');
    if (addTitle.value == "" || addText.value == "") {
        alert(`Please enter note title and text values.`);
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";
    // console.log(notes);
    showNotes();
});

//function to show elements from local storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card mx-3 my-3 noteCard" style="width: 18rem;">
        <div class="card-body">
        <!--<h5 class="card-title">Note ${index + 1}
            <button id="${index}" onclick="markImpNote(this.id)" class="btn btn-sm" style='float:right; '><i class="bi bi-star-fill"></i></button>
            </h5>-->    
            <h4 class="card-title">${element.title} </h4>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger btn-sm btn-primary"><i class="bi bi-trash3-fill"></i></button>
            <button id="${index}" onclick="editNote(this.id)" class="btn btn-sm btn-primary"><i class="bi bi-pencil-square"></i></button>
            
        </div>
    </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Please use "Add a note" section above to add notes.`;
    }
};

//function to delete note

function deleteNote(index) {
    let confirmDel = confirm(`Do you want to delete this note?`);
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();

    };
};

//function to edit note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (addTitle.value !== "" || addText.value !== "") {
        alert(`Please clear the form to edit this note`);
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addText.value = element.text;
        index;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

