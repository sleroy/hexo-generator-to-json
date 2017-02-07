"use strict";
var schema_1 = require("./lib/schema");
var helper_1 = require("./lib/helper");
var generator_1 = require("./lib/generator");
var defaultConfig = {
    configs: {
        global: [
            'title', 'subtitle', 'description', 'author', 'url', 'per_page',
            'date_format', 'time_format'
        ],
        theme: []
    },
    posts: {
        selectors: [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link',
            {
                path: 'tags',
                childrenSelectors: ['name', 'slug', 'permalink']
            },
            {
                path: 'categories',
                childrenSelectors: ['name', 'slug', 'permalink']
            }
        ],
        extracts: ['content']
    },
    pages: {
        selectors: [
            'title', 'date', 'updated', 'comments',
            'excerpt', 'source', 'full_source',
            'path', 'permalink', 'photos', 'link'
        ],
        extracts: ['content']
    },
    tags: ['name'],
    categories: ['name', 'parent']
};
var config = !hexo.config.toJson ? defaultConfig : helper_1.merge(hexo.config.toJson, defaultConfig);
hexo.extend.generator.register('toJson', function (site) {
    return helper_1.addPrefix('api', generator_1.generatePages(site.pages, config.pages.selectors, config.pages.extracts).concat(generator_1.generatePosts(site.posts, config.posts.selectors, config.posts.extracts), generator_1.generateGenerally(site.tags, config.tags, schema_1.tag, 'tags'), generator_1.generateGenerally(site.categories, config.categories, schema_1.category, 'categories'), generator_1.generateConfigGenerally(hexo.config, 'global', config.configs.global), generator_1.generateConfigGenerally(hexo.theme.config, 'theme', config.configs.theme)));
});
