const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsElement = document.querySelector('.cards');
const templateItem = document.querySelector('.template').content;

initialCards.forEach(appendCard)

function createCard(item) {
  const element = templateItem.querySelector('.card').cloneNode(true);
  element.querySelector('.card__title').innerText = item.name;
  element.querySelector('.card__image').src = item.link;
  return element;
}

function appendCard(item) {
  const element = createCard(item);
  cardsElement.append(element);
}


const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseEditProfile = document.querySelector('.popup__close_edit-profile');
const popupCloseAddPlace = document.querySelector('.popup__close_add-place');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add')
const Editform = document.querySelector('.popup__form_edit-profile');
let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__desc')
let popupEditPerson = document.querySelector('.popup__form-field_name_person');
let popupEditDesc = document.querySelector('.popup__form-field_name_desc');


function openPopupEdit() {
  popupEdit.classList.add('popup_open');
  popupEditPerson.value = profileName.textContent;
  popupEditDesc.value = profileDesc.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_open');
}

function closeAddPopup() {
  popupAdd.classList.remove('popup_open');
}

function closeEditPopup() {
  popupEdit.classList.remove('popup_open');
}

function submitFormEditPopup(event) {
  event.preventDefault();

  profileName.textContent = popupEditPerson.value;
  profileDesc.textContent = popupEditDesc.value;

  closeEditPopup();
}



editButton.addEventListener('click', openPopupEdit);

addButton.addEventListener('click', openPopupAdd);

popupCloseEditProfile.addEventListener('click', closeEditPopup);

popupCloseAddPlace.addEventListener('click', closeAddPopup);

Editform.addEventListener('submit', submitFormEditPopup);


