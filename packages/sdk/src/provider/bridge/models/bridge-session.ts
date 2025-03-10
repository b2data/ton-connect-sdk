import { SessionCrypto } from '@b2data/tonconnect-protocol';

export interface BridgeSession {
    sessionCrypto: SessionCrypto;
    walletPublicKey: string;
    bridgeUrl: string;
}

export type BridgePartialSession = Omit<BridgeSession, 'walletPublicKey'>;
