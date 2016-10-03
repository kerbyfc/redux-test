/**
 * Importing of reflect-metadata should
 * bee done once, so it can't be placed in
 * Injector.ts file 
 */
import 'reflect-metadata';

import * as chai from "chai";
import * as sinonChai from "sinon-chai";

chai.should();
chai.use(sinonChai);
