import reducer from '../src'

// TODO: A test case should be added to see verify
// the output of combineReducers is what is expected.
// The test case should verify what happens when the
// variable name and the reducer name arg are the same
// or different. If any differences cause problems,
// the variable name should be used and the name arg
// will need to be removed.

describe('reducer', () => {
  it('throws an error if any argument breaks its contract.', () => {
    expect(() => reducer(null, 1)).toThrow()
    expect(() => reducer(undefined, 1)).toThrow()
    expect(() => reducer('any', null)).toThrow()
    expect(() => reducer('any', undefined)).toThrow()
    expect(() => reducer('', 1)).toThrow()
  })

  it('returns an object with the \'on\' property', () => {
    const builder = reducer('any', 1)
    expect(builder.on).toBeDefined()
  })

  it('returns an immutable object', () => {
    expect(() => {
      const builder = reducer('any', 1)
      Object.defineProperty(builder, 'field', {value: 'field'})
    }).toThrow()
  })

  describe('on', () => {
    const on = reducer('any', 1).on

    it('throws an error actionType if is blank, null or undefined', () => {
      expect(() => on(null)).toThrow()
      expect(() => on(undefined)).toThrow()
      expect(() => on('')).toThrow()
    })

    it('returns an object with \'on\' and \'does\' properties', () => {
      const builder = on('any')
      expect(builder.on).toBeDefined()
      expect(builder.does).toBeDefined()
    })

    it('returns an immutable object', () => {
      expect(() => {
        const builder = on('any')
        Object.defineProperty(builder, 'field', {value: 'field'})
      }).toThrow()
    })

    describe('does', () => {
      const does = on('any').does

      it('throws an error if operation is null or undefined', () => {
        expect(() => does(null)).toThrow()
        expect(() => does(undefined)).toThrow()
      })

      it('returns an object with \'on\' and \'build\' properties', () => {
        const builder = does((s, a) => s)
        expect(builder.on).toBeDefined()
        expect(builder.build).toBeDefined()
      })

      it('returns an immutable object', () => {
        expect(() => {
          const builder = does((s, a) => s)
          Object.defineProperty(builder, 'field', {value: 'field'})
        }).toThrow()
      })

      describe('build', () => {
        it('builds a reducer with the given name', () => {
          const fn =
            reducer('reducerName', 0)
              .on('operation').does((state = 0, action) => state)
              .build()
          expect(fn.name).toBe('reducerName')
        })

        it('builds a reducer with a single on and it call', () => {
          const fn =
            reducer('reducer', 0)
              .on('operation').does((state = 0, action) => state)
              .build()
          expect(fn).toBeDefined()
        })

        it('builds a reducer with multiple on calls and a single it call',
          () => {
            const fn =
              reducer('reducer', 0)
                .on('operation1')
                .on('operation2')
                .on('operation3').does((state = 0, action) => state)
                .build()
            expect(fn).toBeDefined()
          })

        it('builds a reducer with multiple on calls and multiple it calls',
          () => {
            const operation = (state = 0, action) => state
            const fn =
              reducer('reducer', 0)
                .on('operation1').does(operation)
                .on('operation2').does(operation)
                .on('operation3').does(operation)
                .build()
            expect(fn).toBeDefined()
          })

        it('built reducer correctly handles all cases with correct operations',
          () => {
            const fn =
              reducer('reducer', 0)
                .on('action0')
                .on('action1').does((state = 0, action) => 1)
                .on('action2').does((state = 0, action) => 2)
                .on('action3').does(3)
                .on('action4').does(4)
                .build()
            expect(fn(undefined, {})).toBe(0)
            expect(fn(0, {type: 'action0'})).toBe(1)
            expect(fn(0, {type: 'action1'})).toBe(1)
            expect(fn(0, {type: 'action2'})).toBe(2)
            expect(fn(0, {type: 'action3'})).toBe(3)
            expect(fn(0, {type: 'action4'})).toBe(4)
          })
      })
    })
  })
})
