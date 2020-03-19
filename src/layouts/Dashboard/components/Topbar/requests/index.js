import api from 'config/axios';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function getNumberOfNotifications() {
  const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
  const { data } = await api.get(`/organization/${id}/notifications/total`);

  return data.count;
}