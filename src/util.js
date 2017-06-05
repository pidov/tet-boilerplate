import mapValues from 'lodash/fp/mapValues'
import isError from 'lodash/fp/isError'

export {
  createActions
}

function createActions (actionTypes) {
  return mapValues(function (type) {
    return function (payload) {
      const error = isError(payload)
      return {type, payload, error}
    }
  })(actionTypes)
}