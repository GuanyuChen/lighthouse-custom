const ResourceSizeGather = require('./gather');
const ResourceSizeAudit = require('./audit')

module.exports = {
    extends: 'lighthouse:default', // 决定是否包含默认audits，就是上述默认五个分类
    settings: {
        locale: 'zh' //  国际化
    },
    passes: [{
        passName: 'custom-gather',
        gatherers: [
            ResourceSizeGather, // 自定义Gather的应用 
        ],
    }],
    audits: [
        ResourceSizeAudit, // 自定义Audit的应用 
    ],
    categories: {
        mysite: {
            title: '图片大小检测',
            description: '检测超出 50 KB的过大图片进行优化',
            auditRefs: [
                {
                    id: 'resource-size-audit',
                    weight: 1
                },
            ],
        },
    },
}