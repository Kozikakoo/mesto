class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
    }

    getUserInfo() {
        return {
            nameValue: this._userName.textContent,
            infoValue: this._userInfo.textContent
        }
    }

    setUserInfo(nameValue, infoValue) {
        this._userName.textContent = nameValue;
        this._userInfo.textContent = infoValue;
    }

    fillUserInfo(nameInput, infoInput) {
        nameInput.value = this.getUserInfo().nameValue;
        infoInput.value = this.getUserInfo().infoValue;
    }
}

export default UserInfo;