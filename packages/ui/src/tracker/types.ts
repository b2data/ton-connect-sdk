import {
    ConnectionEvent,
    ConnectionRestoringEvent,
    DisconnectionEvent,
    TransactionSigningEvent,
    DataSigningEvent,
    VersionEvent
} from '@b2data/tonconnect-sdk';

/**
 * User action events.
 */
export type UserActionEvent =
    | VersionEvent
    | ConnectionEvent
    | ConnectionRestoringEvent
    | DisconnectionEvent
    | TransactionSigningEvent
    | DataSigningEvent;

export {
    createRequestVersionEvent,
    createResponseVersionEvent,
    createConnectionStartedEvent,
    createConnectionErrorEvent,
    createConnectionCompletedEvent,
    createConnectionRestoringStartedEvent,
    createConnectionRestoringErrorEvent,
    createConnectionRestoringCompletedEvent,
    createDisconnectionEvent,
    createTransactionSentForSignatureEvent,
    createTransactionSigningFailedEvent,
    createTransactionSignedEvent,
    createDataSentForSignatureEvent,
    createDataSigningFailedEvent,
    createDataSignedEvent
} from '@b2data/tonconnect-sdk';
