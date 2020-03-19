import api from 'config/axios';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const saveAvatar = async (formData, onSuccess, onError) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  api.post(`/avatar`, formData, config)
    .then(resp => {
      onSuccess(resp);
    }).catch(err => {
    onError(err);
  });
};

export const removeAvatar = async (onSuccess, onError) => {
  const avatarId = getFromSessionStorage(KEY_STORAGE.AVATAR_ID);

  api.delete(`avatar/${avatarId}`)
    .then(() => {
      onSuccess();
    })
    .catch(err => {
      onError && onError(err);
    });
};