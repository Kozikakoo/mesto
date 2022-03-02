import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const inputs = [...this._popupSelector.querySelectorAll('.popup__form-field')];
        const res = {};

        for (let i = 0; i <= inputs.length; i++) {
            let g = inputs[i];
            let nameInput = g.value;
            let valueInput = g.name;
            res[valueInput] = nameInput
        }
        return res
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this._popupSelector.classList.remove('popup_open');
            }
        })
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm();
            this.closePopup();
        })
    }

    closePopup() {
        this._popupSelector.querySelector('.popup__form').reset();
        this._popupSelector.classList.remove('popup_open');
        window.removeEventListener('keydown', this._handleEscClose);
    }
}

export default PopupWithForm;