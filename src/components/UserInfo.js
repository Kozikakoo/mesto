class UserInfo {
    constructor({ userName, userInfo, userAvatar }) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        }
    }

    setUserInfo({name, about, avatar}) {
        this._userName.textContent = name;
        this._userInfo.textContent = about;
        this._userAvatar.src = avatar;
        console.log(avatar);
    }

    fillUserInfo(nameInput, infoInput) {
        const {name, about} = this.getUserInfo()
        nameInput.value = name;
        infoInput.value = about;
    }
}

export default UserInfo;