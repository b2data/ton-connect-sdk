import { Component, Match, Switch } from 'solid-js';
import { Modal } from 'src/app/components';
import { appState } from 'src/app/state/app.state';
import { action, setAction } from 'src/app/state/modals-state';
import { ConfirmTransactionModal } from 'src/app/views/modals/actions-modal/confirm-transaction-modal';
import { TransactionCanceledModal } from 'src/app/views/modals/actions-modal/transaction-canceled-modal';
import { TransactionSentModal } from 'src/app/views/modals/actions-modal/transaction-sent-modal';
import { ConfirmDataModal } from 'src/app/views/modals/actions-modal/confirm-data-modal';
import { SignDataCanceledModal } from 'src/app/views/modals/actions-modal/sign-data-canceled-modal';
import { SignDataSentModal } from 'src/app/views/modals/actions-modal/sign-data-sent-modal';

export const ActionsModal: Component = () => {
    return (
        <Modal
            opened={action() !== null && action()?.openModal === true}
            enableAndroidBackHandler={appState.enableAndroidBackHandler}
            onClose={() => setAction(null)}
            data-tc-actions-modal-container="true"
        >
            <Switch>
                <Match when={action()!.name === 'transaction-sent'}>
                    <TransactionSentModal onClose={() => setAction(null)} />
                </Match>
                <Match when={action()!.name === 'transaction-canceled'}>
                    <TransactionCanceledModal onClose={() => setAction(null)} />
                </Match>
                <Match when={action()!.name === 'confirm-transaction'}>
                    <ConfirmTransactionModal onClose={() => setAction(null)} />
                </Match>
                <Match when={action()!.name === 'data-sent'}>
                    <SignDataSentModal onClose={() => setAction(null)} />
                </Match>
                <Match when={action()!.name === 'data-canceled'}>
                    <SignDataCanceledModal onClose={() => setAction(null)} />
                </Match>
                <Match when={action()!.name === 'confirm-data'}>
                    <ConfirmDataModal onClose={() => setAction(null)} />
                </Match>
            </Switch>
        </Modal>
    );
};
