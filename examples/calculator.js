const add = (state = 0, action) => state + action.payload
const subtract = (state = 0, action) => state - action.payload
const divide = (state = 0, action) => state / action.payload
const multiply = (state = 0, action) => state * action.payload

const calculator = given("calculator", 0)
									  .on('ADD').it(add)
  								  .on('SUB').it(subtract)
  								  .on('DIV').it(divide)
  								  .on('MULT').it(multiply)
  								  .build(0);
