import {API_ENDPOINT_COUNTRIES, API_ENDPOINT_SIGNUP} from "constants"
import {fetchData, responseMethod, withCors, withJsonContent} from "utils/http"
import {mergeAll} from "ramda"

import {Either} from "ramda-fantasy"
const {Left, Right} = Either

export const loadSignupCountries = () =>
  fetchData(mergeAll(withCors, withJsonContent), `${API_ENDPOINT_COUNTRIES}`)
    .chain(responseMethod("json"))
    .map(r => (r.error ? Left(r.error) : Right(r)))

export const submitSignup = body =>
  fetchData(mergeAll(withCors, withJsonContent, body), `${API_ENDPOINT_SIGNUP}`)
    .chain(responseMethod("json"))
    .map(r => (r.error ? Left(r.error) : Right(r)))
