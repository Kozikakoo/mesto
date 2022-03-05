import Popup from "./Popup";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(item) {
        this._popup.classList.add('popup_open');
        window.addEventListener('keydown', this._handleEscClose);

        const popupImg = document.querySelector('.popup__img');
        const popupSign = document.querySelector('.popup__sign');

        popupImg.src = item.link;
        popupImg.alt = item.name;
        popupSign.textContent = item.name;
    }
}

export default PopupWithImage;