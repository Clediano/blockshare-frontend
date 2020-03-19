import api from 'config/axios';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const findOrganizationByName = async (value, offset, limit, onSuccess) => {
  const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  const resp = await api.get(`/organization/${id}/search/name/${value || ' '}/${offset}/${limit}`);

  onSuccess && onSuccess(resp);
};

export const findOrganizationByAddress = async (value, offset, limit, onSuccess) => {
  const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  const resp = await api.get(`/organization/${id}/search/address/${value || 'a'}/${offset}/${limit}`);

  onSuccess && onSuccess(resp);
};

export const sendInvite = (invitedid, onSuccess, onError) => {
  api.post(`/organization/invite`, {
    interestedid: getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID),
    invitedid
  })
    .then(resp => {
      onSuccess && onSuccess(resp);
    })
    .catch(err => {
      onError && onError(err);
    });

};