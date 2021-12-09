class Card {
    constructor(text, image, openPopup) {
        this._text = text;
        this._image = image;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const cardElement = document.querySelector('.template').content.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__title').textContent = this._text;
        this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._element.querySelector('.card__delete').addEventListener('mouseup', () => { this._handleDeleteClick(); })
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDeleteClick() {
        this._element.querySelector('.card__delete').closest(".card").remove();
    }

    _handleImageClick() {
        const popupImage = document.querySelector('.popup_image');
        const popupImg = document.querySelector('.popup__img');
        const popupSign = document.querySelector('.popup__sign');

        this._openPopup(popupImage);
       
        popupImg.src = this._image;
        popupImg.alt = this._text;
        popupSign.textContent = this._text;
    }
}


export default Card;
