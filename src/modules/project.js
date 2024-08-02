export default class project {
    constructor(name) {
        this.name = name;
        this.items = []
    }

    addItem(todoItem) {
        this.items.push(todoItem);
    }

    removeItem(todoItem) {
        let idx = this.items.indexOf(todoItem);
        this.items.splice(idx, 1);
    }
}