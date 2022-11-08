require('dotenv').config({ path: '../.env' });

module.exports = {
    launch: {
        devtools: true,
        headless: process.env.HEADLESS === '1',
        ignoreHTTPSErrors: true,
        args: [
            '--ignore-certificate-errors',
            '--disable-web-security',
        ]
    },
}
