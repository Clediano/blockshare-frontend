import api from 'config/axios';

export const getDetailsAddress = (address, onSuccess, onError) => {
    api.get(`/organization/address/${address}`)
        .then(resp => {
            onSuccess && onSuccess(resp);
        }).catch(err => {
            onError && onError(err);
        });
};

export const getTransactionFee = (onSuccess, onError) => {
    api.get(`/transactions/fee`)
        .then(resp => {
            onSuccess && onSuccess(resp);
        }).catch(err => {
            onError && onError(err);
        });
};
