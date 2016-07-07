class MyInput extends React.Component {
  doNothing() {

  }

  render() {
    for (let i = 0; i < 1000000; i++) {
      this.doNothing();
    }
    return (
      <input
        value={this.props.value}
        onChange={(event) => this.props.onChange(event.target.value)}
      />
    );
  }
}

export default MyInput;
