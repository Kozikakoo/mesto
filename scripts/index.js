import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add')
const editForm = document.querySelector('.popup__form_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');
const popupEditPerson = document.querySelector('.popup__form-field_name_person');
const popupEditDesc = document.querySelector('.popup__form-field_name_desc');

const popupAddNamePlace = document.querySelector('.popup__form-field_place_name');
const popupAddLinkPlace = document.querySelector('.popup__form-field_place_link');
const addForm = document.querySelector('.popup__form_add-place');

const popupList = document.querySelectorAll('.popup');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-field_type_error'
};

function resetError(formElement) {
  const inputs = [...formElement.querySelectorAll(config.inputSelector)];

  inputs.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains(config.inputErrorClass)) 
    { inputElement.classList.remove(config.inputErrorClass); }

    errorElement.textContent = '';
  })
}


function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_open');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_open');
  window.addEventListener('keydown', closePopupByEsc);
}

function fillInEditProfilePopupFields() {
  popupEditPerson.value = profileName.textContent;
  popupEditDesc.value = profileDesc.textContent;
}

function fillInAddCardPopupFields() {
  addForm.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  window.removeEventListener('keydown', closePopupByEsc);
  resetError(popup);
}

function submitFormEditPopup(event) {
  event.preventDefault();

  profileName.textContent = popupEditPerson.value;
  profileDesc.textContent = popupEditDesc.value;

  closePopup(popupEdit);
}

function submitFormAddPopup(event) {
  event.preventDefault();
  const name = popupAddNamePlace.value;
  const link = popupAddLinkPlace.value;
  const item = {
    name,
    link
  }
  prependCard(item);
  event.target.reset();

  closePopup(popupAdd);
}

function prependCard(item) {
  const card = new Card(item.name, item.link, openPopup);
  const cardElement = card.generateCard();
  const cardsElement = document.querySelector('.cards');

  cardsElement.prepend(cardElement);
}

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  fillInEditProfilePopupFields();

  const formValidator = new FormValidator(config, editForm);
  formValidator.enableValidation();
})

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  fillInAddCardPopupFields();

  const formValidator = new FormValidator(config, addForm);

  formValidator.enableValidation();
});

editForm.addEventListener('submit', submitFormEditPopup);

addForm.addEventListener('submit', submitFormAddPopup);

popupList.forEach((element) => element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(element);
  }
}));

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

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, openPopup, '.template');
  const cardElement = card.generateCard();
  const cardsElement = document.querySelector('.cards');

  cardsElement.append(cardElement);
});

