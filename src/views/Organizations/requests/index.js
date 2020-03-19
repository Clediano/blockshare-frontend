import api from 'config/axios';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function findAllSharedOrganizations(offset, limit, onSuccess, onError) {
  const organizationid = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  api.get(`/organization/${organizationid}/shared/all/${offset}/${limit}`)
    .then(resp => {
      const respMapped = resp.data.map(friend => {
        return {
          address: friend.invited.wallet.address,
          match: friend.match,
          ...friend.invited
        };
      });
      onSuccess && onSuccess(respMapped);
    })
    .catch(err => {
      onError && onError(err);
    });
}


export async function findSharedOrganizationsByName(value, offset, limit, onSuccess, onError) {
  const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  api.get(`/organization/${id}/shared/name/${value}/${offset}/${limit}`)
    .then(resp => {
      const respMapped = resp.data.map(friend => {
        return {
          address: friend.invited.wallet.address,
          match: friend.match,
          ...friend.invited
        };
      });
      onSuccess && onSuccess(respMapped);
    })
    .catch(err => {
      onError && onError(err);
    });
}


export async function findSharedOrganizationsByEmail(value, offset, limit, onSuccess, onError) {
  const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  api.get(`/organization/${id}/shared/email/${value}/${offset}/${limit}`)
    .then(resp => {
      const respMapped = resp.data.map(friend => {
        return {
          address: friend.invited.wallet.address,
          match: friend.match,
          ...friend.invited
        };
      });
      onSuccess && onSuccess(respMapped);
    })
    .catch(err => {
      onError && onError(err);
    });
}