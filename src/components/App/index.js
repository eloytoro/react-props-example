import style from '../style.css';
import ControlledInputList from '../ControlledInputList';

class App extends React.Component {
  state = {
    showControlled: true,
    showDelegated: true,
    values: ['hola', 'mundo']
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
          values={this.state.values}
          onToggle={() => this.toggleControlled()}
          isOpen={this.state.showControlled}
        />
        <ControlledInputList
          values={this.state.values}
          onToggle={() => this.toggleDelegated()}
          isOpen={this.state.showDelegated}
        />
      </div>
    );
  }
}

export default App;
