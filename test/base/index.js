const assert = require('assert');
const data = require('../data');
const B = require('../../builder/index'); // Builder
const A = require('../../analysis/index'); // Analysis

describe('#Test_Equation', function () {
    describe('#Test_Equal', function () {
        it('[flat] should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Equal('name', 'leo');
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[flat] should be false when not matched', function () {
            let instance = data.person.silence;
            let queryModel = B.E.Equal('name', 'silence***');
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it('[hierarchy] should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Equal('contact.phone', '13800138000');
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[hierarchy] should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Equal('contact.phone', '110110110110');
            assert(!A.test(queryModel, instance), 'should be false');
        });
    });

    describe('#Test_In', function () {
        it('should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.In('name', ['leo', 'bee']);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.In('name', ['silence', 'bee']);
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it('should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.In('contact.phone', ['13800138000', '10086100866']);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.In('contact.phone', ['15555555555', '10086100866']);
            assert(!A.test(queryModel, instance), 'should be false');
        })
    });

    describe('#Test_InLike', function () {
        it('should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.InLike('name', ['e+']);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('should be false when matched', function () {
            let instance = data.person.luffy;
            let queryModel = B.E.InLike('name', ['e+']);
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it('should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.InLike('name', ['\\w+']);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('should be false when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.InLike('name', ['luffy']);
            assert(!A.test(queryModel, instance), 'should be false');
        });
    })

    describe('#Test_Smaller', function () {
        it('[flat] should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Smaller('age', '25');
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[flat] should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Smaller('age', '23');
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it('[flat] should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Smaller('age', '22');
            assert(!A.test(queryModel, instance), 'should be false');
        });

    });

    describe('#Test_Bigger', function () {
        it('[flat] should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Bigger('age', '22');
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[flat] should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Bigger('age', '23');
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it('[flat] should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.E.Bigger('age', '24');
            assert(!A.test(queryModel, instance), 'should be false');
        });

    });


});


describe('#Test_Relation', function () {

    describe('#Test_And', function () {
        it('[flat] and should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.And([
                B.E.Equal('name', 'leo'),
                B.E.Equal('age', 23)
            ]);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[flat] and should be false when not mateched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.And([
                B.E.Equal('name', 'leo'),
                B.E.Equal('age', 24)
            ]);
            assert(!A.test(queryModel, instance), 'should be false');
        });

        it ('[hierarchy] and should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.And([
                B.E.Equal('name', 'leo'),
                B.E.Equal('age', 23),
                B.E.Equal('contact.address', '广东省深圳市南山区')
            ]);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it ('[hierarchy] and should be false when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.And([
                B.E.Equal('name', 'leo'),
                B.E.Equal('age', 23),
                B.E.Equal('contact.address', '广东省深圳市南山区'),
                B.E.Equal('contact.phone', '10086100866')
            ]);
            assert(!A.test(queryModel, instance), 'should be false');
        });
    });

    describe('#Test_Or', function () {
        it('[flat] and should be true when matched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.Or([
                B.E.Equal('name', 'leo'),
                B.E.Equal('age', 24)
            ]);
            assert(A.test(queryModel, instance), 'should be true');
        });

        it('[flat] and should be false when not matched', function () {
            let instance = data.person.leo;
            let queryModel = B.R.Or([
                B.E.Equal('name', 'luffy'),
                B.E.Equal('age', 24)
            ]);
            assert(!A.test(queryModel, instance), 'should be false');
        });
    })

});