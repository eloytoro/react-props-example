import style from './style.css';
import ControlledInputList from '../ControlledInputList';
import DelegatedInputList from '../DelegatedInputList';

class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <ControlledInputList />
      </div>
    );
  }
}

export default App;
