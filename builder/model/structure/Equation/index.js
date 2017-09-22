
class Equal_Model {
    constructor(param, value) {
        this.type = 'Equal';
        this.param = param;
        this.value = value;
    }
}

class InLike_Model {
    constructor(param, value) {
        this.type = 'InLike';
        this.param = param;
        this.value = value;
    }
}

class In_Model {
    constructor(param, value) {
        this.type = 'In';
        this.param = param;
        this.value = value;
    }
}

function Equal(param, value) {
    return new Equal_Model(param, value);
}

function InLike(param, value) {
    return new InLike_Model(param, value);
}

function In(param, value) {
    return new In_Model(param, value);
}

module.exports = {
    Equal: Equal,
    InLike: InLike,
    In: In,
};