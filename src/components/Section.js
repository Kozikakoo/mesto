class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._initialArray.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._container.append(element);
    } //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
}

export default Section;