import { WalletInfo } from '@b2data/tonconnect-sdk';

export type UIWalletInfo = WalletInfo & {
    isPreferred?: boolean;
    isSupportRequiredFeatures: boolean;
};
