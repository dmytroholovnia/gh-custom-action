const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    //1. Get inputs
    const bucketName = core.getInput('bucket', {require: true});
    const bucketRegion = core.getInput('bucket-region', {require: true});
    const distFolder = core.getInput('dist-folder', {require: true});

    //2. File upload
    const s3Uri = `s3://${bucketName}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    //3. set output value
    const url = `https://${bucketName}.s3-website.${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', url);

//    core.notice('My test message') //logging
}

run();