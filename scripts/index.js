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

const popupCloseImage = document.querySelector('.popup-image__close');
const popupImage = document.querySelector('.popup-image');



function openPopupEdit() {
  popupEdit.classList.add('popup_open');
}

function editPopupEdit() {
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

function closePopupImage() {
  popupImage.classList.remove('popup_open');
}

function submitFormEditPopup(event) {
  event.preventDefault();

  profileName.textContent = popupEditPerson.value;
  profileDesc.textContent = popupEditDesc.value;

  closeEditPopup();
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

  closeAddPopup();
}



window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.popup').forEach((item) => item.classList.add('popup_transition'))
})

editButton.addEventListener('click', function () {
  openPopupEdit();
  editPopupEdit();
});

addButton.addEventListener('click', openPopupAdd);

popupCloseEditProfile.addEventListener('click', closeEditPopup);

popupCloseAddPlace.addEventListener('click', closeAddPopup);

popupCloseImage.addEventListener('click', closePopupImage);

editForm.addEventListener('submit', submitFormEditPopup);

addForm.addEventListener('submit', submitFormAddPopup);



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы, покрытые зеленью'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Водоем среди леса'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Жилой район'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Подножие горы'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога среди деревьев и кустарников'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал зимой'
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
    document.querySelector('.popup-image__img').src = item.link;
    document.querySelector('.popup-image__img').alt = item.alt;
    document.querySelector('.popup-image').classList.add('popup_open');
    document.querySelector('.popup-image').classList.add('popup_transition');
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

