class FormValidator {
    constructor(config, formElement) {
        this._forms = config.formSelector;
        this._config = config;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._formElement = formElement;
    }

    enableValidation() { //может нужен config
        this._setFormListeners();
    }

    resetValidation() {
        this._setSubmitButtonState();
    }

    _setFormListeners() {
        this._formElement.addEventListener('submit', (evt) => this._handleSubmit(evt));
        this._formElement.addEventListener('input', () => this._setSubmitButtonState());

        const inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleFieldValidation(inputElement);
            })
        })
        this._setSubmitButtonState();
    }

    _setSubmitButtonState() {
        this._submitButton.disabled = !this._formElement.checkValidity();
        this._submitButton.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
    }


    _handleSubmit(event) {
        event.preventDefault();
    }

    _handleFieldValidation(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
            // показывать ошибку
        } else {
            this._hideError(inputElement);
            // скрывать
        }
    }

    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);

        errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);

        errorElement.textContent = '';
    }
}

export default FormValidator;
