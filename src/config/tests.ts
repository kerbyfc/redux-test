/**
 * Importing of reflect-metadata should
 * bee done once, so it can't be placed in
 * Injector.ts file 
 */
import 'reflect-metadata';

var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);
