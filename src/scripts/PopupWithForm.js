import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    /* _getInputValues() {
       const inputs = [...this._popupSelector.querySelectorAll('.popup__form-field')];
       const res = {};

       for (let i=0; i<=inputs.length; i++) {
           let g = inputs[i];
           console.log(g);   
           let nameInput = g.value;
           console.log(g.value);
           let valueInput = g.name;
           valueInput = nameInput;
           res[valueInput] = nameInput

           console.log(res);
           
           
       }
       
       

   }  */



    /*    //function swap(obj) {
     const res = {};
     Object.keys(obj).forEach((key)=> {
      let value = obj[key];
       res[value] = key;
     })
       // добавьте в res ключи и значения obj, поменяв их местами
     
       return res;
     }
     
     const myObj = {
       first: 1,
       second: 2,
       third: 3
     };
     
     console.log(myObj); // { first: 1, second: 2, third: 3 }
     console.log(swap(myObj)); // { 1: "first", 2: "second", 3: "third" }
      */

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this._popupSelector.classList.remove('popup_open');
            }
        })
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm();
            this.closePopup();
        })
    }


    closePopup() {
        /* this._getInputValues(); */
        this._popupSelector.querySelector('.popup__form').reset();
        this._popupSelector.classList.remove('popup_open');
        window.removeEventListener('keydown', this._handleEscClose);

    }

}





export default PopupWithForm;