const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__form-field_type_error',
};

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


enableValidation(config);

