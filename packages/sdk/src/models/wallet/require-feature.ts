/**
 * Required features for wallets.
 */
export type RequiredFeatures = {
    /**
     * Required features for the send transaction feature.
     */
    sendTransaction?: RequiredSendTransactionFeature;
    /**
     * Required features for the sign data feature.
     */
    singData?: RequiredSignDataFeature;
};

/**
 * Required features for the send transaction feature.
 */
export type RequiredSendTransactionFeature = {
    /**
     * Minimum number of messages to send.
     */
    minMessages?: number;

    /**
     * Whether extra currency is required.
     */
    extraCurrencyRequired?: boolean;
};

/**
 * Required features for the sign data feature.
 */
export type RequiredSignDataFeature = boolean;
