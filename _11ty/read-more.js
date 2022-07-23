/**
 * generate read-more section of a post
 */
const tag = '<!--more-->';
const excerpt = (content) => content.split(tag)[0];
const checkHasReadMore = (content) => content.includes(tag);
const regex = /\<h2 .*\>.*\<\/h2\>(.*)/;

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('excerpt', (content) => {
        if (checkHasReadMore(content)) {
            return excerpt(content);
        }
        else {
            return regex.test(content) ? content.split(regex).filter(str => str !== '')[0]: '';
        }
    });
};