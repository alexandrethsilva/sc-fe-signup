/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */

// IMPORTANT NOTE
// For now, the best option is to not import the web-components polyfill here, but from the UNPKG.
// There are some reasons, such as component size and other issues with the polyfill crashing everything
// in case it's run more than once.
// Therefore, commenting
// import "@skatejs/web-components/es/native-shim"

import {createStore} from "redux"
import {Component, emit} from "skatejs"

import {noop} from "utils"
import {logError, installCE} from "utils/browser"
import {dispatchAction} from "utils/store"

import {loadSignupCountries, submitSignup} from "./signup-api"
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
      processing: {attribute: false, default: false},
      redirect: {attribute: true},
    }
  }

  // eslint-disable-next-line fp/no-nil
  constructor() {
    super()
    this.store = createStore(SignupStore(this))
    this.dispatchSignupCountriesLoad = dispatchAction(this.store, "SIGNUP_LOAD_COUNTRIES")

    // eslint-disable-next-line fp/no-nil
    // this.handleClick = () => {
    //   emit(this, "sc-signup-clicked", {
    //     detail: {
    //       data: "my-data",
    //     },
    //   })
    // }

    // eslint-disable-next-line fp/no-nil
    this.handleSubmit = event => {
      event.preventDefault()
      event.stopPropagation()

      emit(this, "sc-signup-submitted", {
        detail: {
          data: "my-data",
        },
      })

      // dispatchAction(this.store, "SIGNUP_SUBMIT_REQUEST", {})

      return submitSignup(event)
    }
  }

  // eslint-disable-next-line fp/no-nil
  connectedCallback() {
    super.connectedCallback()

    loadSignupCountries().fork(logError, this.dispatchSignupCountriesLoad)

    // Observable.fromEvent(document, "sc-signup-reverse").subscribe(event => {
    //   console.info("FROM OUTSIDE")
    //   console.log(event)
    // })
  }

  // eslint-disable-next-line fp/no-nil
  disconnectedCallback() {
    super.disconnectedCallback()

    // Observable.fromEvent(document, "sc-signup-reverse").unsubscribe()
  }

  renderCallback() {
    return Signup(this)
  }
}

installCE(window.customElements, SignupComponent).then(noop, noop)
