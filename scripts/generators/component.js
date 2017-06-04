function componentGenerator(name) {
  const path = require('path')
  const fs = require('fs')
  const Mustache = require('mustache')

  const templateFilePath = path.resolve(`${__dirname}/component.mst`)
  const templateSource = fs.readFileSync(templateFilePath, { encoding: 'utf8' })
  const templateData = { name }

  const template = Mustache.render(templateSource, templateData)

  const outputFilePath = path.resolve(`${__dirname}/../../src/components/${templateData.name}.jsx`)
  fs.writeFileSync(outputFilePath, template)
}

module.exports = componentGenerator