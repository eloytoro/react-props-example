import style from '../style.css';
import ControlledInputList from '../ControlledInputList';

class App extends React.Component {
  state = {
    showControlled: true,
    showDelegated: true,
  }

  toggleControlled() {
    this.setState({
      showControlled: !this.state.showControlled
    });
  }

  toggleDelegated() {
    this.setState({
      showDelegated: !this.state.showDelegated
    });
  }


  render() {
    return (
      <div className={style.container}>
        <ControlledInputList
          onToggle={() => this.toggleControlled()}
          isOpen={this.state.showControlled}
        />
        <ControlledInputList
          onToggle={() => this.toggleDelegated()}
          isOpen={this.state.showDelegated}
        />
      </div>
    );
  }
}

export default App;
