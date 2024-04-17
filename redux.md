# Redux | ¿Qué es redux? + React redux

Instalación en un proyecto vite

```bash
npm install @reduxjs/toolkit react-redux
```

## Implementación
Primero creamos nuestro `slice` con el toolkit de redux.
```js
// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
```

Este contiene el estado y los reducers del estado.
<br/>
Los reducers pueden tener 2 parametros, el `state` y el `action`. El `state` sirve para obtener el estado de nuestro slice y el `action` contiene dentro del `payload` los parametros enviados a travez del dispatch.

```js
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    incrementBy: (state, action) => {
      state.counter += action.payload;
    },
  },
});

export const { incrementBy } = counterSlice.actions;
```
### thunks

En cuanto a acciones asincronas, en redux se utilizan los `thunks`. En el se pueden hacer dispatch de distintas acciones sincronas y realizar procesos asincronos.

```js
// thunks.js
export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPokemons());

    const { data } = await pokemonApi.get(
      `/pokemon?limit=10&offset=${page * 10}`
    );

    dispatch(setPokemons({ pokemons: data.results, page: page + 1 }));
  };
};

```

## Creando el Store

En un archivo nuevo `store.js`, importamos `configureStore` del toolkit de Redux y los slices que definimos anteriormente.

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
```
Construir el `store` con los slices con la función `configureStore`. Este recibe un objeto donde se definen los reducer de los slices.
```js
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```
## Configurar el Store
En el archivo `main.jsx` de nuestro proyecto, importar `Provider` y el store que creamos anteriormente para poder utilizar los estados.

```jsx
// main.jsx
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App.jsx";
```

El `Provider` servirá a nuestra `App` con el store definido mediante la siguiente configuración.
```jsx
<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>
```

## Uso de los estados
Importamos de `react-redux` las funciones `useSelector` y `useDispatch`. Además importamos los reducers definidos en los slices, en este caso `increment`.
- **useSelector**: Sirve para obtener los estados que definimos en el store. El store, aunque no se vizualice en el código, es obtendio gracias al Provider definido en el `main.jsx`.
- **useDispatch**: Será de utilidad para realizar los cambios de estados que fueron definidos en los slices.

```jsx
// main.jsx
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./store/slices/counter";
```

Para usar los estados definidos hacemos uso de la función `useSelector`. Esta función recibe un *arrow function* para obtener los estados del slice que necesitamos.
Despues, creamos un *dispatch* con la función `useDispatch`.
<br/>

Los estados obtenidos pueden ser usados como siempre, mientras que los reducers se ejecutan usando el `dispatch` creado anteriormente.

```jsx
export const App = () => {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Count is {counter}</h1>
      <button
        onClick={() => dispatch(increment())}
      >Increment</button>
    </>
  );
}
```