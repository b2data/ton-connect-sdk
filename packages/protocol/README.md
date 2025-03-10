# TON Connect protocol models

ℹ️ If you want to integrate TonConnect to your dApp, you should use [@b2data/tonconnect-sdk](https://www.npmjs.com/package/@b2data/tonconnect-sdk)

[Latest API documentation](https://ton-connect.github.io/sdk/modules/_tonconnect_protocol.html)

## Summary
Package contains protocol requests, responses and event models and encoding, decoding functions.

You can use it to integrate TonConnect to your wallet app (written with TypeScript).

## Get started

### Install package
`npm i @b2data/tonconnect-protocol`

### Use protocol models in your app

```ts
import { AppRequest, RpcMethod, WalletResponse } from '@b2data/tonconnect-protocol';

function myWalletAppRequestsHandler<T extends RpcMethod>(request: AppRequest<T>): Promise<WalletResponse<T>> {
    // handle request, ask the user for a confirmation and return WalletResponse
}

```

### Use protocol cryptography in your app

```ts
import { SessionCrypto, WalletMessage, Base64, hexToByteArray } from '@b2data/tonconnect-protocol';

function encodeIncommingHTTPBridgeRequest(encryptedMessage: string, from: string): WalletMessage {
    const sessionCrypto = new SessionCrypto(yourStoredSessionReypair);

    const decryptedMessage =
        sessionCrypto.decrypt(
            Base64.decode(bridgeIncomingMessage.message).toUint8Array(),
            hexToByteArray(bridgeIncomingMessage.from)
        );
    
    return  JSON.parse(decryptedMessage);
}
```
