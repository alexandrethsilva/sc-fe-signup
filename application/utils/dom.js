import {Observable} from "rxjs/Rx"
import {anyPass, compose, cond, equals, flip, isEmpty, not, T} from "ramda"
import {Maybe, Future} from "ramda-fantasy"

// +++ HELPERS +++//
const {Just, Nothing} = Maybe

export const getDom = element =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) =>
    cond(
      [
        [anyPass([equals(window), equals(document)]), compose(resolve, Just)],
        [compose(not, isEmpty, document.querySelector), compose(resolve, Just)],
        [T, compose(reject, Nothing)],
      ],
      element
    )
  )

export const listen = flip(Observable.fromEvent)

export const preventDefault = event => {
  // eslint-disable-next-line fp/no-unused-expression
  event.preventDefault()
  return event
}

export const stopPropagation = event => {
  // eslint-disable-next-line fp/no-unused-expression
  event.stopPropagation()
  return event
}
