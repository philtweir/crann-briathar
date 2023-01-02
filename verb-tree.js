import util from 'util'
import fs from 'fs'
import YAML from 'yaml'
const file = fs.readFileSync('./verb-tree.yaml', 'utf8')
const content = YAML.parse(file)

const verbTree = []
Object.entries(content).forEach(entry => {
  const keys = entry[0].split("-")
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
  }, {children: verbTree})
  innermost["meanings"] = entry[1].map(meaning => ({ value: meaning }))
})

const data = JSON.stringify(verbTree)
fs.writeFileSync("public/verb-tree.json", data)
