import api from "config/axios";

export const save = async (organizationId, data, onSuccess, onError) => {
    await api.post(`user/${organizationId}`, data)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
};
