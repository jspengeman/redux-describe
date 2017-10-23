import invariant from 'invariant'

const notNull = (value) => value !== null
const notUndefined = (value) => value !== undefined
const notEmpty = (value) => value.length !== 0
const notNullOrUndefined = (value) => notNull(value) && notUndefined(value)

/**
 * Descriptively build a reducer.
 * 
 * @param {string} name The name of the reducer to build. 
 * Cannot be blank, null or undefined.
 * @param {any} initialState The initial state of the reducer. 
 * Cannot be null or undefined.
 * 
 * @return {object} An object with an on property to chain calls to. 
 * Never null or undefined.
 * 
 * @throws Error If name or initialState are null or undefined.
 */
const reducer = (name, initialState) => {
  invariant(notNullOrUndefined(name) && notEmpty(name),
    'name cannot be null or undefined.')
  invariant(notNullOrUndefined(initialState),
    'initialState cannot be null or undefined.')
  const stack = []

  /**
	 * Create the next case the reducer should handle.
	 * 
	 * @param {string} actionType The action type that should be handled. 
	 * Cannot be blank, null or undefined.
	 * 
	 * @return {object} An object with an does and on property to chain more 
	 * calls to. Never null or undefined.
	 * 
	 * @throws Error If actionType is null or undefined.
	 */
  const on = (actionType) => {
    invariant(notNullOrUndefined(actionType) && notEmpty(actionType),
      'actionType cannot be null or undefined.')
    stack.push({fn: 'on', arg: actionType})
    return Object.freeze({does, on})
  }

  /**
	 * Define the operation to preform for prior calls to on. If desired a 
	 * constant value can be returned instead of using a function.
	 * 
	 * @param {function|any} operation The operation to use to handle all prior 
	 * calls to on. Cannot be null or undefined. All calls to an operation are 
	 * passed the state and the action. Constant values are simply returned.
	 * 
	 * @return {object} An object with on and build properties to either add 
	 * more cases the reducer should handle or to finally construct the reducer. 
	 * Never null.
	 * 
	 * @throws Error If operation is null or undefined.
	 */
  const does = (operation) => {
    invariant(notNullOrUndefined(operation),
      'operation cannot be null or undefined.')
    stack.push({fn: 'does', arg: operation})
    return Object.freeze({on, build})
  }

  /**
	 * Build the reducer. All cases the reducer handles are generated from 
	 * the calls to on and does.
	 * 
	 * @return {function} A new reducer with the originally passed in name, 
	 * initial state and the default state from the call to build. 
	 * Never null or undefined.
	 */
  const build = () => {
    // build the possible cases for the reducer.
    const {cases} = stack.reverse().reduce(({cases, does}, call) => {
      switch (call.fn) {
        case 'does':
          return {cases, does: call}
        case 'on':
          return {does, cases: cases.concat({does, on: call})}
        default:
          return {cases, does}
      }
    }, {cases: [], does: null})

    // flatten the cases into an action lookup table
    const actions = cases.reduce((t, c) => {
      return Object.assign(t, {[c.on.arg]: c.does.arg})
    }, {})

    const builtReducer = (state = initialState, action) => {
      const operation = actions[action.type]
      if (notNullOrUndefined(operation) && typeof operation === 'function') {
        return operation(state, action)
      } else if (notNullOrUndefined(operation)) {
        return operation
      } else {
        return state
      }
    }
    Object.defineProperty(builtReducer, 'name', {value: name})
    return builtReducer
  }

  return Object.freeze({on})
}

export default reducer
