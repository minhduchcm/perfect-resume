import { postData } from 'utils/api/fetch';
import errorHandle from 'utils/api/errorHandle';

const API = {
  REGISTER: 'api/v1/register',
};

export const signupUser = async user => {
  const res = await postData(API.REGISTER, {
    data: user,
  });
  if (res.status === 200) {
    return;
  } else {
    const { errors } = await res.json();
    throw errorHandle(errors);
  }
};
