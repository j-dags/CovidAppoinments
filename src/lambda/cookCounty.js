// import fetch from 'node-fetch';
const chromium = require('chrome-aws-lambda');
// import { password } from '../../secrets';
// const BASE_URL = 'https://vaccine.cookcountyil.gov/';

export async function handler(event, context) {
	try {
		(async () => {
			// /* Initiate the Puppeteer browser */
			const browser = await chromium.puppeteer.launch({
				executablePath: await chromium.executablePath,
				args: chromium.args,
				defaultViewport: chromium.defaultViewport,
				headless: chromium.headless,
			});
			const page = await browser.newPage();
			// const page = await browser.newPage();
			// page.setViewport({ width: 1500, height: 1000 });
			// // console.log(data);
			// await browser.close();
		})();
		return {
			statusCode: 200,
			body: JSON.stringify('fasd;lfkjasdf'),
		};
	} catch (err) {
		console.log(err); // output to netlify function log
		return {
			statusCode: 500,
			body: JSON.stringify(err.message), // Could be a custom message or object i.e. JSON.stringify(err)
		};
	}
}
