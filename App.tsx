import React from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import MainView from 'Views';

const App = () => {
	return (
		<Provider store={store}>
			<MainView />
		</Provider>
	);
};

export default App;
