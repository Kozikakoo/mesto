class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._initialArray.forEach((item) => this._renderer(item));
    }

    addItem(item) {
        this._container.append(item);
    } //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.

    prependItem(item) {
       /*  const card = this._renderer(item) */
        this._container.prepend(item);
    }
}

export default Section;