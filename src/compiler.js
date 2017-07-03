const {lexer, parser} = require('football-query-compiler')
const humanReadableTransformer = require('football-query-compiler/src/code-transformers/human-readable/transformer')
const humanReadableGenerator = require('football-query-compiler/src/code-transformers/human-readable/generator')

class Compiler {

  constructor() {
    this.subscriptions = {

    }
  }

  on(event, callback) {
    if (this.subscriptions[event] == null) {
      this.subscriptions[event] = []
    }

    this.subscriptions[event].push(callback)
  }

  emit(event, obj) {
    const subs = this.subscriptions[event]

    if (subs != null) {
      subs.forEach(sub => sub(obj))
    }
  }

  compile(query) {
    try {
      const tokens = lexer(query)
      this.emit('tokens', tokens)

      const ast = parser(tokens)
      this.emit('ast', ast)

      //transformer
      const transformed = humanReadableTransformer(ast)

      //generator
      const generatedQuery = humanReadableGenerator(transformed, str => `<p>${str}</p>`)
      this.emit('compiled', generatedQuery)
    }
    catch (e) {
      this.emit('error', e)
    }
  }
}

module.exports = Compiler