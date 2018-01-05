import Fuse from 'fuse.js';

var defaultOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
};

module.exports.fuzzySearch = (list, propsToBeSearched, target) => {
    var fuse = new Fuse(list, Object.assign({}, defaultOptions, {keys: propsToBeSearched}));
    return fuse.search(target);
};