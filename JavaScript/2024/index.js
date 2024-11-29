const https = require('https');
const fs = require('fs');

(async () => {
    const SESSION_ID = process.env.SESSION_COOKIE
    const DAY = process.env.DAY
    const YEAR = process.env.YEAR
    const url = `https://adventofcode.com/${YEAR}/day/${DAY}/input`;

    try {

        const { hostname, pathname } = new URL(url);

        const options = {
            hostname: hostname,
            path: pathname,
            method: 'GET',
            headers: {
                'Cookie': `session=${SESSION_ID}`
            }
        };

        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', reject);

            req.end();
        });

        const filePath = `./inputs/day${DAY}.txt`;
        fs.writeFileSync(filePath, response);

        console.log(`Input saved to ${filePath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();