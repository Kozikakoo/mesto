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
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__delete');

        this._setEventListeners();

        this._element.querySelector('.card__title').textContent = this._initialArray.name;
        this._cardImage.style.backgroundImage = `url(${this._initialArray.link})`;

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })
        this._deleteButton.addEventListener('mouseup', () => { this._handleDeleteClick(); })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null
    }
}


export default Card;
