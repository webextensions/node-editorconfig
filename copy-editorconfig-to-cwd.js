#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const hasFlag = (...names) => names.some((name) => args.indexOf(name) !== -1);

// --version takes priority over --help; both print and exit 0 without copying.
if (hasFlag('--version', '-v')) {
    const pkg = require('./package.json');
    console.log(pkg.version);
    process.exit(0);
}

if (hasFlag('--help', '-h')) {
    console.log([
        '',
        ' Usage: node-editorconfig [options]',
        '',
        ' Copies a generic .editorconfig file into the current working directory.',
        '',
        ' Options:',
        '   --overwrite      Overwrite the .editorconfig file if it already exists',
        '   -v, --version    Show the package version and exit',
        '   -h, --help       Show this help message and exit',
        ''
    ].join('\n'));
    process.exit(0);
}

const cwd = process.cwd();
const sourcePath = path.resolve(__dirname, '.editorconfig');
const targetPath = path.resolve(cwd, '.editorconfig');

let writeToFile = false;
let overwriting = false;

if (fs.existsSync(targetPath)) {
    if (hasFlag('--overwrite')) {
        writeToFile = true;
        overwriting = true;
    } else {
        console.info(' ✔ .editorconfig file already exists at ' + targetPath);
        console.info([
            '',
            ' Note',
            ' ====',
            ' You may wish to use --overwrite parameter to update the .editorconfig file',
            ''
        ].join('\n'));
    }
} else {
    writeToFile = true;
}

if (writeToFile) {
    try {
        fs.copyFileSync(sourcePath, targetPath);
        if (overwriting) {
            console.info(' ✔ .editorconfig file overwritten at ' + targetPath);
        } else {
            console.info(' ✔ .editorconfig file added at ' + targetPath);
        }
    } catch (e) {
        console.error([
            '',
            ' ✗ Unable to write .editorconfig file at ' + targetPath,
            '',
            ' Error details',
            ' ============='
        ].join('\n'));

        console.error(e);
        console.error('');

        console.error('Aborting with exit code 1');
        process.exit(1);
    }
}
