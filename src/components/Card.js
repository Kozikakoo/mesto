class Card {
    constructor({ items, handleCardClick }, cardSelector) {
        this._initialArray = items;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card').
            cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__title').textContent = this._initialArray.name;
        this._element.querySelector('.card__image').style.backgroundImage = `url(${this._initialArray.link})`;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._element.querySelector('.card__delete').addEventListener('mouseup', () => { this._handleDeleteClick(); })
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDeleteClick() {
        this._element.querySelector('.card__delete').closest(".card").remove();
    }
}


export default Card;
