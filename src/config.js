// For dev
let url;
if (window.RT_API) {
    url = window.RT_API.root;
}

const config = {
    home: url,
    prefix: url + '/wp-json/wp/v2/'
};

export default config;