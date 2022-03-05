import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import {
  config,
  initialCards,
  cardsElement,
  editButton,
  addButton,
  popupEditPerson,
  popupEditDesc,
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo';


function createCard(cardItem) {
  const card = new Card({
    items: cardItem,
    handleCardClick: () => {
      popupWithImage.openPopup(cardItem);
    }
  }, '.template');
  const cardElement = card.generateCard();
  // тут создаете карточку и возвращаете ее
  return cardElement
}

const popupWithImage = new PopupWithImage('.popup_image', initialCards);
const popupWithFormAdd = new PopupWithForm('.popup_add', {
  submitForm: (formData) => {
    //sozdanie karti
    const item = {
      name: formData.name,
      link: formData.link
    }
    cardsList.prependItem(createCard(item));

  }
});

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__desc'
});

const popupWithFormEdit = new PopupWithForm('.popup_edit', {
  submitForm: (formData) => {
    userInfo.setUserInfo(formData.person, formData.description);
  }
}
);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
},
  cardsElement
);

editButton.addEventListener('click', function () {
  popupWithFormEdit.openPopup();
  userInfo.fillUserInfo(popupEditPerson, popupEditDesc);
  formValidators['edit-profile'].resetValidation();
})

addButton.addEventListener('click', () => {
  popupWithFormAdd.openPopup();
  formValidators['add-place'].resetValidation();
});

const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

cardsList.renderItems();
popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();






