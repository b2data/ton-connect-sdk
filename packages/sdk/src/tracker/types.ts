import { CONNECT_EVENT_ERROR_CODES, ConnectItem, SEND_TRANSACTION_ERROR_CODES, SIGN_DATA_ERROR_CODES } from '@tonconnect/protocol';
import { SendTransactionRequest, SendTransactionResponse, SignDataRequest, SignDataResponse, Wallet } from 'src/models';

/**
 * Request TON Connect UI version.
 */
export type RequestVersionEvent = {
    /**
     * Event type.
     */
    type: 'request-version';
};

/**
 * Create a request version event.
 */
export function createRequestVersionEvent(): RequestVersionEvent {
    return {
        type: 'request-version'
    };
}

/**
 * Response TON Connect UI version.
 */
export type ResponseVersionEvent = {
    /**
     * Event type.
     */
    type: 'response-version';
    /**
     * TON Connect UI version.
     */
    version: string;
};

/**
 * Create a response version event.
 * @param version
 */
export function createResponseVersionEvent(version: string): ResponseVersionEvent {
    return {
        type: 'response-version',
        version: version
    };
}

/**
 * Version events.
 */
export type VersionEvent = RequestVersionEvent | ResponseVersionEvent;

/**
 * Version of the TON Connect SDK and TON Connect UI.
 */
export type Version = {
    /**
     * TON Connect SDK version.
     */
    ton_connect_sdk_lib: string | null;
    /**
     * TON Connect UI version.
     */
    ton_connect_ui_lib: string | null;
};

/**
 * Create a version info.
 * @param version
 */
export function createVersionInfo(version: Version): Version {
    return {
        ton_connect_sdk_lib: version.ton_connect_sdk_lib,
        ton_connect_ui_lib: version.ton_connect_ui_lib
    };
}

/**
 * Requested authentication type: 'ton_addr' or 'ton_proof'.
 */
export type AuthType = ConnectItem['name'];

/**
 * Information about a connected wallet.
 */
export type ConnectionInfo = {
    /**
     * Connected wallet address.
     */
    wallet_address: string | null;
    /**
     * Wallet type: 'tonkeeper', 'tonhub', etc.
     */
    wallet_type: string | null;
    /**
     * Wallet version.
     */
    wallet_version: string | null;
    /**
     * Requested authentication types.
     */
    auth_type: AuthType;
    /**
     * Custom data for the connection.
     */
    custom_data: {
        /**
         * Connected chain ID.
         */
        chain_id: string | null;
        /**
         * Wallet provider.
         */
        provider: 'http' | 'injected' | null;
    } & Version;
};

function createConnectionInfo(version: Version, wallet: Wallet | null): ConnectionInfo {
    const isTonProof = wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof;
    const authType: AuthType = isTonProof ? 'ton_proof' : 'ton_addr';

    return {
        wallet_address: wallet?.account?.address ?? null,
        wallet_type: wallet?.device.appName ?? null,
        wallet_version: wallet?.device.appVersion ?? null,
        auth_type: authType,
        custom_data: {
            chain_id: wallet?.account?.chain ?? null,
            provider: wallet?.provider ?? null,
            ...createVersionInfo(version)
        }
    };
}

/**
 * Initial connection event when a user initiates a connection.
 */
export type ConnectionStartedEvent = {
    /**
     * Event type.
     */
    type: 'connection-started';
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Create a connection init event.
 */
export function createConnectionStartedEvent(version: Version): ConnectionStartedEvent {
    return {
        type: 'connection-started',
        custom_data: createVersionInfo(version)
    };
}

/**
 * Successful connection event when a user successfully connected a wallet.
 */
export type ConnectionCompletedEvent = {
    /**
     * Event type.
     */
    type: 'connection-completed';
    /**
     * Connection success flag.
     */
    is_success: true;
} & ConnectionInfo;

/**
 * Create a connection completed event.
 * @param version
 * @param wallet
 */
export function createConnectionCompletedEvent(
    version: Version,
    wallet: Wallet | null
): ConnectionCompletedEvent {
    return {
        type: 'connection-completed',
        is_success: true,
        ...createConnectionInfo(version, wallet)
    };
}

/**
 * Connection error event when a user cancels a connection or there is an error during the connection process.
 */
export type ConnectionErrorEvent = {
    /**
     * Event type.
     */
    type: 'connection-error';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Error code.
     */
    error_code: CONNECT_EVENT_ERROR_CODES | null;
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Create a connection error event.
 * @param version
 * @param error_message
 * @param errorCode
 */
export function createConnectionErrorEvent(
    version: Version,
    error_message: string,
    errorCode: CONNECT_EVENT_ERROR_CODES | void
): ConnectionErrorEvent {
    return {
        type: 'connection-error',
        is_success: false,
        error_message: error_message,
        error_code: errorCode ?? null,
        custom_data: createVersionInfo(version)
    };
}

/**
 * Connection events.
 */
export type ConnectionEvent =
    | ConnectionStartedEvent
    | ConnectionCompletedEvent
    | ConnectionErrorEvent;

/**
 * Connection restoring started event when initiates a connection restoring process.
 */
export type ConnectionRestoringStartedEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-started';
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Create a connection restoring started event.
 */
export function createConnectionRestoringStartedEvent(
    version: Version
): ConnectionRestoringStartedEvent {
    return {
        type: 'connection-restoring-started',
        custom_data: createVersionInfo(version)
    };
}

/**
 * Connection restoring completed event when successfully restored a connection.
 */
export type ConnectionRestoringCompletedEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-completed';
    /**
     * Connection success flag.
     */
    is_success: true;
} & ConnectionInfo;

/**
 * Create a connection restoring completed event.
 * @param version
 * @param wallet
 */
export function createConnectionRestoringCompletedEvent(
    version: Version,
    wallet: Wallet | null
): ConnectionRestoringCompletedEvent {
    return {
        type: 'connection-restoring-completed',
        is_success: true,
        ...createConnectionInfo(version, wallet)
    };
}

/**
 * Connection restoring error event when there is an error during the connection restoring process.
 */
export type ConnectionRestoringErrorEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-error';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Create a connection restoring error event.
 * @param version
 * @param errorMessage
 */
export function createConnectionRestoringErrorEvent(
    version: Version,
    errorMessage: string
): ConnectionRestoringErrorEvent {
    return {
        type: 'connection-restoring-error',
        is_success: false,
        error_message: errorMessage,
        custom_data: createVersionInfo(version)
    };
}

/**
 * Connection restoring events.
 */
export type ConnectionRestoringEvent =
    | ConnectionRestoringStartedEvent
    | ConnectionRestoringCompletedEvent
    | ConnectionRestoringErrorEvent;

/**
 * Transaction message.
 */
export type TransactionMessage = {
    /**
     * Recipient address.
     */
    address: string | null;
    /**
     * Transfer amount.
     */
    amount: string | null;
};

/**
 * Transaction information.
 */
export type TransactionInfo = {
    /**
     * Transaction validity time in unix timestamp.
     */
    valid_until: string | null;
    /**
     * Sender address.
     */
    from: string | null;
    /**
     * Transaction messages.
     */
    messages: TransactionMessage[];
};

function createTransactionInfo(
    wallet: Wallet | null,
    transaction: SendTransactionRequest
): TransactionInfo {
    return {
        valid_until: String(transaction.validUntil) ?? null,
        from: transaction.from ?? wallet?.account?.address ?? null,
        messages: transaction.messages.map(message => ({
            address: message.address ?? null,
            amount: message.amount ?? null
        }))
    };
}

/**
 * Initial transaction event when a user initiates a transaction.
 */
export type TransactionSentForSignatureEvent = {
    /**
     * Event type.
     */
    type: 'transaction-sent-for-signature';
} & ConnectionInfo &
    TransactionInfo;

/**
 * Create a transaction init event.
 * @param version
 * @param wallet
 * @param transaction
 */
export function createTransactionSentForSignatureEvent(
    version: Version,
    wallet: Wallet | null,
    transaction: SendTransactionRequest
): TransactionSentForSignatureEvent {
    return {
        type: 'transaction-sent-for-signature',
        ...createConnectionInfo(version, wallet),
        ...createTransactionInfo(wallet, transaction)
    };
}

/**
 * Transaction signed event when a user successfully signed a transaction.
 */
export type TransactionSignedEvent = {
    /**
     * Event type.
     */
    type: 'transaction-signed';
    /**
     * Connection success flag.
     */
    is_success: true;
    /**
     * Signed transaction.
     */
    signed_transaction: string;
} & ConnectionInfo &
    TransactionInfo;

/**
 * Create a transaction signed event.
 * @param version
 * @param wallet
 * @param transaction
 * @param signedTransaction
 */
export function createTransactionSignedEvent(
    version: Version,
    wallet: Wallet | null,
    transaction: SendTransactionRequest,
    signedTransaction: SendTransactionResponse
): TransactionSignedEvent {
    return {
        type: 'transaction-signed',
        is_success: true,
        signed_transaction: signedTransaction.boc,
        ...createConnectionInfo(version, wallet),
        ...createTransactionInfo(wallet, transaction)
    };
}

/**
 * Transaction error event when a user cancels a transaction or there is an error during the transaction process.
 */
export type TransactionSigningFailedEvent = {
    /**
     * Event type.
     */
    type: 'transaction-signing-failed';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Error code.
     */
    error_code: SEND_TRANSACTION_ERROR_CODES | null;
} & ConnectionInfo &
    TransactionInfo;

/**
 * Create a transaction error event.
 * @param version
 * @param wallet
 * @param transaction
 * @param errorMessage
 * @param errorCode
 */
export function createTransactionSigningFailedEvent(
    version: Version,
    wallet: Wallet | null,
    transaction: SendTransactionRequest,
    errorMessage: string,
    errorCode: SEND_TRANSACTION_ERROR_CODES | void
): TransactionSigningFailedEvent {
    return {
        type: 'transaction-signing-failed',
        is_success: false,
        error_message: errorMessage,
        error_code: errorCode ?? null,
        ...createConnectionInfo(version, wallet),
        ...createTransactionInfo(wallet, transaction)
    };
}

/**
 * Transaction events.
 */
export type TransactionSigningEvent =
    | TransactionSentForSignatureEvent
    | TransactionSignedEvent
    | TransactionSigningFailedEvent;

/**
 * Sign data information.
 */
export type SignDataInfo = {
    /**
     * Schema CRC.
     */
    schema_crc: number;
    /**
     * Cell to sign.
     */
    cell: string;
    /**
     * Sender public key.
     */
    publicKey: string | null;
}

function createSignDataInfo(
    wallet: Wallet | null,
    signData: SignDataRequest
): SignDataInfo {
    return {
        schema_crc: signData.schema_crc,
        cell: signData.cell,
        publicKey: wallet?.account?.publicKey ?? null
    };
}

export type DataSentForSignatureEvent = {
    type: 'data-sent-for-signature';
} & ConnectionInfo & SignDataInfo;

export function createDataSentForSignatureEvent(
    version: Version,
    wallet: Wallet | null,
    data: SignDataRequest
): DataSentForSignatureEvent {
    return {
        type: 'data-sent-for-signature',
        ...createConnectionInfo(version, wallet),
        ...createSignDataInfo(wallet, data)
    };
}

export type DataSignedEvent = {
    /**
    * Event type.
    */
    type: 'data-signed';
    /**
     * Connection success flag.
     */
    is_success: true;
    /**
     * Signed transaction.
     */
    signature: string;
    /**
     * Signed timestamp
     */
    timestamp: string;
} & ConnectionInfo &
    SignDataInfo;

/**
 * Create a transaction signed event.
 * @param version
 * @param wallet
 * @param transaction
 * @param signedData
 */
export function createDataSignedEvent(
    version: Version,
    wallet: Wallet | null,
    signDataRequest: SignDataRequest,
    signedData: SignDataResponse
): DataSignedEvent {
    return {
        type: 'data-signed',
        is_success: true,
        signature: signedData.signature,
        timestamp: signedData.timestamp,
        ...createConnectionInfo(version, wallet),
        ...createSignDataInfo(wallet, signDataRequest)
    };
}

/**
 * data signed error event when a user cancels a data or there is an error during the data process.
 */
export type DataSigningFailedEvent = {
    /**
     * Event type.
     */
    type: 'data-signing-failed';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Error code.
     */
    error_code: SIGN_DATA_ERROR_CODES | null;
} & ConnectionInfo &
    SignDataInfo;

/**
 * Create a data error event.
 * @param version
 * @param wallet
 * @param signDataRequest
 * @param errorMessage
 * @param errorCode
 */
export function createDataSigningFailedEvent(
    version: Version,
    wallet: Wallet | null,
    signDataRequest: SignDataRequest,
    errorMessage: string,
    errorCode: SIGN_DATA_ERROR_CODES | void
): DataSigningFailedEvent {
    return {
        type: 'data-signing-failed',
        is_success: false,
        error_message: errorMessage,
        error_code: errorCode ?? null,
        ...createConnectionInfo(version, wallet),
        ...createSignDataInfo(wallet, signDataRequest)
    };
}

export type DataSigningEvent =
    | DataSentForSignatureEvent
    | DataSignedEvent
    | DataSigningFailedEvent;


/**
 * Disconnect event when a user initiates a disconnection.
 */
export type DisconnectionEvent = {
    /**
     * Event type.
     */
    type: 'disconnection';
    /**
     * Disconnect scope: 'dapp' or 'wallet'.
     */
    scope: 'dapp' | 'wallet';
} & ConnectionInfo;

/**
 * Create a disconnect event.
 * @param version
 * @param wallet
 * @param scope
 * @returns
 */
export function createDisconnectionEvent(
    version: Version,
    wallet: Wallet | null,
    scope: 'dapp' | 'wallet'
): DisconnectionEvent {
    return {
        type: 'disconnection',
        scope: scope,
        ...createConnectionInfo(version, wallet)
    };
}

/**
 * User action events.
 */
export type SdkActionEvent =
    | VersionEvent
    | ConnectionEvent
    | ConnectionRestoringEvent
    | DisconnectionEvent
    | TransactionSigningEvent
    | DataSigningEvent;

/**
 * Parameters without version field.
 */
export type WithoutVersion<T> = T extends [Version, ...infer Rest] ? [...Rest] : never;
