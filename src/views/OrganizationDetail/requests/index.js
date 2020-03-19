import api from 'config/axios';

export async function findOrganization(organizationId, onSuccess, onError) {
  api.get(`/organization/${organizationId}`)
    .then(resp => {
      onSuccess && onSuccess(resp.data);
    })
    .catch(err => {
      onError && onError(err);
    });
}

export async function findAllDocumentsByOrganization(organizationId, offset, limit, onSuccess, onError) {
  api.get(`/transactions/organization/${organizationId}/${offset}/${limit}`)
    .then(resp => {
      onSuccess && onSuccess(resp.data);
    })
    .catch(err => {
      onError && onError(err);
    });
}
