import { profileName, profileDesc } from "../utils/constants"

class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo() {
        return {
            userName: this._userName,
            userInfo: this._userInfo
        }
    }

    setUserInfo(nameValue, infoValue) {
        profileName.textContent = nameValue;
        profileDesc.textContent = infoValue;
    }
}

export default UserInfo;