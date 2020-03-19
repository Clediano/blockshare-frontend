import api from 'config/axios';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function searchNotifications() {
  const organizationid = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

  return await api.get(`/organization/${organizationid}/notifications`);
}

export async function acceptInvite(notificationid) {
  return await api.post(`/organization/${notificationid}/notifications/${notificationid}/accept`);
}

export async function rejectInvitation(notificationid) {
  return await api.post(`/organization/${notificationid}/notifications/${notificationid}/reject`);
}
