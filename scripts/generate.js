const Enquirer = require('enquirer')
const path = require('path')
const fs = require('fs')
const Mustache = require('mustache')

const enquirer = new Enquirer()
enquirer.register('radio', require('prompt-radio'));

const argv = process.argv.slice(2);
const template = argv[0]
const name = argv[1]

if (!template) {
  const questions = [{
    name: 'template',
    type: 'radio',
    message: 'Select a template',
    default: 'component',
    choices: ['component', 'container', 'page']
  }, {
    name: 'name',
    type: 'input',
    message: 'Enter name',
    default: 'Index'
  }]

  enquirer.ask(questions).then(answers => {
    generator(answers.template, answers.name)
  })

} else {
  generator(template, name)
}

function generator(templateName, name) {
  const templateFilePath = path.resolve(`${__dirname}/templates/${templateName}.mst`)
  const templateSource = fs.readFileSync(templateFilePath, { encoding: 'utf8' })
  const templateData = { name }

  const template = Mustache.render(templateSource, templateData)
  const outputFilePath = path.resolve(`${__dirname}/../src/${templateName}s/${templateData.name}.jsx`)
  fs.writeFileSync(outputFilePath, template)
}
