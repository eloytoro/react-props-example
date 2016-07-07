import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'components/App';

const doRender = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

doRender();
