import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: import.meta.env.VITE_DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "items")

const inputEl = document.getElementById('input-el')
const submitBtn = document.getElementById('input-btn')
const resetBtn = document.getElementById('clear-btn')
const listEl = document.getElementById('ul-el')

let list = []
render([])

function render(list) {
    let listItems = ''
    list.forEach(listItem => {
        listItems += `<li>${listItem}</li><button class='test'>Delete</button>`;
    });
    listEl.innerHTML = listItems
}

submitBtn.addEventListener('click', saveItem);
inputEl.addEventListener('keydown', saveItemOnEnter);

function saveItemOnEnter(e) {
    if (e.key === "Enter") {
    saveItem()}
    else {}
}


function saveItem() {
        const newItem = inputEl.value.trim();
        if (newItem) {
            push(referenceInDB, newItem)
            .then(() => {
                inputEl.value = ''
            })
            .catch(error => {
                console.error('Error adding item: ', error);
            });
        } else {
            alert('Please enter an item');
        }
}


onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const list = Object.values(snapshotValues)
        console.log(list);
        render(list)
    }
})

// DELETE ITEM
function deleteItem() {
    listEl
}


// RESET LIST
resetBtn.addEventListener('click', resetList)

function resetList() {
    remove(referenceInDB)
    .then(() => {
        list = []
        render(list)
    })
    .catch(error => {
        console.error('Error resetting list: ', error);
    });

}