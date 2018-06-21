import {API_ENDPOINT_SIGNUP} from "constants"
import {curry, not} from "ramda"
import {h} from "skatejs"
import css from "./signup.css"

const Empty = message =>
  <div className="signup-container">
    <div className="signup-body">
      {message}
    </div>
  </div>

const Content = curry((handleSubmit, processing, redirect, countries) =>
  <div className="signup-container">
    <div className="signup-body">
      <form
        id="sc-form-signup"
        method="post"
        onSubmit={handleSubmit}
        enctype="application/json"
        action={
          redirect ? `${API_ENDPOINT_SIGNUP}/login?redirect=${redirect}` : API_ENDPOINT_SIGNUP
        }
      >
        <input type="hidden" id="applicationType" name="applicationType" value="standard" />
        <input type="checkbox" id="tncAccepted" name="tncAccepted" checked style="display:none" />

        <input
          type="hidden"
          id="sc_csrf"
          name="sc_csrf"
          value="Fwa_u5zgZEJDxJAxVcoXIYNoS0cd5MPkrmBpMSWHe9Y"
        />

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
              <select id="country" name="country" required="required" className="signup-country">
                {" "}<option value="" disabled selected>
                  Country
                </option>{" "}
                {countries.map(({name, alpha2Code: code}) =>
                  <option value={code.toLowerCase()}>
                    {name}
                  </option>
                )}
              </select>
            </li>
            <li className="signup-highlight">
              <input
                type="checkbox"
                id="shouldSignupNewsLetter"
                name="shouldSignupNewsLetter"
                checked
              />
              <label className="required" for="shouldSignupNewsLetter">
                Would you like to register for our newsletters?
              </label>
            </li>
          </ul>
        </fieldset>
        <div>
          <p className="signup-notice">
            By clicking on register, you agree to the terms & conditions and privacy policy
          </p>
        </div>
        <button
          id="signup-button-submit"
          className="signup-button signup-button--primary signup-button--block"
          disabled={processing}
        >
          Register
        </button>
      </form>
    </div>
  </div>
)

const Signup = ({handleSubmit, processing, redirect, countries}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    not(countries)
      ? Empty("Preparing Signup...")
      : countries.either(Empty, Content(handleSubmit, processing, redirect)),
  ])

export default Signup
