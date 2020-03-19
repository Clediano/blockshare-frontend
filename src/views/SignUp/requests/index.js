import api from 'config/axios';

// Service methods
export const signUp = (name, email, type, cpf, cnpj, onSuccess, onError) => {
   api.post(`/organization`, { name, email, type, cpf, cnpj })
      .then(resp => {
         onSuccess(resp);
      }).catch(err => {
         onError(err)
      })
};