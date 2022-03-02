class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    openPopup() {
        this._popupSelector.classList.add('popup_open');
        window.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_open');
        window.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const popupOpened = document.querySelector('.popup_open');
            popupOpened.classList.remove('popup_open');
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this._popupSelector.classList.remove('popup_open');;
            }
        })
    }
}

export default Popup;