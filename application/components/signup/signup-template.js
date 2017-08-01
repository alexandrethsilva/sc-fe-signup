import {h} from "skatejs"
import css from "./signup.css"

import {identity} from "ramda"

const Empty = message =>
  <div className="signup-container">
    <div className="signup-body">
      {message}
    </div>
  </div>

const Content = countries =>
  <div className="signup-container">
    <div className="signup-body">
      <form id="sc-form-signup" method="post">
        <div className="hidden ajax-spinner" />

        <input type="hidden" id="data_source" name="data_source" value="www" />
        <input type="hidden" id="invisible_captcha" name="invisible_captcha" value="false" />

        <input
          type="hidden"
          id="sc_csrf"
          name="sc_csrf"
          value="Fwa_u5zgZEJDxJAxVcoXIYNoS0cd5MPkrmBpMSWHe9Y"
        />
        <input type="hidden" id="creation_flow" name="creation_flow" />
        <input type="hidden" id="signup-pre-tick-eula" name="signup_pre_tick_eula" value="false" />

        <fieldset>
          <ul>
            <li>
              <label className="sr-only required" for="signup-email">
                E-Mail
              </label>
              <input
                type="email"
                id="signup-email"
                name="email"
                required="required"
                maxlength="100"
                placeholder="E-Mail"
              />
            </li>

            <li>
              <label className="sr-only required" for="signup-confirm-email">
                E-Mail confirmation
              </label>
              <input
                type="email"
                id="signup-confirm-email"
                name="confirm_email"
                required="required"
                maxlength="100"
                placeholder="E-Mail confirmation"
              />
            </li>
            <li>
              <label className="sr-only required" for="signup-password">
                Kennwort
              </label>
              <input
                type="password"
                id="signup-password"
                name="password"
                required="required"
                autocomplete="off"
                maxlength="100"
                placeholder="Password"
                data-rule-minlength="4"
              />
            </li>
            <li>
              <label className="sr-only required" for="signup-country">
                Country
              </label>
              <select
                id="signup-country"
                name="country_month"
                required="required"
                className="signup-country"
              >
                {" "}<option value="" disabled="disabled" selected="selected">
                  Country
                </option>{" "}
                {countries.map(({name}) =>
                  <option value={name}>
                    {name}
                  </option>
                )}
              </select>
            </li>
          </ul>
        </fieldset>
        <div>
          <p className="signup-notice">
            By clicking on register, you agree to Spotcap's terms & conditions and privacy policy
          </p>
        </div>
        <button
          id="signup-button-submit"
          className="signup-button signup-button--primary signup-button--block"
          type="button"
        >
          Register
        </button>
      </form>
    </div>
  </div>

const Signup = ({countries}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    !countries ? Empty("Preparing Signup...") : countries.bimap(Empty, Content).chain(identity),
  ])

export default Signup
