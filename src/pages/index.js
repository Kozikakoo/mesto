import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import {
  config,
  initialCards,
  cardsElement,
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  editForm,
  profileName,
  profileDesc,
  popupEditPerson,
  popupEditDesc,
  popupImage,
  popupAddNamePlace,
  popupAddLinkPlace,
  addForm
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo';

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
  userName: profileName,
  userInfo: profileDesc
});

const popupWithFormEdit = new PopupWithForm(popupEdit, {
  submitForm: () => {
    userInfo.setUserInfo(popupEditPerson.value, popupEditDesc.value);
  }
}
);

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

editButton.addEventListener('click', function () {
  popupEditClass.openPopup();

  popupEditClass.setEventListeners();

  const formValidator = new FormValidator(config, editForm);
  formValidator.enableValidation();
})

addButton.addEventListener('click', () => {
  popupAddClass.openPopup();
  popupAddClass.setEventListeners();

  const formValidator = new FormValidator(config, addForm);

  formValidator.enableValidation();
});

cardsList.renderItems();
popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAdd.closePopup();
popupWithFormEdit.setEventListeners();
popupWithFormEdit.closePopup();






