import util from 'util'
import fs from 'fs'
import YAML from 'yaml'
const file = fs.readFileSync('./verb-tree.yaml', 'utf8')
const content = YAML.parse(file)

const verbTree = []
const verbTreeShort = []
const trees = {full: verbTree, short: verbTreeShort}
Object.entries(trees).forEach((tree) => {
  Object.entries(content).forEach(entry => {
    const keys = entry[0].split("-")

    // Only include rows with a starred definition
    if (tree[0] == "short" && !entry[1].reduce((acc, meaning) => (acc || meaning.includes("*")), false)) {
      return
    }
    const innermost = keys.reduce((acc, key, index) => {
      const fullKey = keys.slice(0, index + 1).join("-")
      let child = acc.children.find(child => (child.value == fullKey))
      if (!child) {
        child = {
          value: fullKey,
          text: key,
          children: []
        }
        acc.children.push(child)
      }
      return child
    }, {children: tree[1]})
    innermost["meanings"] = entry[1].filter(meaning => (tree[0] == "full" || meaning.includes("*"))).map(meaning => ({ value: meaning }))
  })
})

const data = JSON.stringify(verbTree, null, 2)
const dataShort = JSON.stringify(verbTreeShort, null, 2)
fs.writeFileSync("public/verb-tree.json", data)
fs.writeFileSync("public/verb-tree-short.json", dataShort)
