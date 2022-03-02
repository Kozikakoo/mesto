import '../pages/index.css'
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import {
  config,
  initialCards,
  cardsElement,
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  editForm,
  //profileName,
  // profileDesc,
  popupEditPerson,
  popupEditDesc,
  popupImage,
  popupAddNamePlace,
  popupAddLinkPlace,
  addForm
} from '../utils/constants.js';
import UserInfo from './UserInfo';

/* function resetError(formElement) {
  const inputs = [...formElement.querySelectorAll(config.inputSelector)];

  inputs.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains(config.inputErrorClass)) { inputElement.classList.remove(config.inputErrorClass); }

    errorElement.textContent = '';
  })
} */

/* function fillInEditProfilePopupFields() {
  popupEditPerson.value = profileName.textContent;
  popupEditDesc.value = profileDesc.textContent;
} */

/* function fillInAddCardPopupFields() {
  addForm.reset();
}
 */
/* function closePopup(popup) {
  popup.classList.remove('popup_open');
  window.removeEventListener('keydown', closePopupByEsc);
  resetError(popup);
} */

const popupEditClass = new Popup(popupEdit);
const popupAddClass = new Popup(popupAdd);
const popupWithImage = new PopupWithImage(popupImage, initialCards);
const popupWithFormAdd = new PopupWithForm(popupAdd, {
  submitForm: () => {
    const name = popupAddNamePlace.value;
    const link = popupAddLinkPlace.value;
    const item = {
      name,
      link
    }
    prependCard(item);
  }
}

);

const userInfo = new UserInfo({
  userName: popupEditPerson.value,
  userInfo: popupEditDesc.value
});



const popupWithFormEdit = new PopupWithForm(popupEdit, {
  submitForm: () => {
    userInfo.setUserInfo(popupEditPerson.value, popupEditDesc.value);
  }
}

);



/* function submitFormEditPopup(event) {
  event.preventDefault();

  profileName.textContent = popupEditPerson.value;
  profileDesc.textContent = popupEditDesc.value;

  popupEditClass.closePopup();
}
 */
/* function submitFormAddPopup(event) {
  event.preventDefault();
  const name = popupAddNamePlace.value;
  const link = popupAddLinkPlace.value;
  const item = {
    name,
    link
  }
  prependCard(item);
  event.target.reset();

  popupAddClass.closePopup();
} */

function prependCard(cardItem) {
  const card = new Card({
    items: cardItem,
    handleCardClick: () => {
      popupWithImage.openPopup(cardItem);
    }
  }, '.template');
  const cardElement = card.generateCard();
  const cardsElement = document.querySelector('.cards');

  cardsElement.prepend(cardElement);
}

editButton.addEventListener('click', function () {
  popupEditClass.openPopup();

  popupEditClass.setEventListeners();

  const formValidator = new FormValidator(config, editForm);
  formValidator.enableValidation();
})

addButton.addEventListener('click', () => {
  popupAddClass.openPopup();
  popupAddClass.setEventListeners();
  /* fillInAddCardPopupFields(); */

  const formValidator = new FormValidator(config, addForm);

  formValidator.enableValidation();
});

/* editForm.addEventListener('submit', submitFormEditPopup); */

/* addForm.addEventListener('submit', submitFormAddPopup); */

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      items: cardItem,
      handleCardClick: () => {
        popupWithImage.openPopup(cardItem);
      }
    }, '.template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    // Тело функции renderer пока оставим пустым
  },
},
  cardsElement
);

cardsList.renderItems();
popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAdd.closePopup();
popupWithFormEdit.setEventListeners();
popupWithFormEdit.closePopup();





