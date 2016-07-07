import MyInput from '../MyInput';

class ControlledInputList extends React.Component {
  state = {
    values: ['hola', 'mundo']
  }

  updateState(value, index) {
    const newValues = [].concat(this.state.values);
    newValues[index] = value;
    this.setState({ values: newValues });
  }

  renderValues() {
    return this.state.values.map((value, index) => {
      return (
        <li key={index}>
          <MyInput
            value={value}
            onChange={(value) => this.updateState(value, index)}
          />
        </li>
      );
    })
  }

  addValue() {
    this.setState({
      values: this.state.values.concat('nuevo')
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

export default ControlledInputList;
