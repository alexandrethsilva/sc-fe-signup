/* global fetch */
import "isomorphic-fetch"

import {Either, Future} from "ramda-fantasy"
const {Left, Right} = Either

import {curry} from "ramda"

// +++ HELPERS +++ //
export const withBody = body => ({body})
export const withCredentials = {credentials: "include"}
export const withCors = {mode: "cors"}
export const withMethod = method => ({method})
export const withRawContent = {headers: {"Content-Type": "application/json"}}
export const withJsonContent = {headers: {"Content-Type": "application/json"}}

export const responseMethod = curry(
  (method, response) =>
    // eslint-disable-next-line better/no-new
    new Future((reject, resolve) => response[method]().then(resolve).catch(reject))
)

export const fetchData = curry(
  (options, url) =>
    // eslint-disable-next-line better/no-new
    new Future((reject, resolve) => fetch(url, options).then(resolve).catch(reject))
)
