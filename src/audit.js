const { Audit } = require('lighthouse');

const INIT_SCORE = 100;

class ResourceSizeAudit extends Audit {
    static get meta() {
        return {
            id: 'resource-size-audit',
            title: '正常图片',
            failureTitle: '过大图片',
            description: '过大图片列表',
            scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
            requiredArtifacts: ['ResourceSizeGather'],
        };
    }

    static audit(artifacts) {
        const imageList = artifacts.ResourceSizeGather;

        const overSizeList = imageList.filter((img => img.resourceSize > 50 * 1024));

        const finalScore = (INIT_SCORE - overSizeList.length * 0.5) / 100;

        const headings = [
            { key: 'url', itemType: 'thumbnail', text: '资源预览' },
            { key: 'url', itemType: 'url', text: '图片资源地址' },
            { key: 'resourceSize', itemType: 'bytes', text: '原始大小' },
            { key: 'transferSize', itemType: 'bytes', text: '传输大小' },
            /**
            * key：返回对象中details字段Audit.makeTableDetails方法第二个参数中对应的键值
            * itemType是Lighthouse识别对象key对应值，来使用不同的样式展示的。
            * itemType类型文档https://github.com/GoogleChrome/lighthouse/blob/v7.5.0/lighthouse-core/report/html/renderer/details-renderer.js#L266
            */
        ];
        return {
            score: finalScore,
            displayValue: `${overSizeList.length} / ${imageList.length} Size > 50 KB`,
            details: Audit.makeTableDetails(headings, overSizeList),
        };
    }
}

module.exports = ResourceSizeAudit;