var path = require('path');

module.exports = function (config) {
    config.set({
        singleRun: false,
        browsers: ['Chrome'],
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' },
            ],
        },
        files: [
            {pattern: 'app/js/**/*spec.js', watched: false},
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'app/js/**/*spec.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress'],
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.spec\.js$/,
                        include: /app/,
                        exclude: /(node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: /app/,
                        exclude: /(node_modules|tests)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        },
    });
};