class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    openPopup() {
        this._popup.classList.add('popup_open');
        window.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_open');
        window.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.closePopup();
            }
        })
    }
}

export default Popup;