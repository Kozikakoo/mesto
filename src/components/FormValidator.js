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
        const forms = [...document.querySelectorAll(this._forms)];
        forms.forEach(() => this._setFormListeners(this._formElement, this._сonfig));
    }

    _setFormListeners() {
        this._formElement.addEventListener('submit', () => this._handleSubmit);
        this._formElement.addEventListener('input', () => this._setSubmitButtonState(this._formElement, this._config));

        const inputs = [...this._formElement.querySelectorAll(this._inputSelector)];

        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleFieldValidation(inputElement, this._formElement, this._config);
            })
        })
        this._setSubmitButtonState(this._formElement, this._config);
    }

    _setSubmitButtonState() {
        const buttons = [...this._formElement.querySelectorAll(this._submitButtonSelector)];
        buttons.forEach((button) => {
            button.disabled = !this._formElement.checkValidity();
            button.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
        })
    }

    _handleSubmit(event) {
        event.preventDefault();
    }

    _handleFieldValidation(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, this._formElement, this._config);
            // показывать ошибку
        } else {
            this._hideError(inputElement, this._formElement, this._config);
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
