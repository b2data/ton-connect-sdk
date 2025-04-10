import { WalletInfoInjectable, WalletInfoRemote } from '@b2data/tonconnect-sdk';

export type UIWallet = Omit<WalletInfoInjectable, 'injected' | 'embedded'> | WalletInfoRemote;
