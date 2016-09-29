/**
 * External imports
 */
import 'reflect-metadata';
import * as inversify from 'inversify';
import * as _ from 'lodash';
import Kernel = inversify.interfaces.Kernel;
import BindingInWhenOnSyntax = inversify.interfaces.BindingInWhenOnSyntax;

/**
 * Facade decorators
 */
export function inject(Provider) {
    return inversify.inject(Provider);
}

export function injectable() {
    return inversify.injectable.apply(null, arguments);
}

export function singleton(target) {
    target.singleton = true;
    return target;
}

/**
 * Facade composition for inversify kernel singleton
 */
export class Injector implements IInjector {

    constructor() {
        this.kernel = new inversify.Kernel();
    }

    protected kernel: Kernel;

    registerProviders(providers: any[]) {
        _.each(providers, (provider) => {
            this.bind(provider);
        });
    }

    bind<I>(provider): void {
        let bingings: BindingInWhenOnSyntax<I>[] = [];

        /**
         * If provider has static symbol property
         * it also should be registered by this symbol
         * @see Reducer.doReduce
         */
        if (provider.symbol) {
            bingings.push(this.kernel.bind<typeof provider>(provider.symbol).to(provider));
        }

        /**
         * Each provider should has static injector
         */
        if (_.isFunction(provider)) {
            provider.injector = this;
        }

        bingings.push(this.kernel.bind<I>(provider).to(provider));

        /**
         * For classes decorated by @singleton
         */
        if (provider.singleton) {
            _.last<BindingInWhenOnSyntax<I>>(bingings).inSingletonScope();
        }
    }

    isBound(symbol: Symbol) {
        return this.kernel.isBound(symbol);
    }

    get<I>(provider): I | typeof provider {
        return this.kernel.get<I | typeof provider>(provider);
    }
}

export const injector = new Injector();
export default injector;
