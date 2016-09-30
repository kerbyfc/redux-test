/**
 * External imports
 */
import 'reflect-metadata';
import * as inversify from 'inversify';
import * as _ from 'lodash';

/**
 * Interfaces
 */
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

    private kernel: Kernel;

    constructor() {
        this.kernel = new inversify.Kernel();
    }

    public registerProviders(providers: any[]) {
        _.each(providers, (provider) => {
            this.bind(provider);
        });
    }

    public bind<I>(provider): void {
        const binding: BindingInWhenOnSyntax<I> = this.kernel.bind<I>(provider).to(provider);

        /**
         * Each provider should has static injector
         */
        if (_.isFunction(provider)) {
            provider.injector = this;
        }

        /**
         * For classes decorated by @singleton
         */
        if (provider.singleton) {
            binding.inSingletonScope();
        }
    }

    public isBound(identifier: any) {
        return this.kernel.isBound(identifier);
    }

    public get<I>(provider): I | typeof provider {
        return this.kernel.get<I | typeof provider>(provider);
    }
}
