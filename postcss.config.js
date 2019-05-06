module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('autoprefixer'),
        require('postcss-import'),
        require('postcss-preset-env'),
        require('postcss-nested'),
        require('cssnano'),
        require('precss'),
        // require('postcss-autoreset'),
    ]
};