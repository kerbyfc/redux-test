///<reference path="../typings/modules/lodash/index.d.ts" />

import * as _ from 'lodash';

interface IOptions {
    wrappers: {
        type: string;
        int: string;
    },
    interfaces: string[];
}

export class Json2Ts {

    convert(content: string, rootName: string, interfaceWrapper: string = "", typeWrapper: string = ""): string {
        let jsonContent = JSON.parse(content);

        let options: IOptions = {
            wrappers: {
                type: typeWrapper,
                int: interfaceWrapper
            },
            interfaces: []
        };

        if (_.isArray(jsonContent)) {
            return this.convertObjectToTsInterfaces(jsonContent[0], rootName, options);
        }
        return this.convertObjectToTsInterfaces(jsonContent, rootName, options) + "\n";
    }

    private makeUniqueInterface(key: string, path: string[], interfaces: string[]) {
        let int = this.toUpperFirstLetter(key);

        if (_.includes(interfaces, int)) {
            let tail = -1;
            while ((int = this.makeKey(path, tail, key)) && _.includes(interfaces, int)) {
                tail = tail - 1;
            }
        }
        interfaces.push(int);

        return int;
    }

    private convertObjectToTsInterfaces(jsonContent: any, int, options: IOptions, path: string[] = []): string {
        let optionalKeys: string[] = [];
        let objectResult: string[] = [];

        for (let key in jsonContent) {
            let value = jsonContent[key];

            if (_.isObject(value) && !_.isArray(value)) {
                let childInterface = this.makeUniqueInterface(key, path, options.interfaces);
                objectResult.push(this.convertObjectToTsInterfaces(value, childInterface, options, path.concat([childInterface])));
                jsonContent[key] = this.removeMajority(childInterface, options) + ";";


            } else if (_.isArray(value)) {
                let arrayTypes: any = this.detectMultiArrayTypes(value);

                if (this.isMultiArray(arrayTypes)) {
                    let multiArrayBrackets = this.getMultiArrayBrackets(value);
                    if (this.isAllEqual(arrayTypes)) {
                        jsonContent[key] = this.wrapType(arrayTypes[0].replace("[]", multiArrayBrackets), options) + ";";
                    } else {
                        jsonContent[key] = this.wrapType("any" + multiArrayBrackets, options) + ";";
                    }

                } else if (value.length > 0 && _.isObject(value[0])) {
                    let childInterface = this.makeUniqueInterface(key, path, options.interfaces);
                    objectResult.push(this.convertObjectToTsInterfaces(value[0], childInterface, options, path.concat([childInterface])));
                    jsonContent[key] = this.removeMajority(childInterface + "Item", options) + "[];";

                } else {
                    jsonContent[key] = this.wrapType(arrayTypes[0], options);
                }

            }
            else if (_.isDate(value)) {
                jsonContent[key] = this.wrapType("Date", options) + ";";
            } else if (_.isString(value)) {
                jsonContent[key] = this.wrapType("string", options) + ";";
            } else if (_.isBoolean(value)) {
                jsonContent[key] = this.wrapType("boolean", options) + ";";
            } else if (_.isNumber(value)) {
                jsonContent[key] = this.wrapType("number", options) + ";";
            } else {
                jsonContent[key] = this.wrapType("any", options) + ";";
                optionalKeys.push(key);
            }
        }

        let result = this.formatCharsToTypeScript(jsonContent, int, optionalKeys, options);
        objectResult.push(result);

        return objectResult.join("\n\n");
    }

    private wrapType(type: string, options: IOptions) {
        if (options.wrappers.type) {
            return options.wrappers.type.replace(/\$/g, type);
        }
        return type;
    }

    private detectMultiArrayTypes(value: any, valueType: string[] = []): string[] {
        if (_.isArray(value)) {
            if (value.length === 0) {
                valueType.push("any[]");
            } else if (_.isArray(value[0])) {
                for (let index = 0, length = value.length; index < length; index++) {
                    let element = value[index];

                    let valueTypeResult = this.detectMultiArrayTypes(element, valueType);
                    valueType.concat(valueTypeResult);
                }
            } else if (_.every(value, _.isString)) {
                valueType.push("string[]");
            } else if (_.every(value, _.isNumber)) {
                valueType.push("number[]");
            } else if (_.every(value, _.isBoolean)) {
                valueType.push("boolean[]");
            } else {
                valueType.push("any[]");
            }
        }

        return valueType;
    }

    private isMultiArray(arrayTypes: string[]) {
        return arrayTypes.length > 1;
    }

    private isAllEqual(array: string[]) {
        return _.every(array.slice(1), _.partial(_.isEqual, array[0]));
    }

    private getMultiArrayBrackets(content: string): string {
        let jsonString = JSON.stringify(content);
        let brackets = "";

        for (let index = 0, length = jsonString.length; index < length; index++) {
            let element = jsonString[index];

            if (element === "[") {
                brackets = brackets + "[]";
            } else {
                index = length;
            }
        }

        return brackets;
    }

    private formatCharsToTypeScript(jsonContent: any, objectName: string, optionalKeys: string[], options: IOptions): string {
        let result = JSON.stringify(jsonContent, null, "\t")
            .replace(new RegExp("\"", "g"), "")
            .replace(new RegExp(",", "g"), "");

        let allKeys = _.keysIn(jsonContent);
        for (let index = 0, length = allKeys.length; index < length; index++) {
            let key = allKeys[index];
            if (_.includes(optionalKeys, key)) {
                result = result.replace(new RegExp(key + ":", "g"), this.toLowerFirstLetter(key) + "?:");
            } else {
                result = result.replace(new RegExp(key + ":", "g"), this.toLowerFirstLetter(key) + ":");
            }
        }

        objectName = this.removeMajority(objectName, options);

        return "interface " + objectName + " " + result;
    }

    private removeMajority(objectName: string, options: IOptions): string {
        let name = objectName;
        if (objectName.slice(-3).toUpperCase() === "IES") {
            name = objectName.substring(0, objectName.length - 3) + "y";
        } else if (objectName.slice(-1).toUpperCase() === "S") {
            name = objectName.substring(0, objectName.length - 1);
        }

        if (options.wrappers.int) {
            return options.wrappers.int.replace(/\$/g, name);
        }

        return name;
    }

    private toUpperFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    private toLowerFirstLetter(text: string) {
        return text.charAt(0).toLowerCase() + text.slice(1);
    };

    private makeKey(path, tail, key) {
        return path.slice(tail).concat([this.toUpperFirstLetter(key)]).join('');
    }
}

