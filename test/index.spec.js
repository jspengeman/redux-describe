import given from '../src'

// TODO:
// 1) Add typescript typings.
// 2) Setup documentation generation.
// 3) Setup linting.
// 5) Add details to README.
// 6) Document API.
// 7) Setup test watching/searching/filtering.
// 8) Add contribution guide.
// 9) Finish testing.

describe('given', () => {
  it('throws an error if any argument breaks its contract.', () => {
    expect(() => given(null, 1)).toThrow()
    expect(() => given(undefined, 1)).toThrow()
    expect(() => given('any', null)).toThrow()
    expect(() => given('any', undefined)).toThrow()
    expect(() => given('', 1)).toThrow()
  })

  it('returns an object with the \'on\' property', () => {
    const builder = given('any', 1)
    expect(builder.on).toBeDefined()
  })

  describe('on', () => {
    const on = given('any', 1).on

    it('throws an error actionType if is blank, null or undefined', () => {
      expect(() => on(null)).toThrow()
      expect(() => on(undefined)).toThrow()
      expect(() => on('')).toThrow()
    })

    it('returns an object with \'on\' and \'it\' properties', () => {
      const builder = on('any')
      expect(builder.on).toBeDefined()
      expect(builder.it).toBeDefined()
    })

    describe('it', () => {
      const itFn = on('any').it

      it('throws an error if operation is null or undefined', () => {
        expect(() => itFn(null)).toThrow()
        expect(() => itFn(undefined)).toThrow()
      })

      it('returns an object with \'on\' and \'build\' properties', () => {
        const builder = itFn((s, a) => s)
        expect(builder.on).toBeDefined()
        expect(builder.build).toBeDefined()
      })

      describe('build', () => {
        it('builds a reducer with a single on and it call', () => {
          const reducer =
            given('reducer', 0)
              .on('operation').it((state = 0, action) => state)
              .build()
          expect(reducer).toBeDefined()
        })

        it('builds a reducer with multiple on calls and a single it call',
          () => {
            const reducer =
              given('reducer', 0)
                .on('operation1')
                .on('operation2')
                .on('operation3').it((state = 0, action) => state)
                .build()
            expect(reducer).toBeDefined()
          })

        it('builds a reducer with multiple on calls and multiple it calls',
          () => {
            const operation = (state = 0, action) => state
            const reducer =
              given('reducer', 0)
                .on('operation1').it(operation)
                .on('operation2').it(operation)
                .on('operation3').it(operation)
                .build()
            expect(reducer).toBeDefined()
          })

        it('built reducer correctly handles all cases with correct operations',
          () => {
            const reducer =
              given('reducer', 0)
                .on('action0')
                .on('action1').it((state = 0, action) => 1)
                .on('action2').it((state = 0, action) => 2)
                .on('action3').it(3)
                .on('action4').it(4)
                .build()
            expect(reducer(undefined, {})).toBe(0)
            expect(reducer(0, {type: 'action0'})).toBe(1)
            expect(reducer(0, {type: 'action1'})).toBe(1)
            expect(reducer(0, {type: 'action2'})).toBe(2)
            expect(reducer(0, {type: 'action3'})).toBe(3)
            expect(reducer(0, {type: 'action4'})).toBe(4)
          })
      })
    })
  })
})
