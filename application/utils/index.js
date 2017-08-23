import {curry, invoker} from "ramda"

// eslint-disable-next-line fp/no-nil, better/explicit-return
export const noop = () => {}

export const invoke = curry((method, target) => invoker(0, method)(target))
