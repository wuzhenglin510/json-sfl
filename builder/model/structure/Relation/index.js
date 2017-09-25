
class And_Model {
    constructor(entries) {
        this.type = 'And';
        this.entries = entries;
    }

    append(entry) {
        if (typeof this.entries === undefined) {
            this.entries = [];
        }
        this.entries.push(entry);
    }
}

class Or_Model {
    constructor(entries) {
        this.type = 'Or';
        this.entries = entries;
    }

    append(entry) {
        if (typeof this.entries === undefined) {
            this.entries = [];
        }
        this.entries.push(entry);
    }
}

function And(entriies) {
    return new And_Model(entriies);
}

function Or(entries) {
    return new Or_Model(entries);
}

module.exports = {
    And: And,
    Or: Or
};
