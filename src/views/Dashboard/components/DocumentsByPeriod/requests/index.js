import axios from 'config/axios'
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const getDocumentsByPeriod = (dataInicial, dataFinal, onSuccess, onError, onFinnaly) => {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    axios.get(`/dashboard/documents_by_period/${organization}?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
    .then(resp => {
        onSuccess && onSuccess(resp)
    }).catch(err => {
        onError && onError(err)
    }).finally(() => {
        onFinnaly && onFinnaly()
    })
}

