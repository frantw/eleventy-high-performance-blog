/**
 * generate read-more section of a post
 */
const tag = '<!--more-->';
const excerpt = (content) => content.split(tag)[0];
const checkHasReadMore = (content) => content.includes(tag);
const regex = /<p>(.*?)<\/p>/i;

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('excerpt', (content) => {
        if (checkHasReadMore(content)) {
            return excerpt(content);
        }
        else {
            return regex.test(content) ? regex.exec(content)[0]: '';
        }
    });
};