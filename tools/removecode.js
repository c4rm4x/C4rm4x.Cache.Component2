const del = require('del');
del(['dist/!(*.umd.js|*.es.js|*.d.ts|*.umd.js.map|*.es.js.map)']).then(paths => {
    console.log('Files and folders that would be deleted:\n', paths.join('\n'));
});