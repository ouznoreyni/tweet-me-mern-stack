import http from './httpService';

const login = async (credential) => {
  const { data } = await http.post('/login', credential);

  return data;
};

export default { login };
