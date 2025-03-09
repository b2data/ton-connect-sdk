export type Feature =
    | SendTransactionFeatureDeprecated
    | SendTransactionFeature
    | SignDataFeatureDeprecated
    | SignDataFeature;

export type SendTransactionFeatureDeprecated = 'SendTransaction';
export type SendTransactionFeature = {
    name: 'SendTransaction';
    maxMessages: number;
    extraCurrencySupported?: boolean;
};

export type SignDataFeatureDeprecated = 'SignData';
export type SignDataFeature = { name: 'SignData' };
