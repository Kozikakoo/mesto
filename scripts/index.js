const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit');
const form = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__desc')
let popupPerson = document.querySelector('.popup__form-field_name_person');
let popupDesc = document.querySelector('.popup__form-field_name_desc');

function openPopup() {
  popup.classList.add('popup_open')

  popupPerson.value = profileName.textContent
  popupDesc.value = profileDesc.textContent

};

function closePopup() {
  popup.classList.remove('popup_open')
};

function submitForm(event) {
  event.preventDefault();

  profileName.textContent = popupPerson.value
  profileDesc.textContent = popupDesc.value

  closePopup();
}


editButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

form.addEventListener('submit', submitForm);

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

