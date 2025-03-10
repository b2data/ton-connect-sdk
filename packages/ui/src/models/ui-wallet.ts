import { WalletInfoBase, WalletInfoInjectable, WalletInfoRemote } from '@b2data/tonconnect-sdk';

export type UIWallet = WalletInfoBase &
    (Omit<WalletInfoInjectable, 'injected' | 'embedded'> | WalletInfoRemote);
