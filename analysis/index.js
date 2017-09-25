const Equations = [...Object.keys(require('../builder/model/structure/Equation'))];
const Relations = [...Object.keys(require('../builder/model/structure/Relation'))];

class Analysis {
    static test(model, instance) {
        return match(model, instance);
    }
}

function isEquation(type) {
    return Equations.includes(type);
}

function isRelation(type) {
    return Relations.includes(type)
}

function match(node, instance) {
    //如果不是 值判断节点，继续递归
    //等值类型包括
    if (isEquation(node.type)) {
        return matchEquation(node, instance);
    } else if (isRelation(node.type)) {
        return matchRelation(node, instance);
    } else {
        throw new Error('undefined model type');
    }
}

function matchRelation(equationNodeModel, instance) {
    switch (equationNodeModel.type) {
        case 'And': return matchAnd(equationNodeModel, instance);
        case 'Or': return matchOr(equationNodeModel, instance);
        default: throw new Error('undefined model type')
    }
}

function matchEquation(equationNodeModel, instance) {
    let value = instance;
    for (let subParam of equationNodeModel.param.split('.')) {
        if (typeof(value) == 'undefined') return false;
        value = value[subParam];
    }
    switch (equationNodeModel.type) {
        case 'Equal': return matchEqual(equationNodeModel.value, value);
        case 'In': return matchIn(equationNodeModel.value, value);
        case 'InLike': return matchInLike(equationNodeModel.value, value);
        case 'Between': return matchBetween(equationNodeModel.min, equationNodeModel.max, value);
        case 'Smaller': return matchSmaller(equationNodeModel.value, value);
        case 'Bigger': return matchBigger(equationNodeModel.value, value);
        default: throw new Error('undefined equation type');
    }
}

function matchAnd(equationNodeModel, instance) {
    for (let entry of equationNodeModel.entries) {
        if (!match(entry, instance)) return false;
    }
    return true
}

function matchOr(equationNodeModel, instance) {
    for (let entry of equationNodeModel.entries) {
        if (match(entry, instance)) return true;
    }
    return false;
}

function matchEqual(expect, realValue) {
    return expect === realValue;
}

function matchIn(expect, realValue) {
    return expect.includes(realValue);
}

function matchInLike(expects, realValue) {
    for (let expect of expects) {
        let regexp = new RegExp(expect);
        if (regexp.test(realValue)) return true;
    }
    return false;
}

function matchBetween(expectMin, expectMax, realValue) {
    return (realValue >= expectMin && realValue <= expectMax);
}

function matchSmaller(expect, realValue) {
    return realValue < expect;
}

function matchBigger(expect, realValue) {
    return realValue > expect
}



module.exports = Analysis;
