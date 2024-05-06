import Config from 'react-native-config';

console.log(Config.BASE_URL); // Outputs: 'https://api.example.dev'
console.log(Config.API);

const appConfig = {
  BASE_URL: Config.BASE_URL,
  API: Config.API_URL,
  IMAGE_KIT_PUBLIC_KEY: 'public_FDC/RCuLLeKyD5vinpopNKvqd0U=',
  IMAGE_KIT_URLENDPOINT: 'https://ik.imagekit.io/soobati/',
};

export default appConfig;
