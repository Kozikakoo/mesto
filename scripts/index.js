const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseEditProfile = document.querySelector('.popup__close_edit-profile');
const popupCloseAddPlace = document.querySelector('.popup__close_add-place');
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

const popupCloseImage = document.querySelector('.popup__close_image');
const popupImage = document.querySelector('.popup_image');

const popupAll = document.querySelectorAll('.popup');

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function editPopupEdit() {
  popupEditPerson.value = profileName.textContent;
  popupEditDesc.value = profileDesc.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
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

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  editPopupEdit();
  setSubmitButtonState(editForm, config);
})

addButton.addEventListener('click', () => openPopup(popupAdd));

popupCloseEditProfile.addEventListener('click', () => closePopup(popupEdit));

popupCloseAddPlace.addEventListener('click', () => closePopup(popupAdd));

popupCloseImage.addEventListener('click', () => closePopup(popupImage));

editForm.addEventListener('submit', submitFormEditPopup);



addForm.addEventListener('submit', submitFormAddPopup);

popupAll.forEach((element) => element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_open');
  }
}));

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupAll.forEach((element) => {
      if (element.classList.contains('popup_open')) {
        element.classList.remove('popup_open');
      }
    })
  }
})



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
  element.querySelector('.card__title').textContent = item.name;
  element.querySelector('.card__image').style.backgroundImage = `url(${item.link})`;
  element.querySelector('.card__delete').addEventListener('mouseup', (event) => { event.target.closest(".card").remove() });
  element.querySelector('.card__like').addEventListener('click', (event) => { event.target.classList.toggle('card__like_active') });
  element.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupImage);
    document.querySelector('.popup__img').src = item.link;
    document.querySelector('.popup__img').alt = item.name;
    document.querySelector('.popup__sign').textContent = item.name;
  })
  return element;
};

function appendCard(item) {
  const element = createCard(item);
  cardsElement.append(element);
}

function prependCard(item) {
  const element = createCard(item);
  cardsElement.prepend(element);
}

