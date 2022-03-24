import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll('.popup__form-field');// достаём все элементы полей
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

    changeSubmitHandler(newSubmitForm) {
        this._submitForm = newSubmitForm
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }

    renderLoading(isLoading, SelectorButton) {
        const buttonSave = document.querySelector(SelectorButton);
        if (isLoading) {
          buttonSave.textContent = "Сохранить..."
        }
        else {
            switch (SelectorButton) {
                case ".popup__save-add":
                    buttonSave.textContent = "Создать"
                case ".popup__save-edit":
                    buttonSave.textContent = "Сохранить"
                case ".popup__save-avatar":
                    buttonSave.textContent = "Сохранить"
            }
        }}

    closePopup() {
        super.closePopup();

        this._form.reset();
    }
}

export default PopupWithForm;