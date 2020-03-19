import api from 'config/axios';

export const getAllUsersOfOrganization = async (organizationId, onSuccess, onError) => {
  await api.get(`users/${organizationId}`)
    .then(resp => {
      onSuccess(resp);
    })
    .catch(err => {
      onError(err);
    });
};
