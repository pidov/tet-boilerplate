const argv = process.argv.slice(2);
const generatorName = argv[0]
const generatorArguments = argv[1]

const generator = require(`./generators/${generatorName}`)
generator(generatorArguments)