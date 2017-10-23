const isLoading = 
  reducer('isLoading', false)
    .on('LOADING_SUCCESS')
    .on('LOADING_FAILURE').does(false)
    .on('IS_LOADING').does(true)
    .build()

isLoading(undefined, {}) // === false
isLoading(false, {type: 'IS_LOADING'}) // === true
isLoading(true, {type: 'LOADING_SUCCESS'}) // === false
isLoading(true, {type: 'LOADING_FAILURE'}) // === false
