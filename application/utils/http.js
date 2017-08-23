/* global fetch */
// eslint-disable-next-line import/no-unassigned-import
import "isomorphic-fetch"
import {Either, Future} from "ramda-fantasy"
import {compose, curry, has, ifElse} from "ramda"

const {Left, Right} = Either

// +++ HELPERS +++ //
export const leftOrRight = ifElse(has("error"), Left, Right)

export const withBody = body => ({body})
export const withCredentials = {credentials: "include"}
export const withCors = {mode: "cors"}
export const withMethod = method => ({method})
export const withRawContent = {headers: {"Content-Type": "application/json"}}
export const withJsonContent = {headers: {"Content-Type": "application/json"}}

export const responseMethod = curry(
  (method, response) =>
    // eslint-disable-next-line better/no-new
    new Future((reject, resolve) =>
      response[method]().then(compose(resolve, leftOrRight)).catch(compose(reject, Left))
    )
)

export const fetchData = curry(
  (options, url) =>
    // eslint-disable-next-line better/no-new
    new Future((reject, resolve) =>
      fetch(url, options).then(compose(resolve, leftOrRight)).catch(compose(reject, Left))
    )
)

export const extractResponse = response =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) =>
    response.then(compose(resolve, leftOrRight)).catch(compose(reject, Left))
  )
