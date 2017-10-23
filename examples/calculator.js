import reducer from 'redux-describe'

const calculator =
	reducer(0)
		.on('ADD').does((state = 0, action) => state + action.payload)
		.on('SUB').does((state = 0, action) => state - action.payload)
		.on('DIV').does((state = 0, action) => state / action.payload)
		.on('MULT').does((state = 0, action) => state * action.payload)
		.build()

calculator(1, {}) // == 1
calculator(undefined, {}) // == 0 
calculator(5, {type: 'ADD', payload: 5}) // === 10
calculator(5, {type: 'SUB', payload: 5}) // === 0
calculator(5, {type: 'DIV', payload: 5}) // === 1
calculator(5, {type: 'MULT', payload: 5}) // === 25
