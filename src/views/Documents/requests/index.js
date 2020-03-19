import axios from 'config/axios'
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const registerDocument = (documento, onSuccess, onError, onFinnaly) => {

    const formData = new FormData();
    formData.append('file', documento);
    formData.set('organization', getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID));
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    axios.post(`/transaction`, formData, config).then(resp => {
        onSuccess && onSuccess(resp)
    }).catch(err => {
        onError && onError(err)
    }).finally(() => {
        onFinnaly && onFinnaly()
    })
};

export const loadAllTransactions = (offset = 0, limit = 10, onSuccess, onError) => {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    axios.get(`/transactions/organization/${organization}/${offset}/${limit}`)
        .then(resp => {
            onSuccess && onSuccess(resp.data)
        })
        .catch(err => {
            onError && onError(err)
        })
};

export const findTransactionsByTxid = (txid, onSuccess, onError) => {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    axios.get(`/transactions/organization/${organization}/search/txid/${txid}`)
        .then(resp => {
            onSuccess && onSuccess(resp.data)
        })
        .catch(err => {
            onError && onError(err)
        })
};