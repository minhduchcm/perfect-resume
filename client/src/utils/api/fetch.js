import qs from 'qs';

const API = 'http://localhost:3000/';

let defaultHeader = {
  'Content-Type': 'application/json',
};

export const updateDefaultHeader = header => {
  defaultHeader = {
    ...defaultHeader,
    ...header,
  };
};

function fillParams(url, params) {
  if (!params) return url;
  let uri = url;
  Object.keys(params).forEach(key => {
    uri = uri.replace(`:${key}`, params[key]);
  });
  return uri;
}

export const fetchData = (url, { params, query, header }) => {
  const filledParamsUrl = API + fillParams(url, params) + qs.stringify(query);
  return fetch(filledParamsUrl, {
    header: {
      ...defaultHeader,
      ...header,
    },
    method: 'GET',
  });
};

export const postData = (url, { params, data, header }) => {
  const filledParamsUrl = API + fillParams(url, params);
  return fetch(filledParamsUrl, {
    headers: {
      ...defaultHeader,
      ...header,
    },
    body: JSON.stringify(data),
    method: 'POST',
  });
};
