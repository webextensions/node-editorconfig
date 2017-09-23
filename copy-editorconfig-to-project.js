var fs = require('fs');

var cpFile = require('cp-file');

var packageJson = require('./package.json');

// packageJson._id would be undefined if it is npm installed
// We add this condition because we don't want the copying to occur when this script gets executed along with running "npm install" while developing this package
if (packageJson._id) {
    cpFile('./.editorconfig', '../../.editorconfig').then(() => {
        console.log('.editorconfig file copied');
    });
}
