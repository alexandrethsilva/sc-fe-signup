import {API_ENDPOINT_COUNTRIES} from "constants"
import ACTIVE_COUNTRIES_LIST from "constants/countries"
import {invoke} from "utils"
import {
  extractResponse,
  fetchData,
  withCors,
  // withJsonContent,
  // withManualRedirect,
  // withFollowRedirect,
  // withMethod,
} from "utils/http"
// import {parseSubmissionEvent} from "utils/signup"

import {anyPass, chain, compose, equals, filter, map, prop} from "ramda"

const byActiveCountries = compose(
  anyPass(map(i => equals(i), ACTIVE_COUNTRIES_LIST)),
  prop("alpha2Code")
)

export const loadSignupCountries = () =>
  fetchData(withCors, `${API_ENDPOINT_COUNTRIES}`)
    .map(chain(invoke("json")))
    .chain(extractResponse)
    .map(map(filter(byActiveCountries)))

// eslint-disable-next-line fp/no-nil, better/explicit-return
export const submitSignup = event => {
  // eslint-disable-next-line fp/no-unused-expression
  event.preventDefault()
  // eslint-disable-next-line fp/no-unused-expression
  event.stopPropagation()

  // eslint-disable-next-line no-debugger
  debugger
  // eslint-disable-next-line fp/no-unused-expression
  event.target.submit()

  // const body = omit(["confirm_email", "sc_csrf"], parseSubmissionEvent(event))

  // const submissionUrl = redirectUrl
  //   ? `${API_ENDPOINT_SIGNUP}/login?redirect=${encodeURIComponent(redirectUrl)}`
  //   : `${API_ENDPOINT_SIGNUP}`

  // return fetchData(
  //   mergeAll([
  //     // withCors,
  //     // withJsonContent,
  //     // withManualRedirect,
  //     withFollowRedirect,
  //     withMethod("post"),
  //     {body: JSON.stringify(body)},
  //   ]),
  //   `${submissionUrl}`
  // )
}
