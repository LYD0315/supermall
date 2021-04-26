module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'asset': '@/asset',
                'common': '@/asset',
                'component': '@/component',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}