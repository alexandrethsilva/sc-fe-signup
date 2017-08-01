/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */

// IMPORTANT NOTE
// For now, the best option is to not import the web-components polyfill here, but from the UNPKG.
// There are some reasons, such as component size and other issues with the polyfill crashing everything
// in case it's run more than once.
// Therefore, commenting
// import "@skatejs/web-components/es/native-shim"

import {createStore} from "redux"
import {Component} from "skatejs"

import {dispatchAction} from "utils/store"
import {noop} from "utils"
import {logError, installCE} from "utils/browser"

import {loadSignupCountries} from "./signup-api"
import Signup from "./signup-template"
import SignupStore from "./signup-store"

// +++ COMPONENT +++//
class SignupComponent extends Component {
  static get is() {
    return "sc-signup"
  }
  static get props() {
    return {
      _csrf: {attribute: true},
      countries: {attribute: false},
    }
  }

  constructor() {
    super()

    this.store = createStore(SignupStore(this))
    this.dispatchSignupCountriesLoad = dispatchAction(this.store, "SIGNUP_LOAD_COUNTRIES")
  }

  // eslint-disable-next-line fp/no-nil
  connectedCallback() {
    super.connectedCallback()
    loadSignupCountries().fork(logError, this.dispatchSignupCountriesLoad)
  }

  renderCallback() {
    return Signup(this)
  }
}

installCE(window.customElements, SignupComponent).then(noop, noop)
