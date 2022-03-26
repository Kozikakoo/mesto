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

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    cards.forEach(card => {
      cardsList.addItem(createCard({
        name: card.name,
        link: card.link,
        likes: card.likes,
        id: card._id,
        userId: userId,
        ownerId: card.owner._id
      }))
    })
  })
  .catch(err => {
    console.log(err)
  });

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
            popupConfirm.closePopup()
          })
          .catch(console.log)
      });
    },
    handleLikeIcon: (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch(console.log)
      }
      else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch(console.log)
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
    popupWithFormAdd.renderLoading(true, '.popup__save-add');
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
        popupWithFormAdd.closePopup();
      }
      )
      .catch(console.log)
      .finally(() => {
        popupWithFormAdd.renderLoading(false, '.popup__save-add');
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
    popupWithFormEdit.renderLoading(true, '.popup__save-edit');
    api.editProfile(formData.person, formData.description)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormEdit.closePopup();
      })
      .catch(console.log)
      .finally(() => {
        popupWithFormEdit.renderLoading(false, '.popup__save-edit');
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
  submitForm: (formData) => console.log(formData)
}
)

const popupAvatar = new PopupWithForm('.popup_edit-avatar', {
  submitForm: (formData) => {
    const { link } = formData;
    popupAvatar.renderLoading(true, '.popup__save-avatar');
    api.editAvatar(link)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.closePopup();
      })
      .catch(console.log)
      .finally(() => {
        popupAvatar.renderLoading(false, '.popup__save-avatar');
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






