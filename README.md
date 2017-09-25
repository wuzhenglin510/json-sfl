# json-sfl

Use structure query language to filter json object. But it`s not a query system like mysql, just a filter condition. You feed it with a filter model and a json isntance object, it will spit out true or false, depend on the json object is matched by the filter model or not.

## Installation

    npm install json-sfl --save

## Quick Usage

    const B = require('../../builder/index'); // Builder
    const A = require('../../analysis/index'); // Analysis

    //single equal
    let queryModel = B.E.Equal('contact.phone', '110110110110');

    //multi equal with and
    let queryModel2 = B.R.And([
        B.E.Equal('name', 'leo'),
        B.E.Equal('age', 23)
     ]);

    if (A.instance().test(queryModel, instance)) {
    	console.log('yes, it is')
    } else {
    	console.log('no, it isn`t')
    }



## Document

- Builder: is the a class for building structure filtel model
  - Node Type: node is a sub filter model, node model type decide the analysis how to check the value
    - Equation:
      - Equal: single specifics value equal expression
      - In: multi specifics values include expression
      - InLike: multi regex values include expression
      - Between
      - Smaller
      - Bigger
    - Relation
      - And: node in the and relation should all true
      - Or: node in the or relation should one true at least, as a result reuturn true
- Analysis: is the handler to check json object whether matched the filter model

more usage can see test file