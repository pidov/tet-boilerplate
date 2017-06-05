const argv = process.argv.slice(2);
const generatorName = argv[0]
const generatorArguments = argv[1]

if (!generatorName) {
    console.log('Missing or invalid generator name. Valid generatorc  names are "component"')
    return
}

const generator = require(`./generators/${generatorName}`)
generator(generatorArguments)