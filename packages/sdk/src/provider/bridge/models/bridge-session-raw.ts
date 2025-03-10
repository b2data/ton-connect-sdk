import { KeyPair } from '@b2data/tonconnect-protocol';
import { BridgeSession } from './bridge-session';

export type BridgeSessionRaw = Omit<BridgeSession, 'sessionCrypto'> & {
    sessionKeyPair: KeyPair;
};
