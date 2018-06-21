/* eslint-disable better/explicit-return, fp/no-unused-expression, fp/no-nil */
import {cond, equals, has, map, T} from "ramda"

import {check} from "ava-jsverify"
import test from "ava"
import jsc from "jsverify"
import {
  leftOrRight,
  withBody,
  withMethod,
  responseMethod,
} from "../../application/utils/http"

test(
  "leftOrRight",
  check(
    jsc.oneof([jsc.record({error: jsc.string}), jsc.record({message: jsc.string})]),
    (t, response) =>
      cond([
        [
          has("error"),
          () => {
            const wrappedResponse = leftOrRight(response)

            t.true(wrappedResponse.isLeft)
            t.is(wrappedResponse.value.error, response.error)
          },
        ],
        [
          T,
          () => {
            const wrappedResponse = leftOrRight(response)

            t.true(wrappedResponse.isRight)
            t.is(wrappedResponse.value.message, response.message)
          },
        ],
      ])(response)
  )
)

test("withBody", check(jsc.json, (t, obj) => t.deepEqual(withBody(obj), {body: obj})))
test("withMethod", check(jsc.string, (t, method) => t.deepEqual(withMethod(method), {method})))

// eslint-disable-next-line ava/no-skip-test
test.skip(
  "responseMethod",
  check(
    jsc.string,
    jsc.oneof([jsc.record({error: jsc.string}), jsc.record({message: jsc.string})]),
    (t, method, response) => {
      const httpResponse = {}
      // eslint-disable-next-line fp/no-mutation
      httpResponse[method] = () => Promise.resolve(response)

      responseMethod(method, httpResponse).fork(
        failure => {
          t.true(failure.isLeft)
          t.is(failure.value, response.error)
        },
        success => {
          t.true(success.isRight)
          t.is(success.value, response.message)
        }
      )
    }
  )
)
