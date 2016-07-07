import MyInput from '../MyInput';

class ControlledInput extends React.Component {
  state = {
    value: 'hola'
  }

  updateState(value) {
    this.setState({ value: value });
  }

  // shouldComponentUpdate

  render() {
    return (
      <MyInput
        value={this.state.value}
        onChange={(value) => this.updateState(value)}
      />
    );
  };
}

class DelegatedInputList extends React.Component {
  state = {
    count: 2
  }

  renderValues() {
    const values = [];

    for (let index = 0; index < this.state.count; index++) {
      values.push(
        <li key={index}>
          <ControlledInput />
        </li>
      );
    }

    return values;
  }

  addValue() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addValue()}>
          Add One
        </button>
        <ul>
          {this.renderValues()}
        </ul>
      </div>
    );
  }
}

export default DelegatedInputList;
