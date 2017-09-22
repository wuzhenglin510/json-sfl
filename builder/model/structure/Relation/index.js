
class And_Model {
    constructor(entries) {
        this.type = 'And';
        this.entries = entries;
    }
}

class Or_Model {
    constructor(entries) {
        this.type = 'Or';
        this.entries = entries;
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
