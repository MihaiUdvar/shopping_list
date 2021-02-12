// lista de cumparaturi:
// Un formular de adaugare noi elemente in lista de cumparaturi:
// formularul contine un input de tip text si un buton "Add item"
// adaugarea elementelor noi se poate face atat la apasarea tastei enter cat si la apasarea butonului "Add item"
// Un tabel unde sunt afisate elementele adaugate in lista folosind formularul:
// elementele vor fi afisate sub forma unui tabel cu 2 coloane: item description, action
// in coloana item description va fi afisat textul introdus de utilizator in lista, iar pe coloana action va fi afisat un buton "Mark as buyed''
// butonul 'Mark as buyed" va adauga o clasa de css randului din tabel, ce va face textul sa apara taiat: "strikethrough
// deasupra listei ce afiseaza elementele adaugate de utilizator, adaugati 2 butoane ce vor sorta crescator si descrescator elementele listei

const input = document.querySelector('input');
const inputBtn = document.querySelector('.btnAdd');
const sortAsc = document.querySelector('.btnAsc');
const sortDesc = document.querySelector('.btnDesc');
let button = document.querySelector('.btnMark-no');
const container = document.querySelector('.container');
const tableHeader = document.querySelector('.tableHeader')
const list = document.querySelector('ul');


inputBtn.addEventListener('click', addToList);
input.addEventListener('keypress', addItemsOnEnter);

function addItemsOnEnter(e){
    console.log(e.key);
    if(e.key == "Enter"){
        addToList();
    }
}


let tempList = [];  // temp arr to store and compare values

function addToList(){   
    // CREATE NEW LI ELEMENTS
    let listItem = document.createElement('li');
    listItem.className='row';
    let paraItem = document.createElement('p');
    
    let media = window.matchMedia("(max-width: 500px)");
    if(media.matches){
        paraItem.className = 'para hand mobile';
    }
    else{
        paraItem.className = 'para hand';
    }
    paraItem.innerText = input.value;
    
    listItem.appendChild(paraItem);
    //console.log(listItem);
    tempList.push(input.value); //input elements in storage arr
    console.log(tempList);
    input.value = '';


    // CREATE LIST BUTTON
    let btnMarkBought = document.createElement('button');
    let textNode = document.createTextNode('Mark as bought');
    btnMarkBought.appendChild(textNode);
    btnMarkBought.className = 'btnMark';
    listItem.appendChild(btnMarkBought); 
    list.appendChild(listItem);
}

let table = document.querySelector('.table');
table.addEventListener('click', crossOver);

function crossOver(e) {
	if (e.target.classList.contains('mobile')) {
		e.target.style.textDecoration = "line-through";
	}
    else if(e.target.classList.contains('btnMark')){
        let listItem = e.target.previousSibling;
		listItem.style.textDecoration = "line-through";
    }
}

// SORTING FUNCTIONS
sortAsc.addEventListener('click', sortList);
function sortList() {
    let tempListSortedArr = [];
    tempListSortedArr = tempList.sort();
    console.log(tempListSortedArr);
    
    let liHeader = `<li class="tableHeader row">
    <p class="para">ITEM DESCRIPTION</p> 
    <p class="para">ACTION</p>                  
</li>`;
    let liInputs = tempListSortedArr.map((el) => 
        `<li class="row">
        <p class="para hand mobile">${el}</p>
        <button class="btnMark">Mark as bought</button>
        </li>`    
    );
    console.log(liInputs);
    document.querySelector('.tableUl').innerHTML = liHeader + liInputs.join(" ");
}

