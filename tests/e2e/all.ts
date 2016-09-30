import * as assert from 'intern/chai!assert';
import * as registerSuite from 'intern!object';

registerSuite({
    name: 'Todo (functional)',
    'submit form'() {
        return this.remote
            .get('http://localhost:3000')
            .findById('surname')
            .click()
            .pressKeys('Task 1')
            .getProperty('value')
            .then((val: string) => {
                assert.ok(val.indexOf('Task 1') > -1, 'Task 1 should remain in surname field');
            });
    }
});
