import { TonConnectError } from '@b2data/tonconnect-sdk';

export class TonConnectUIError extends TonConnectError {
    constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        Object.setPrototypeOf(this, TonConnectUIError.prototype);
    }
}
