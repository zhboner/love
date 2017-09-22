// const url = 'https://www.zgoing.com/';

const url = window.RT_API.root;
const config = {
    home: url,
    prefix: url + '/wp-json/wp/v2/'
};

console.log(config);
export default config;