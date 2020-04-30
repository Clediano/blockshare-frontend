import api from "config/axios";
import { getFromSessionStorage } from "common/localstorage";
import { KEY_STORAGE } from "common/localstorage/const";

export const loadFriends = (onSuccess, onError) => {
    const organizationid = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    api.get(`/organization/${organizationid}/shared/all/emails`)
    .then(resp => {
      onSuccess && onSuccess(resp.data);
    })
    .catch(err => {
      onError && onError(err);
    });
}
