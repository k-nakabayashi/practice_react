/*
    resasのAPIキーを、ローカルストレージで管理する
    https://opendata.resas-portal.go.jp/
*/

const resas_api_key_name = 'Cw8t9iPV_token';

const storage = {
  getStorageValue: (key: string) => {
    return JSON.parse(window.localStorage.getItem(key) as string);
  },
  setApiKey: (key: string, token: string) => {
    window.localStorage.setItem(key, JSON.stringify(token));
  },
  clearApiKey: (key: string) => {
    window.localStorage.removeItem(key);
  },
};

export default storage;
