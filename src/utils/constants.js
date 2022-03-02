export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-field_type_error'
};

export const initialCards = [
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

export const popupEdit = document.querySelector('.popup_edit');
export const popupAdd = document.querySelector('.popup_add');
export const editButton = document.querySelector('.profile__edit');
export const addButton = document.querySelector('.profile__add');
export const editForm = document.querySelector('.popup__form_edit-profile');
export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__desc');
export const popupEditPerson = document.querySelector('.popup__form-field_name_person');
export const popupEditDesc = document.querySelector('.popup__form-field_name_desc');
export const popupImage = document.querySelector('.popup_image');

export const popupAddNamePlace = document.querySelector('.popup__form-field_place_name');
export const popupAddLinkPlace = document.querySelector('.popup__form-field_place_link');
export const addForm = document.querySelector('.popup__form_add-place');

export const cardsElement = document.querySelector('.cards');

