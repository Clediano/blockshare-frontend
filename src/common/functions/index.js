import api from 'config/axios';
import { saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { download } from '../download/download';

export const loadAvatar = (archiveid, onSuccess) => {
  api.get(`/archive/${archiveid}`)
    .then(resp => {
      saveAsSessionStorage(KEY_STORAGE.AVATAR, `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`);
      onSuccess && onSuccess(`data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`);
    });
};

export const mountDataImage = (archiveid, onSuccess, onError, onFinally) => {
  api.get(`/archive/${archiveid}`)
    .then(resp => {
      onSuccess && onSuccess(`data:${resp.data.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`);
    })
    .catch(err => {
      onError && onError(err);
    })
    .finally(() => onFinally && onFinally());
};

export const removeElementOfList = (list, simple = true, field, valueOfElement) => {
  return list.filter(element => {
    if (simple) {
      return element !== valueOfElement;
    } else {
      return element[field] !== valueOfElement;
    }
  });
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function copyStringToClipboard(str) {
  // Create new element
  let el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
}

export function getBytesFromFile(file) {
  let reader = new FileReader();
  let stringBytes = null;

  reader.readAsArrayBuffer(file);

  reader.onload = () => {
    var arrayBuffer = reader.result;
    var bytes = new Uint8Array(arrayBuffer);

    stringBytes = bytes.toString();
  };
  return stringBytes + '';
}

export const formHasError = errors => {
  if (Object.getOwnPropertyNames(errors).length > 0) {
    return true;
  }
  return false;
};

export function downloadDocument(archiveid, onSuccess, onError) {
  api.get(`/archive/${archiveid}`)
    .then(({ data: resp }) => {
      const data = `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.file.data)))}`;
      download(data, resp.filename, resp.mimetype);
    })
    .catch(err => {
      onError && onError(err);
    });
}


