function Book(title, author, pages, readed) {

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
}

function addListenerReadButton(readButton, readOption){
  readButton.addEventListener('click', () => {
    if (readOption.textContent === 'SIM') {
      readOption.textContent = 'NÃO';
    }
    else (readOption.textContent = 'SIM');
    
  })
} 

let library = []
cardBox = document.querySelector('.card-box');

function closeButtonListener(closeButton, card, cardBox) {
  closeButton.addEventListener('click', () => {
    index = parseInt(card.id[card.id.length - 1]);
    cardBox.removeChild(card);
    library.splice(index, 1);
  });
}

const newBookButton = document.querySelector('.book-creator-button');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
changeReadTds = document.querySelectorAll('.changeReadTd');
changeReadButtons = document.querySelectorAll('.changeReadTd > input');

defaultBook = new Book('O Hobbit', 'J.R Tolkien', 360, 'SIM');
library.push(defaultBook);
defaultCard = document.querySelector('.card');
defaultCard.setAttribute('id', `card${library.indexOf(defaultBook)}`);
closeButtonListener(document.querySelector('.card > .closeButton'), defaultCard, cardBox);

lastReadOption = changeReadTds[changeReadTds.length -1].previousElementSibling;
lastReadButton = changeReadButtons[changeReadButtons.length -1];

addListenerReadButton(lastReadButton, lastReadOption);

newBookButton.addEventListener('click', () => {
  modal.style.display = 'grid';
  modalContent.style.display = 'flex';
})


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalContent.style.display = 'none';
})

const form = document.querySelector('form');
const submitButton = document.querySelector('.submit');
const campos = document.querySelectorAll('input[type]');
let persistence = [];
let newBook;

submitButton.addEventListener('click', function(e) {
    newBook = new Book(
      campos[0].value,
      campos[1].value,
      campos[2].value,
      (campos[3].checked ? 'SIM': 'NÃO') 
    ) 
    library.push(newBook);
    form.reset();
    modal.style.display = 'none';
  
    card = document.createElement('div');
    closeButton = document.createElement('div');
    cardTable = document.createElement('table');
    trTitle = document.createElement('tr');
    trAuthor = document.createElement('tr');
    trPages = document.createElement('tr');
    trReaded= document.createElement('tr');

    tableRows = {
      title: trTitle,
      author: trAuthor,
      pages: trPages,
      readed: trReaded

    }

    for (key in tableRows) {
      if (key === 'title') {
        tableRows[key].innerHTML = `<th class="card-title">${newBook[key]}</th>`;
      }
      else if (key === 'readed') {
        tableRows[key].innerHTML = `<td>${key}:</td> <td>${newBook[key]}</td> <td class="changeReadTd"><input type="checkbox" ${newBook[key] == 'SIM'? 'checked':''}/></td>`;
      }
      else {
        tableRows[key].innerHTML = `<td>${key}:</td> <td>${newBook[key]}</td>`;
}    
    cardTable.appendChild(tableRows[key]);
  }

    card.classList.add('card');
    card.setAttribute('id', `card${library.indexOf(newBook)}`);
    closeButton.textContent = '×';
    closeButton.classList.add('closeButton');
    card.appendChild(closeButton);
    card.appendChild(cardTable);
    cardBox.appendChild(card);

    changeReadTds = document.querySelectorAll('.changeReadTd');
    changeReadButtons = document.querySelectorAll('.changeReadTd > input');

    lastReadOption = changeReadTds[changeReadTds.length -1].previousElementSibling;
    lastReadButton = changeReadButtons[changeReadButtons.length -1];

    addListenerReadButton(lastReadButton, lastReadOption);
    closeButtonListener(closeButton, card, cardBox);
})

