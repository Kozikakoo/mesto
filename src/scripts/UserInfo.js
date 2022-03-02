class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo(nameValue, infoValue) {
        return { 
            nameValue,
            infoValue
        }
    }

    setUserInfo(nameValue, infoValue) {
        this._userName.textContent = nameValue;
        this._userInfo.textContent = infoValue;
    }
}

export default UserInfo;