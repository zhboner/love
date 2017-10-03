// For dev
let url;
if (window.RT_API) {
    url = window.RT_API.root;
    console.log(window.RT_API)
} else {
    url = 'http://localhost';
}

const config = {
    home: url,
    prefix: url + '/wp-json/wp/v2/'
};

export default config;