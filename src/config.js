// For dev
let url;
if (window.RT_API) {
    url = window.RT_API.root;
    // console.log(window.RT_API)
} else {
    // window.RT_API = {
    //     root: 'http://localhost:8081',
    //     siteName: 'Theme Development',
    //     siteDescription: 'Another wordpress site',
    //     nonce: 'f1e5f41f3e',
    //     current_user: {
    //         ID: 1,
    //     }
    // };
    // url = window.RT_API.root;
    url = 'https://www.zgoing.com'
}

const config = {
    home: url,
    prefix: url + '/wp-json/wp/v2/'
};

export default config;