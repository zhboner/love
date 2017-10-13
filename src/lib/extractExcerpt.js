export const extractExcerpt = (text) => {
    let splitContent = text.split(new RegExp(/(<p.*>)?<!--more-->(<\/p>)?/, 'i'));

    let excerpt = splitContent[0],
        content = '';
    if (splitContent.length >= 2 && splitContent[splitContent.length - 1]) {
        content = splitContent[0].concat(splitContent[splitContent.length - 1]);
    } else {
        content = excerpt;
    }

    return {
        excerpt: excerpt,
        content: content
    }
};