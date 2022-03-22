class Card {
    constructor({ items, handleCardClick, handleDeleteCard, handleLikeIcon }, cardSelector) {
        this._initialArray = items;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeIcon = handleLikeIcon;
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

    isLiked() {
        const userHasLikedCard = this._initialArray.likes.find(user => user._id === this._initialArray.userId)

        return userHasLikedCard
    }

    setLikes(newLikes) {
        this._initialArray.likes = newLikes;
        const likeCountElement = this._element.querySelector('.card__like-count');
        likeCountElement.textContent = this._initialArray.likes.length;

        if (this.isLiked()) {
            this._fillLike()
        }
        else {
            this._deleteLike()
        }
    }

    _fillLike() {
        this._likeButton.classList.add('card__like_active');
    }

    _deleteLike() {
        this._likeButton.classList.remove('card__like_active');
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__delete');

        this._setEventListeners();

        this._element.querySelector('.card__title').textContent = this._initialArray.name;
        this._cardImage.style.backgroundImage = `url(${this._initialArray.link})`;
        this.setLikes(this._initialArray.likes);

        if (this._initialArray.ownerId !== this._initialArray.userId) {
            this._deleteButton.style.display = 'none';
        }



        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeIcon(this._initialArray.id);
        })
        this._deleteButton.addEventListener('mouseup', () => { this._handleDeleteCard(this._initialArray.id) })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        })
    }



    deleteCard() {
        this._element.remove();
        this._element = null
    }


}


export default Card;
