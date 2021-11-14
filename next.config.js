/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        serviceName: process.env.npm_package_name,
        serviceShortName: process.env.npm_package_name.replace(/-v[0-9]+/, ''),
        serviceVersion: process.env.npm_package_name.replace(
            /.+-(v[0-9]+)/,
            '$1'
        ),
        serviceDescription: process.env.npm_package_description,
        mongodbDbName: 'LOGS',
        mongodbCollectionName: 'LOGS',
    },
};
