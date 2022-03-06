import Popup from "./Popup";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__img');
        this._popupSign = this._popup.querySelector('.popup__sign');
    }

    openPopup(item) {
        super.openPopup();

        this._popupImg.src = item.link;
        this._popupImg.alt = item.name;
        this._popupSign.textContent = item.name;
    }
}

export default PopupWithImage;