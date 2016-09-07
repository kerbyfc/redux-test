/**
 * External imports
 */
import 'reflect-metadata';
import * as inversify from 'inversify';
import * as _ from 'lodash';
import Kernel = inversify.interfaces.Kernel;

/**
 * Facade decorators
 */
export function inject(Provider) {
    return inversify.inject(Provider);
}

export function injectable() {
    return inversify.injectable.apply(null, arguments);
}

/**
 * Facade composition for inversify kernel singleton
 */
export class Injector {

    constructor() {
        this.kernel = new inversify.Kernel();
    }

    protected kernel: Kernel;

    registerProviders(providers: any[]) {
        _.each(providers, (provider) => {
            this.kernel.bind<typeof provider>(provider).to(provider);
        });
    }

    bindSingleton<I>(provider): void {
        this.kernel.bind<I>(provider).to(provider).inSingletonScope();
    }

    bind<I>(provider): void {
        this.kernel.bind<I>(provider).to(provider);
    }

    get<I>(provider): I | typeof provider {
        return this.kernel.get<I | typeof provider>(provider);
    }
}

export const injector = new Injector();


