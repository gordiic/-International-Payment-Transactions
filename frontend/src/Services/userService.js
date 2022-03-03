import axios from "axios";
import { readConfigFile } from "../Configuration/ReadConfiguration";

export const register = (user) => {
  let addr = readConfigFile();
  console.log("data=" + user);
  return axios
    .post(addr + "/register", user)
    .then((response) => {
      const item = response.data;
      console.log("bajaga:" + item);
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const login = (user) => {
  let addr = readConfigFile();
  console.log("ispis addr=" + addr);
  return axios
    .post(addr + "/login", user)
    .then((response) => {
      const item = response.data;
      console.log("bajaga:" + item);
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const changeAccount = (user) => {
  let addr = readConfigFile();
  console.log("ispis addr=" + addr);
  return axios
    .post(addr + "/changeAccount", user)
    .then((response) => {
      const item = response.data;
      console.log("bajaga:" + item);
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};
export const getProfile = () => {
  let addr = readConfigFile();
  console.log("ispis addr=" + addr);
  return axios
    .get(addr + "/members")
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const accountVerification = (param) => {
  let addr = readConfigFile();
  console.log("ispis addr=" + addr);
  return axios
    .post(addr + "/accountVerification", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const depositOnAccount = (param) => {
  let addr = readConfigFile();
  return axios
    .post(addr + "/depositOnAccount", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const conversionToValute = (param) => {
  let addr = readConfigFile();
  return axios
    .post(addr + "/conversion", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const refreshAccount = (param) => {
  let addr = readConfigFile();
  return axios
    .post(addr + "/refreshAccount", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const getTransactions = (param) => {
  let addr = readConfigFile();
  return axios
    .post(addr + "/viewTransactionHistory", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const makeTransaction = (param) => {
  let addr = readConfigFile();
  return axios
    .post(addr + "/makeTransaction", param)
    .then((response) => {
      const item = response.data;
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};
