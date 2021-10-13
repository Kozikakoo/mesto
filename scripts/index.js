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



