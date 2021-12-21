console.log('This is Notes App');

showNotes();

let addBtn = document.getElementById('addBtn').addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    let notesKey = localStorage.getItem('notesKey');

    if (notesKey == null) {
        notesClass = [];
    }
    else {
        notesClass = JSON.parse(notesKey);// this will convert your local storage string value to array
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesClass.push(myObj);// Add object to localStorage
    localStorage.setItem('notesKey', JSON.stringify(notesClass));// stringify will convert your array to string to store in local storage
    addTxt.value = "";// this will make your text area blank after inserting in local storage
    addTitle.value = "";
    showNotes();
});


// Function to show elements from localStorage 
function showNotes() {
    let notesKey = localStorage.getItem('notesKey');
    // console.log(notesKey);
    if (notesKey == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesKey);// this will convert your local storage string value to array
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-4 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title" style="font-weight: 700;">${element.title}</h5>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                          <!-- this will assign id as index valude of loop and pass it to delete function as argument-->
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


// Function to delete note 

function deleteNote(index) {
    
    let notesKey = localStorage.getItem('notesKey');
    
    if (notesKey == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(localStorage.notesKey);// this will convert your local storage string value to array
    }
    notesArr.splice(index, 1);// this will delete from array and not from local storage
    localStorage.setItem('notesKey', JSON.stringify(notesArr));// this will set changed array to local storage
    showNotes();
}


// Function to search a note
let search = document.getElementById('searchTxt');
search.addEventListener("input", function (e) {
    
    let inputSearch = search.value.toLowerCase();
    let nodeCard = document.getElementsByClassName('noteCard');
    Array.from(nodeCard).forEach(function (i) {
        let cardTxt = i.getElementsByTagName('p')[0].innerText;
        
        if (cardTxt.includes(inputSearch)) {
            i.style.display = "block";
        }
        else {
            i.style.display = "none";
        }
    })

})

