const { Gatherer } = require('lighthouse');

class ResourceSizeGather extends Gatherer {
    afterPass(options, loadData) {
        return loadData.networkRecords.reduce((arr, record) => {
            console.log('=====record.resourceType',record.resourceType)
            if (record.resourceType === 'Image') {
                console.log('record===',record.url,record.resourceSize)
                arr.push(record)
            }

            return arr;
        }, []);
    }
}

module.exports = ResourceSizeGather;

