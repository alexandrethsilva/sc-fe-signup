import {API_ENDPOINT_COUNTRIES} from "constants"
import ACTIVE_COUNTRIES_LIST from "constants/countries"
import {invoke} from "utils"
import {
  extractResponse,
  fetchData,
  withCors,
} from "utils/http"

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
  /* eslint-disable fp/no-unused-expression */
  event.preventDefault()
  event.stopPropagation()
  event.target.submit()
  /* eslint-enable fp/no-unused-expression */
}
