import api from 'config/axios';
import { KEY_STORAGE } from 'common/localstorage/const';
import { saveAsSessionStorageWithoutCrypto, saveAsSessionStorage } from '../../../common/localstorage';

export const signIn = (email, password, onSuccess, onError) => {
  api.post(`/authentication`, { email, password })
    .then(resp => {
      saveAsSessionStorage(KEY_STORAGE.TOKEN, resp.data.token);
      saveAsSessionStorage(KEY_STORAGE.EMAIL, resp.data.email);
      saveAsSessionStorage(KEY_STORAGE.NAME, resp.data.name);
      saveAsSessionStorage(KEY_STORAGE.ORGANIZATION_ID, resp.data.organization);
      saveAsSessionStorageWithoutCrypto(KEY_STORAGE.AUTHORIZATIONS, resp.data.authorization);
      saveAsSessionStorage(KEY_STORAGE.ADDRESS, resp.data.address);
      saveAsSessionStorage(KEY_STORAGE.AVATAR_ID, resp.data.oidphoto);
      onSuccess(resp);
    })
    .catch(err => {
      onError(err);
    });
};
