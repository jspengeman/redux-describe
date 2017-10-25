# redux-describe
A boilerplate free way to build self documenting reducers with a simple API.

## Purpose
redux-describe is all about turning your reducers into your documentation to allow people to learn [redux](http://redux.js.org/) easier. In addition, redux-describe allows you to abstract out common operations and reuse them within multiple reducers in a uniform format. 

```
// A classical reducer for a calculator
const calculator = (state = 0, action) => {
  switch(action.type) {
    case 'ADD':
      return state + action.payload
    case 'SUB':
      return state - action.payload
    case 'DIV':
      return state + action.payload
    case 'MULT':
      return state * action.payload
    default:
      return state
  }
}

// The classical calculator reducer can be converted into a more 
// readable self documenting reducer using redux-describe.
const calculator =
  reducer(0)
    .on('ADD').does((state = 0, action) => state + action.payload)
    .on('SUB').does((state = 0, action) => state - action.payload)
    .on('DIV').does((state = 0, action) => state / action.payload)
    .on('MULT').does((state = 0, action) => state * action.payload)
    .build()
```

A single case can be read as: The calculator *reducer* *on* the 'ADD' action *does* the add operation. With non-anonymous functions the readability is increased even more.

redux-describe is a [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) for your reducers that uses words that allow you to read your reducers like they are just plain english sentences. It replaces switch statements with more terse `on` and `does` statements. 

For a more interesting example take a look at [relationalEntities.js](https://github.com/jspengeman/redux-describe/blob/master/examples/relationalEntities.js) example. The more advanced example demonstrates how generic `operations` can be shared amongst other reducers more readable reducers.

## Installation
To install redux-describe run the following command

```
npm install redux-describe --save
```

Or if you prefer yarn use this command instead

```
yarn add redux-describe
```

## Documentation
Full API documentation will completed on a 1.0 release. The API should be considered unstable until a formal 1.0 release is made.