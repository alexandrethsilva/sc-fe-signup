/* eslint-disable import/prefer-default-export */
import {always, compose, cond, curry, equals, flip, prop, T} from "ramda"
import formParser from "form-parse"

const parseWith = flip(formParser)

const defaultParser = curry((name, value, element) =>
  cond([[equals("number"), always(Number(value))], [T, always(value)]])(value)
)

export const parseSubmissionEvent = compose(parseWith(defaultParser), prop("target"))
