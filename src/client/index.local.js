import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';

renderWithHotReload(Routes);

module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default;
    renderWithHotReload(NextApp);
});

function renderWithHotReload(Component) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('content')
    );
};
