import MyInput from '../MyInput';
import style from '../style.css';

class ControlledInputList extends React.Component {
  renderValues() {
    if (this.props.isOpen === false) return null;
    return this.props.values.map((value, index) => {
      return (
        <li key={index}>
          <MyInput
            value={value}
            onChange={(value) => this.props.onChange(value, index)}
          />
        </li>
      );
    })
  }

  addValue() {
    this.props.onAdd();
  }

  render() {
    return (
      <div className={style.col}>
        <button onClick={() => this.props.onToggle()}>
          Toggle
        </button>
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
