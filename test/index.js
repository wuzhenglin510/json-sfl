const fs = require('fs');
const path = require('path');

describe('test', function() {
    let testDir = __dirname;
    let tests = fs.readdirSync(testDir).filter(file => fs.lstatSync(path.join(testDir, file)).isDirectory());
    tests.forEach(test => {
        require(`${testDir}/${test}`);
    });
});