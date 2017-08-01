/* eslint-disable better/no-ifs, fp/no-mutation */
import {always, cond, curry, equals, mergeAll, T} from "ramda"

export default component =>
  curry((state = {application: false}, {type, payload}) => {
    return (component.props = cond([
      [equals("SIGNUP_LOAD_COUNTRIES"), always(mergeAll([component.props, {countries: payload}]))],
      [equals("SIGNUP_SUBMIT"), always(mergeAll([component.props, {submit: payload}]))],
      [T, always(component.props)],
    ])(type))
  })
