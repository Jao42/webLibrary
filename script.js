function Book(Title, Author, Pages, Readed) {

  return { Title, Author, Pages, Readed }

}

function addListenerReadButton(readButton, readOption, Book){
  readButton.addEventListener('click', () => {
    index = library.indexOf(Book)
    if (readOption.textContent === 'YES') {
      library[index]['Readed'] = 'NO';
      readOption.textContent = 'NO';
    }
    else {
      library[library.indexOf(Book)]['Readed'] = 'YES';
      readOption.textContent = 'YES';

      }

    localStorage.removeItem(String(index))
    localStorage.setItem(String(index), JSON.stringify(library[index]))
  })
} 

let library = []
cardBox = document.querySelector('.card-box');

function createLibraryElements(Book) {

    card = document.createElement('div');
    closeButton = document.createElement('div');
    cardTable = document.createElement('div');
    divTitle = document.createElement('div');
    divAuthor = document.createElement('div');
    divPages = document.createElement('div');
    divReaded = document.createElement('div');

    tableRows = {
      Title: divTitle,
      Author: divAuthor,
      Pages: divPages,
      Readed: divReaded

    }
    card.classList.add('card');
    /*card.setAttribute('id', `card${library.indexOf(Book)}`);*/
    closeButton.textContent = '×';
    closeButton.classList.add('closeButton');
    divTitle.classList.add('card-title');
    card.appendChild(closeButton);
    card.appendChild(cardTable);
    cardBox.appendChild(card);
}

function putTableContent(tableRows, Book) {

  for (key in tableRows) {
    if (key === 'Title') {
      tableRows[key].innerHTML = '<span></span>';
      tableRows[key].firstElementChild.textContent = Book[key];
    }

    else if (key === 'Readed') {
      tableRows[key].innerHTML = `<span>${key}:</span> <div class="right readOptions"><span>${Book[key]}</span> <input type="checkbox" ${Book[key] == 'YES'? 'checked':''}/></div>`;
    }

    else {
      tableRows[key].innerHTML = '<span></span> <span class="right"></span>';
      tableRows[key].firstElementChild.textContent = key + ':';
      tableRows[key].lastElementChild.textContent = Book[key];
    }    
  cardTable.appendChild(tableRows[key]);

  }
}

function closeButtonListener(closeButton, card, cardBox, newBook) {
  closeButton.addEventListener('click', () => {
    cardBox.removeChild(card);
    index = library.indexOf(newBook)
     /* delete library[index]; */
    library.splice(index, 1);
    localStorage.clear();
    library.forEach((e, i) => {
      localStorage.setItem(String(i), JSON.stringify(e));
    
    })
  })
}

function updateCardListeners(newBook) {

  readOptionsDivs = document.querySelectorAll('.readOptions');
  changeReadButtons = document.querySelectorAll('.readOptions > input');

  lastReadOption = changeReadButtons[changeReadButtons.length -1].previousElementSibling;
  lastReadButton = changeReadButtons[changeReadButtons.length -1];

  addListenerReadButton(lastReadButton, lastReadOption, newBook);
  closeButtonListener(closeButton, card, cardBox, newBook);
}

function persistence() {
  if (library.length < localStorage.length) {
      elementsNum = localStorage.length;

      for(let i = 0; i < elementsNum; i++) {
        restoreBook = localStorage.getItem(String(i)) 
        restoreBook = JSON.parse(restoreBook)
      
        library.push(restoreBook)
        createLibraryElements(restoreBook);
        putTableContent(tableRows, restoreBook);
        updateCardListeners(restoreBook);
    }  
  }
}


const newBookButton = document.querySelector('.book-creator-button');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
const form = document.querySelector('form');
const submitButton = document.querySelector('.submit');
const campos = document.querySelectorAll('input[type]');

persistence()


/*
defaultBook = new Book('O Hobbit', 'J.R Tolkien', 360, 'NO');
defaultCard = document.querySelector('.card');
defaultCard.setAttribute('id', `card${library.indexOf(defaultBook)}`);
library.push(defaultBook)
closeButtonListener(document.querySelector('.card > .closeButton'), defaultCard, cardBox, library.indexOf(defaultBook));
lastReadOption = changeReadButtons[changeReadButtons.length -1].previousElementSibling;
lastReadButton = changeReadButtons[changeReadButtons.length -1];

addListenerReadButton(lastReadButton, lastReadOption, defaultBook);
*/

newBookButton.addEventListener('click', () => {
  modal.style.display = 'grid';
  modalContent.style.display = 'flex';
})

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalContent.style.display = 'none';
  form.reset();
})

let newBook;

submitButton.addEventListener('click', function(e) {
    newBook = Book(
      campos[0].value,
      campos[1].value,
      campos[2].value,
      (campos[3].checked ? 'YES': 'NO') 
    ) 
  
    library.push(newBook);
    localStorage.setItem(`${library.indexOf(newBook)}`, JSON.stringify(newBook));

    form.reset();
    modal.style.display = 'none';
  
    createLibraryElements(newBook);
    putTableContent(tableRows, newBook);

    readOptionsDivs = document.querySelectorAll('.readOptions');
    changeReadButtons = document.querySelectorAll('.readOptions > input');

    updateCardListeners(newBook);

  })
