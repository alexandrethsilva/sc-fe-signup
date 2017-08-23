/* eslint-disable better/no-ifs, fp/no-mutation */
import {emit} from "skatejs"
import {always, cond, curry, equals, mergeAll, T} from "ramda"

export default component =>
  curry((state = {application: false}, {type, payload}) => {
    return (component.props = cond([
      [
        equals("SIGNUP_LOAD_COUNTRIES"),
        () => {
          // eslint-disable-next-line fp/no-unused-expression
          emit(document, "sc-signup-clicked", {
            detail: {
              data: {countries: payload.value},
            },
          })
          return mergeAll([component.props, {countries: payload}])
        },
      ],
      [equals("SIGNUP_SUBMIT_REQUEST"), always(mergeAll([component.props, {processing: true}]))],
      [
        equals("SIGNUP_SUBMIT_RESPONSE"),
        always(mergeAll([component.props, {data: payload, processing: false}])),
      ],
      [T, always(component.props)],
    ])(type))
  })
