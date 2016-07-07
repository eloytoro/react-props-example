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

  addValue() {

  }

  changeInput(value, index) {

  }

  render() {
    return (
      <div className={style.container}>
        <ControlledInputList
          values={this.state.values}
          onToggle={() => this.toggleControlled()}
          onAdd={() => this.addValue()}
          onChange={(value, index) => this.changeInput(value, index)}
          isOpen={this.state.showControlled}
        />
        <ControlledInputList
          values={this.state.values}
          onToggle={() => this.toggleDelegated()}
          onAdd={() => this.addValue()}
          onChange={(value, index) => this.changeInput(value, index)}
          isOpen={this.state.showDelegated}
        />
      </div>
    );
  }
}

export default App;
