const Enquirer = require('enquirer')
const path = require('path')
const fs = require('fs')
const Mustache = require('mustache')

const enquirer = new Enquirer()
enquirer.register('radio', require('prompt-radio'));

const argv = process.argv.slice(2);
const template = argv[0]
const fileName = argv[1]

const templates = {
  component: {
    type: 'component',
    extension: 'jsx', 
    targetDirectory: 'components'
  }, 
  container: {
    type: 'container',
    extension: 'jsx', 
    targetDirectory: 'containers'
  },
  page: {
    type: 'page',
    extension: 'jsx', 
    targetDirectory: 'pages'
  },
  action: {
    type: 'action',
    extension: 'js', 
    targetDirectory: 'actions'
  },
  reducer: {
    type: 'reducer',
    extension: 'js', 
    targetDirectory: 'reducers'
  }
}

if (!template) { 
  const questions = [{
    name: 'template',
    type: 'radio',
    message: 'Select a template',
    default: 'component',
    choices: Object.keys(templates)
  }, {
    name: 'fileName',
    type: 'input',
    message: 'Enter name',
    default: 'index'
  }]

  enquirer.ask(questions).then(answers => {
    generator(answers.template, answers.fileName)
  })

} else {
  generator(template, fileName)
}

function generator(templateName, filename) {
  const {targetDirectory, extension} = templates[templateName]
  const templateFilePath = path.resolve(`${__dirname}/templates/${templateName}.mst`)
  const templateSource = fs.readFileSync(templateFilePath, { encoding: 'utf8' })

  const outputFilePath = path.resolve(`${__dirname}/../src/${targetDirectory}/${filename}.${extension}`)
  const template = Mustache.render(templateSource, { name: filename })
  fs.writeFileSync(outputFilePath, template)

  if (templateName === 'reducer') {
    generateRootReducer();
  }
}

function generateRootReducer() {
  const reducersDir = path.resolve(`${__dirname}/../src/reducers`)
  fs.readdir(reducersDir, (err, files) => {
    if (err) {
      throw err
    }

    let reducers = files.filter(name => {
      return name !== '.gitkeep' && name !== 'index.js'
    })

    if (reducers && reducers.length > 0) {
      reducers = reducers.map(name => {
        const cleanName = removeFileExtension(name);
        return {
          name: cleanName,
          path: `~reducers/${cleanName}`
        }
      })
    }
    const templateSource = fs.readFileSync(path.resolve(`${__dirname}/templates/rootReducer.mst`), { encoding: 'utf8' })
    const outputFilePath = path.resolve(`${__dirname}/../src/reducers/index.js`)
    
    const template = Mustache.render(templateSource, { reducers })
    fs.writeFileSync(outputFilePath, template)
  })
}

function removeFileExtension(file) {
  return file.replace(/\.[^/.]+$/, "")
}
