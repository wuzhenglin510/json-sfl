
class Equal_Model {
    constructor(param, value) {
        this.type = 'Equal';
        this.param = param;
        this.value = value;
    }
}

class Between_Model {
    constructor(param, min, max) {
        this.type = 'Between';
        this.param = param;
        this.min = min;
        this.max = max;
    }
}

class Smaller_Model {
    constructor(param, value) {
        this.type = 'Smaller';
        this.param = param;
        this.value = value;
    }
}

class Bigger_Model {
    constructor(param, value) {
        this.type = 'Bigger';
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

function Between(param, min, max) {
    return new Between_Model(param, min, max);
}

function Smaller(param, value) {
    return new Smaller_Model(param, value);
}

function Bigger(param, value) {
    return new Bigger_Model(param, value);
}

module.exports = {
    Equal: Equal,
    InLike: InLike,
    In: In,
    Between: Between,
    Smaller: Smaller,
    Bigger: Bigger
};