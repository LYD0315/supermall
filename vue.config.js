module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/asset',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}
