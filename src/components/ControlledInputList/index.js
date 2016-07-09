import MyInput from '../MyInput';
import style from '../style.css';

// El estado global de nuestra aplicacion
var state = {
  values: ['hola', 'mundo'],
  otherValues: ['adios', 'mundo', 'cruel']
};

// Listeners suscritos a cambios (es un array de funciones [fn, fn2, fn3, ...])
var listeners = [];

/**
 * Suscribe la funcion al cambio del estado y devuelve una funcion que cuando es llamada quita la
 * suscripcion
 *
 *
 * function onChange() { this.forceUpdate() }
 * var unsubscribe = subscribe(onChange);
 * ...
 * unsubscribe()
 */
var subscribe = fn => {
  listeners.push(fn);
  return () => {
    var index = listeners.indexOf(fn);
    listeners.splice(index, 1);
  };
};

/**
 * Cambia el estado de la aplicacion,
 * console.log(state) -> { value: 'hola' }
 * setState({ value: 'adios' })
 * console.log(state) -> { value: 'adios' }
 */
var setState = (newState) => {
  listeners.forEach(fn => fn(newState, state));
  Object.assign(state, newState);
};

/**
 * Suscribe automaticamente el componente a cambios en el estado, el parametro `setState` va a
 * determinar que parte del estado esta pidiendo para ver cambios.
 * Nota: todas las "keys" presentes en el objeto retornado al llamar esta funcion se le pasaran
 * al componente como propiedades
 * E.j.
 *
 * state = {
 *   values: ['hola', 'mundo']
 * }
 * class Title extends Component {
 *   render() {
 *     return <h1>{this.props.text}</h1> // <- "text" no esta definido, necesita ser pasado como un prop
 *   }
 * }
 *
 * var ConnectedTitle = connectToState(Title, state => {
 *   return { text: state.values[0] } // <- la llave "text" se le pasara al componente como un prop
 * });
 *
 * <ConnectedTitle /> // <- imprime `<h1>hola</h1>`
 */
const connectToState = (ConnectedComponent, selectState) => {
  class ConnectedInput extends React.Component {
    // tenemos que llevar un registro de cual era el estado del componente antes de que cambie el
    // estado asi que lo guardaremos en `state.prevState` para comparar
    state = {
      prevState: {}
    }

    componentWillMount() {
      // cuando el componente va a hacer mount guardamos el estado actual en memoria, notese que
      // selectState va a devolver solo la parte del estado que queremos
      this.setState({ prevState: selectState(state) });

      this.unsubscribe = subscribe((newState) => {
        // la parte del estado nuevo que el objeto esta viendo
        const innerState = selectState(newState);
        // el estado guardado en memoria
        const prevState = this.state.prevState;
        // revisar si el estado es igual al anterior por referencia de memoria, recuerda que
        // `{} == {}` es `false` asi que esto solo revisa que sea exactamente el mismo
        let isEqual = newState === prevState;
        // En caso de ser diferente, pero el estado nuevo es un objeto vamos a comparar key por key
        // a ver si se hizo algun cambio
        if (!isEqual && typeof innerState === 'object') {
          // La function `.every` va a iterar sobre cada elemento del array y espera que para todos
          // devuelva `true`, si alguno de los resultados devuelve `false` la iteracion se detiene y
          // devuelve `false`
          isEqual = Object.keys(innerState).every(key => {
            return innerState[key] === prevState[key];
          });
        };
        // Si el estado en efecto cambio entonces hay que hacer update al componente, y llamar
        // `setState` hace eso por nosotros
        if (!isEqual) {
          this.setState({ prevState: innerState });
        }
      });
    }

    // Cuando el componente es desmontado hay que eliminar el listener de la lista de listeners
    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const innerState = selectState(state);
      // Todas las llaves devueltas por el `selectState` son pasadas al componente
      return (
        <ConnectedComponent
          {...this.props}
          {...innerState}
        />
      );
    }
  }

  return ConnectedInput;
};

class InputComponent extends React.Component {
  updateState(newValue) {
    // El componente sabe cual index esta mostrando asi que es facil determinar cual parte del
    // estado hace falta cambiar
    var values = state.values.map((value, i) => {
      if (i === this.props.index) {
        return newValue;
      }
      return value;
    });
    setState({ values: values });
  }

  render() {
    const value = this.props.value;
    return (
      <MyInput
        value={value}
        onChange={(value) => this.updateState(value)}
      />
    );
  }
};

var HolaInput = connectToState(InputComponent, (state, props) => {
  // Es similar a decir
  // <InputComponent
  //   value={state.values[0]}
  //   index={0}
  // />
  return {
    value: state.values[0],
    index: 0
  }
});

var MundoInput = connectToState(InputComponent, (state, props) => {
  return {
    value: state.values[1],
    index: 1
  }
});

class Title extends React.Component {
  render() {
    const value = this.props.text;
    return ( <h1>{value}</h1> );
  }
}

var MundoTitle = connectToState(Title, (state, props) => {
  return {
    text: state.values[0]
  }
});

class ClearButton extends React.Component {
  clearAllValues() {
   var newValues = state.values.map(value => value = '')
   setState({values:newValues});
  }

  render() {
    const isDisabled = this.props.disabled;
    return (
      <button disabled={isDisabled} onClick={() => this.clearAllValues()}>
        Clear All
      </button>
    );
  }
}

var ConnectedClearButton = connectToState(ClearButton, (state) => {
  var valor = false;
  console.log(valor)
  state.values.forEach(value =>{
    if( value == ''){
      valor = true;
    }
  });
  return {
    disabled: valor
  };
});

class ControlledInputList extends React.Component {
  render() {
    return (
      <div className={style.col}>
        <button onClick={() => this.props.onToggle()}>
          Toggle
        </button>
        <ConnectedClearButton />
        <MundoTitle />
        <ul>
          <li>
            <HolaInput />
          </li>
          <li>
            <MundoInput />
          </li>
        </ul>
      </div>
    );
  }
}

export default ControlledInputList;
