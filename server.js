/* eslint-disable better/no-ifs, better/no-new, fp/no-unused-expression */
const path = require("path")
const express = require("express")
const compression = require("compression")
const {readdir} = require("fs")
const {isNil} = require("ramda")

const webpackConfig = require("../webpack/webpack.config.js")
const webpack = require("webpack")

const app = express()
app.use(compression({level: 9}))
const compiler = webpack(webpackConfig)

compiler.run((error, stats) => {
  if (error) {
    return console.error(error)
  }

  const HOST = process.env.HOST_ADDRESS
  const PORT = process.env.HOST_PORT

  const readStaticFiles = path =>
    new Promise((resolve, reject) => readdir(path, (e, files) => (e ? reject(e) : resolve(files))))

  const staticFilesPath = path.resolve(__dirname, "dist")

  return readStaticFiles(staticFilesPath)
    .then(components => {
      console.log("AVAILABLE ASSETS", components)

      app.use("/:componentName", (request, response, next) => {
        const {componentName} = request.params
        const queriedFileName = !isNil(componentName) ? componentName : "index"

        const file =
          queriedFileName.indexOf(".map") < 0
            ? components.find(fileName => new RegExp(`(${queriedFileName})\\.`, "g").exec(fileName))
            : components.find(fileName => fileName === queriedFileName)

        return file
          ? response.sendFile(path.resolve(staticFilesPath, file))
          : response.status(404).send("Resource not found.")
      })

      console.info("🔺")

      return app.listen(PORT, HOST, e => (e ? console.log(e) : void 0))
    })
    .catch(console.error)
})
