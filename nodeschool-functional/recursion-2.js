'use strict'

function getDependencies(tree) {
    var result = [];

    function walk(tree) {
        const deps = tree.dependencies;
        if (deps) {
            for (let key in deps) {
                var dependency = key + '@' + deps[key].version;
                if (result.indexOf(dependency) === -1) {
                    result.push(dependency);
                }
                if (deps[key].dependencies) {
                    walk(deps[key]);
                }
            }
        }
    }
    if (tree) {
        walk(tree);
    }
    return result.sort();
}

module.exports = getDependencies