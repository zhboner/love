// For dev
let url;
if (window.RT_API) {
    url = window.RT_API.root;
}

url = 'https://www.zgoing.com';
const config = {
    home: url,
    prefix: url + '/wp-json/wp/v2/',
    zhbRoute: url + '/wp-json/zhboner/v1/'
};

export default config;