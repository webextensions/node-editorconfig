#!/usr/bin/env node

var fs = require('fs'),
    path = require('path');

var cpFile = require('cp-file');

var packageJson = require('./package.json');

// packageJson._id would be undefined if it is npm installed
// We add this condition because we don't want the copying to occur when this script gets executed along with running "npm install" while developing this package
if (packageJson._id) {
    var sourcePath = path.resolve(__dirname, '.editorconfig'),
        targetPath = path.resolve(__dirname, '..', '..', '.editorconfig');
    cpFile(sourcePath, targetPath).then(function () {
        console.log(
            '.editorconfig file copied' +
            '\n    from: ' + sourcePath +
            '\n    to:   ' + targetPath
        );
    });
}
