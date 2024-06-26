/** Item model. */

const items = require("./fakeDb");

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        // keep track of all items
        items.push(this);
    }

    /** Find all items. */ 
    static findAll() {
        return items;
    }

    /** Find single item. */
    static find(name) {
        const foundItem = items.find(item => item.name === name);
        if (foundItem === undefined) {
            throw { message: "Item Not Found", status: 404 };
        }
        return foundItem;
    }

    /** Update found item with matching name to data. */
    static update(name, data) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw { message: "Item Not Found", status: 404 };
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    /** Remove item with matching name. */
    static remove(name) {
        let foundIndex = items.findIndex(item => item.name === name);
        if (foundIndex === -1) {
            throw { message: "Item Not Found", status: 404};
        }
        items.splice(foundIndex, 1);
    }
}

module.exports = Item;