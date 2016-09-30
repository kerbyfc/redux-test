// /**
//  * Local imports
//  */
// import {injector} from '../providers';
// import {OnlyRussianCharsValidator} from './OnlyRussianCharsValidator';
//
// describe('TextLengthValidator', () => {
//
//     let validator: OnlyRussianCharsValidator;
//
//     beforeEach(() => {
//         validator = injector.get(OnlyRussianCharsValidator);
//     });
//
//     it('should correctly check maxLength rule', () => {
//         this.validator.check('test', {
//             maxLength: 2
//         }).should.eql({
//             minLength: true,
//             maxLength: false
//         });
//     });
// });
