/**
 * generate read-more section of a post
 */
const { JSDOM } = require("jsdom");

const tag = '<!--more-->';
const excerpt = (content) => content.split(tag)[0];
const checkHasReadMore = (content) => content.includes(tag);

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('excerpt', (content) => {
        if (checkHasReadMore(content)) {
            return excerpt(content);
        }
        else {
            const dom = new JSDOM(content);
            return dom.window.document.querySelector('p').outerHTML;
        }
    });
};