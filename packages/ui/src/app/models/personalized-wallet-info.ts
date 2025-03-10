import { WalletInfo } from '@b2data/tonconnect-sdk';

export type PersonalizedWalletInfo = WalletInfo & {
    isPreferred?: boolean;
};
