const assert = require('assert');
const data = require('../data/index');
const B = require('../../builder/index'); // Builder
const A = require('../../analysis/index'); // Analysis

describe('#ComplexTest', function () {

    it('should has 3 item hit', function () {
        let hits = [];
        let queryModel = B.R.Or([
            B.E.Equal('sex', 'female'),
            B.R.And([
                B.E.Equal('name', 'leo'),
                B.E.Equal('contact.phone', '13800138000'),
                B.E.Equal('age', 23)
            ])
        ]);
        let analysis = A.instance();
        for (let person of Object.values(data.person)) {
            if (analysis.test(queryModel, person)) hits.push(person);
        }
        assert(hits.length == 3, `should has 3 item, but get ${hits.length}`);
    });

    it('should has 3 item hit', function () {
        let hits = [];
        let queryModel = B.E.InLike('contact.address', [
            '深圳市'
        ]);
        let analysis = A.instance();
        for (let person of Object.values(data.person)) {
            if (analysis.test(queryModel, person)) hits.push(person);
        }
        assert(hits.length == 3, `should has 3 item, but get ${hits.length}`);
    });

    it('should has 4 item hit', function () {
        let hits = [];
        let queryModel = B.E.InLike('contact.address', [
            '深圳市',
            '北京市'
        ]);
        let analysis = A.instance();
        for (let person of Object.values(data.person)) {
            if (analysis.test(queryModel, person)) hits.push(person);
        }
        assert(hits.length == 4, `should has 4 item, but get ${hits.length}`);
    });

    it('should has 2 item hit', function () {
        let hits = [];
        let queryModel = B.E.In('name', [
            'leo',
            'bee'
        ]);
        let analysis = A.instance();
        for (let person of Object.values(data.person)) {
            if (analysis.test(queryModel, person)) hits.push(person);
        }
        assert(hits.length == 2, `should has 2 item, but get ${hits.length}`);
    })
});
