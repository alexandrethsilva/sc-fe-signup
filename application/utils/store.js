/* eslint-disable import/prefer-default-export */
import {curry} from "ramda"

export const dispatchAction = curry((store, type, payload) => store.dispatch({type, payload}))
