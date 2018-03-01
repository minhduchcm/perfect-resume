import { postData } from 'utils/api/fetch';
import errorHandle from 'utils/api/errorHandle';

const API = {
  LOGIN: 'api/v1/login',
};

export const login = async user => {
  const res = await postData(API.LOGIN, {
    data: user,
  });
  if (res.status === 200) {
    const body = res.json();
    return body;
  } else {
    const { errors } = await res.json();
    throw errorHandle(errors);
  }
};
