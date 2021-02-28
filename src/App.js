import React, { useEffect, useState } from 'react';
import './App.css';

const LambdaDemo = () => {
	const [state, set] = useState({
		msg: null,
		loading: false,
		walgreens: 'Unavailable',
		cookCounty: 'Unavailable',
	});

	useEffect(() => {
		const fatch = (api) => {
			set({ ...state, loading: true });
			fetch('/.netlify/functions/' + api)
				.then((response) => response.json())
				.then((json) => {
					set({ ...state, loading: false });
					set({ ...state, [api]: json });
				});
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				pageToScreenshot: 'https://bitsofco.de',
			}),
		};
		fatch('walgreens');
		// fatch('cookCounty');
		const fitch = async () => {
			return await fetch('/.netlify/functions/screenshot', options);
		};
		console.log('fitch > ', fitch());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// console.log('state > ', state);
	return (
		<div
			id="grid"
			style={{ display: 'grid', placeContent: 'center', height: '100vh' }}
		>
			<div>Cook County: {state.cookCounty}</div>
			<div>Walgreens: {state.walgreens}</div>
			<br />
		</div>
	);
};

const App = () => {
	return <LambdaDemo />;
};

export default App;
