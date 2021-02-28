import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const LambdaDemo = () => {
	const [state, set] = useState({
		msg: null,
		loading: false,
		walgreens: 'Unavailable',
		cookCounty: 'Unavailable',
	});

	const fatch = (api) => {
		set({ ...state, loading: true });
		fetch('/.netlify/functions/' + api)
			.then((response) => response.json())
			.then((json) => {
				set({ ...state, loading: false });
				set({ ...state, [api]: json });
			});
	};

	useEffect(() => {
		// fatch('walgreens');
		fatch('cookCounty');
	}, []);

	console.log('state > ', state);
	return (
		<>
			<div>Walgreens: {state.walgreens}</div>
			<br />
		</>
	);
};

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<LambdaDemo />
			</header>
		</div>
	);
};

export default App;
