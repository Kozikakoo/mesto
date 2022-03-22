import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import {
  config,
  initialCards,
  editButton,
  addButton,
  profileImage,
  popupEditPerson,
  popupEditDesc
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo';
import { api } from '../components/Api.js';

let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res)
    userId = res._id
  }
  )

api.getCards()
  .then(data =>
    data.forEach(card => {
      cardsList.addItem(createCard({
        name: card.name,
        link: card.link,
        likes: card.likes,
        id: card._id,
        userId: userId,
        ownerId: card.owner._id
      }))
    }))

function renderLoading(isLoading) {
  const buttonSave = document.querySelector(config.submitButtonSelector);
  if (isLoading) {
    buttonSave.textContent = 'Сохранение...'
  }
}

function createCard(cardItem) {
  const card = new Card({
    items: cardItem,
    handleCardClick: () => {
      popupWithImage.openPopup(cardItem);
    },
    handleDeleteCard: (id) => {
      popupConfirm.openPopup();
      popupConfirm.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard()
          })
      });
    },
    handleLikeIcon: (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
      }
      else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
      }


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
    renderLoading(true);
    api.addCard(formData.name, formData.link)
      .then(res => {
        const item = {
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
        }
        cardsList.prependItem(createCard(item));
      }
      )
      .finally(() => {
        renderLoading(false);
      })
  }
});

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__desc',
  userAvatar: '.profile__image'
});

const popupWithFormEdit = new PopupWithForm('.popup_edit', {
  submitForm: (formData) => {
    renderLoading(true);
    api.editProfile(formData.person, formData.description)
      .then((res) => { userInfo.setUserInfo(res); })
      .finally(() => {
        renderLoading(false);
      })
  }
}
);

const cardsList = new Section({
  items: [],
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
},
  ".cards"
);

const popupConfirm = new PopupWithForm('.popup_delete-confirm', {
  submitForm: () => {
    api.deleteCard();
  }
});

const popupAvatar = new PopupWithForm('.popup_edit-avatar', {
  submitForm: (formData) => {
    const { link } = formData;
    renderLoading(true);
    api.editAvatar(link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .finally(() => {
        renderLoading(false);
      })
  }
});


editButton.addEventListener('click', function () {
  popupWithFormEdit.openPopup();
  userInfo.fillUserInfo(popupEditPerson, popupEditDesc);
  formValidators['edit-profile'].resetValidation();
})

addButton.addEventListener('click', () => {
  popupWithFormAdd.openPopup();
  formValidators['add-place'].resetValidation();
});

profileImage.addEventListener('click', () => {
  popupAvatar.openPopup();
  formValidators['popupAvatar'].resetValidation();
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
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();






