import config from "./hostConfiguration.json";

export const readConfigFile = () => {
  console.log(JSON.parse(JSON.stringify(config)));
  var ret = JSON.parse(JSON.stringify(config));
  console.log(ret);
  //   fetch("./Configuration/hostConfiguration.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data:", data);
  //       return data.HOST;
  //     });
  return ret.HOST;
};

//export default readConfigFile;
