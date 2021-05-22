import Loading from 'components/Loading';
import {themes} from 'config';
import app from 'helpers/App';
import {connectFirebase} from 'helpers/firebase/redux/connectFirebase';
import ThemeProvider from 'hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from 'store';
import MainView from 'Views';

const App = () => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		app.init().then(() => {
			setReady(true);
			connectFirebase(store);
		});
	}, []);

	if (!ready) return <Loading fullScreen />;

	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<ThemeProvider themes={themes} defaultTheme={'dark'}>
					<MainView />
				</ThemeProvider>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
