import fetch from 'node-fetch';

export async function handler(event, context) {
	try {
		const response = await fetch(
			'https://www.walgreens.com/hcschedulersvc/svc/v1/immunizationLocations/availability',
			{
				credentials: 'include',
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
					Accept: 'application/json, text/plain, */*',
					'Accept-Language': 'en-US,en;q=0.5',
					'Content-Type': 'application/json; charset=utf-8',
					'X-XSRF-TOKEN':
						'lfl7eIm7RgTYUg==.ChVLZlpiNt8knKWBgPAvT4c3g59IhkmBDyYBDOF9Rxs=',
				},
				referrer:
					'https://www.walgreens.com/findcare/vaccination/covid-19/location-screening',
				body:
					'{"serviceId":"99","position":{"latitude":41.8839927,"longitude":-87.61970559999999},"appointmentAvailability":{"startDateTime":"2021-03-01"},"radius":25}',
				method: 'POST',
				mode: 'cors',
			}
		);
		const data = await response.json();
		const available = data.appointmentsAvailable;
		return {
			statusCode: 200,
			body: JSON.stringify(available ? 'Available' : 'Unavailable'),
		};
	} catch (err) {
		console.log(err); // output to netlify function log
		return {
			statusCode: 500,
			body: JSON.stringify(err.message), // Could be a custom message or object i.e. JSON.stringify(err)
		};
	}
}
