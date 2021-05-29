class Book {

  constructor(Title, Author, Pages, Readed) {
    this.Title = Title
    this.Author = Author
    this.Pages = Pages
    this.Readed = Readed
  }
}

function addListenerReadButton(readButton, readButtonText, Book){
  readButton.addEventListener('click', () => {
    index = library.indexOf(Book)
    if (readButtonText.textContent === 'YES') {
      library[index]['Readed'] = 'NO';
      readButtonText.textContent = 'NO';
    }
    else {
      library[library.indexOf(Book)]['Readed'] = 'YES';
      readButtonText.textContent = 'YES';

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

function modalChangeState(modal, modalContent) {
  modal.classList.toggle('modal-active');
  modalContent.classList.toggle('modal-content-active');
}


const newBookButton = document.querySelector('.book-creator-button');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
const form = document.querySelector('form');
const submitButton = document.querySelector('.submit');
const campos = document.querySelectorAll('input[type]');

persistence()

newBookButton.addEventListener('click', () => {
  modalChangeState(modal, modalContent);
})

closeModal.addEventListener('click', () => {
  modalChangeState(modal, modalContent);
  form.reset();
})

let newBook;

submitButton.addEventListener('click', function(e) {
    newBook = new Book(
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
    modalChangeState(modal);
    form.reset();

  })
