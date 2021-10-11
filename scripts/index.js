const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit');
const form = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__save');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc')
const popupName = document.querySelector('.popup__form-name');
const popupDesc = document.querySelector('.popup__form-desc');

function openPopup() {
  popup.classList.add('popup_is_open')
};

function closePopup() {
  popup.classList.remove('popup_is_open')
};


editButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

function submitForm(event) {
  event.preventDefault();
  if (popupName.value === '' && popupDesc.value === '') {
    profileName.textContent = profileName.textContent;
    profileDesc.textContent = profileDesc.textContent;
  }
  else if (popupName.value === '' && popupDesc.value !== '') {
    profileName.textContent = profileName.textContent;
    profileDesc.textContent = popupDesc.value;
  }
  else if (popupName.value !== '' && popupDesc.value === '') {
    profileName.textContent = popupName.value;
    profileDesc.textContent = profileDesc.textContent;
  }
  else {
    profileName.textContent = popupName.value;
    profileDesc.textContent = popupDesc.value;
  }
  closePopup()
}

form.addEventListener('submit', submitForm);
popupSave.addEventListener('click', submitForm);



const Like = document.querySelectorAll('.card__like');

for (let i = 0; i < Like.length; i++) {
  let self = Like[i];
  self.addEventListener('click', function () {
    Like[i].classList.toggle('card__like_heart_full')
    Like[i].classList.toggle('card__like_heart_origin')
  })
}
