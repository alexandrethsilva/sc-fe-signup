/* global localStorage */
import {define} from "skatejs"
import {all, always, any, compose, cond, curry, is, isArrayLike, isNil, not, T} from "ramda"
import {Future} from "ramda-fantasy"

// HELPERS //
const setLocalStorageItem = curry(localStorage.setItem.bind(localStorage))

// PURE //
export const clearConsole = _ => {
  // eslint-disable-next-line fp/no-unused-expression
  console.clear()
  return _
}

export const logConsole = _ => {
  // eslint-disable-next-line fp/no-unused-expression
  console.log(_)
  return _
}

export const logTable = value => {
  // eslint-disable-next-line fp/no-unused-expression
  console.table(value)
  return value
}

export const logError = value => {
  // eslint-disable-next-line fp/no-unused-expression
  console.error(value)
  return value
}

export const fromLocalStorage = key =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) => {
    const value = JSON.parse(localStorage.getItem(key))
    return value ? resolve(value) : reject(key)
  })

const prepareForStorage = value =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) =>
    cond([
      [any([is(Object), isArrayLike]), always(compose(resolve, JSON.stringify))],
      [isNil, always(reject("Attempting to save a null value? This is a no-op."))],
      [T, always(resolve)],
    ])
  )

// IMPURE //
export const toLocalStorage = curry((key, content) => {
  // eslint-disable-next-line fp/no-unused-expression
  prepareForStorage(content).fork(logConsole, setLocalStorageItem(key))
  return content
})

export const installCE = curry(
  (environment, component) =>
    // eslint-disable-next-line better/no-new
    new Promise((resolve, reject) =>
      cond([[all([not(isNil), isNil(environment.get(component.is))]), always(define(component))]])(
        environment
      )
    )
)
