const puppeteer = require('puppeteer');
const { password } = require('./secrets');

const BASE_URL = 'https://vaccine.cookcountyil.gov/';

function wait(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

(async () => {
	/* Initiate the Puppeteer browser */
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setViewport({ width: 1500, height: 1000 });

	/* Go to the IMDB Movie page and wait for it to load */
	await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

	// Click Sign Up Buttons
	await page.click('#signUp');
	await page.click('button.MuiButtonBase-root:nth-child(3)');
	// Input sign-up code
	await page.type('#confirmCodeInput', password);
	await wait(500);
	// Click continue button
	const [loginButton] = await page.$x('//button[contains(., "Continue")]');
	await loginButton.click();
	await wait(500);

	const availability = await page.evaluate(() => {
		let ans = document.querySelector('p.MuiTypography-root:nth-child(7)')
			.innerText;
		return ans;
	});
	/* Outputting what we scraped */
	console.log(availability);

	// console.log(data);
	await browser.close();
})();
