import { criptografar, descriptografar } from 'common/cryptography';

export const saveAsSessionStorage = (key, value) => {
    const cryptoValue = criptografar(value);

    sessionStorage.setItem(key, cryptoValue);
};

export const saveAsSessionStorageWithoutCrypto = (key, value) => {
    sessionStorage.setItem(key, value);
};

export const getFromSessionStorage = key => {
    return descriptografar(sessionStorage.getItem(key));
};

