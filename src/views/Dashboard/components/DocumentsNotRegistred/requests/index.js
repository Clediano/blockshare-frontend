import axios from 'config/axios'
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const countNumberOfDocumentsNotRegistred = (onSuccess, onError, onFinnaly) => {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    axios.get(`/dashboard/count_number_of_documents_not_registred/${organization}`)
    .then(resp => {
        onSuccess && onSuccess(resp)
    }).catch(err => {
        onError && onError(err)
    }).finally(() => {
        onFinnaly && onFinnaly()
    })
}
