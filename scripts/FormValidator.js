class FormValidator {
    constructor(config, formElement){    
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

/* 
function enableValidation(сonfig) {
    const forms = [...document.querySelectorAll(сonfig.formSelector)];

    forms.forEach((formElement) => setFormListeners(formElement, сonfig));
}

function setFormListeners(formElement, config) {
    formElement.addEventListener('submit', handleSubmit);
    formElement.addEventListener('input', () => setSubmitButtonState(formElement, config));

    const inputs = [...formElement.querySelectorAll(config.inputSelector)];

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            handleFieldValidation(inputElement, formElement, config);
        })
    })
    setSubmitButtonState(formElement, config);
}
// проверка кнопки
function setSubmitButtonState(formElement, config) {
    const buttons = [...formElement.querySelectorAll(config.submitButtonSelector)];
    buttons.forEach((button) => {
        button.disabled = !formElement.checkValidity();
        button.classList.toggle(config.inactiveButtonClass, !formElement.checkValidity());
    })

}

function handleSubmit(event) {
    event.preventDefault();
}

function handleFieldValidation(inputElement, formElement, config) {
    if (!inputElement.validity.valid) {
        showError(inputElement, formElement, config);
        // показывать ошибку
    } else {
        hideError(inputElement, formElement, config);
        // скрывать
    }
}

function showError(inputElement, formElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);

    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, formElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);

    errorElement.textContent = '';
}


enableValidation(config); */

