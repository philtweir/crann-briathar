<template>
    <v-card>
      <v-toolbar>
        <v-btn icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Help</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <h3>Menu</h3>
        <v-list>
          <v-list-item>
            <v-icon aria-label="Home">
                mdi-home
            </v-icon>
            Return to top
          </v-list-item>
          <v-list-item>
            <v-icon aria-label="Define">
                mdi-format-align-left
            </v-icon>
            Display any available definitions (see below)
          </v-list-item>
          <v-list-item>
            <v-icon aria-label="Verblist">
                mdi-image
            </v-icon>
            Show list of available verbs
          </v-list-item>
          <v-list-item>
            <v-icon aria-label="Longlist">
                mdi-arrow-expand-all
            </v-icon>
            Switch to expanded definition list
          </v-list-item>
          <v-list-item>
            <v-icon aria-label="Shortlist">
                mdi-format-vertical-align-center
            </v-icon>
            Switch to trimmed definition list
          </v-list-item>
          <v-list-item>
            <v-icon aria-label="Help">
                mdi-help
            </v-icon>
            Open this help
          </v-list-item>
        </v-list>
        <v-divider/>
        <h3>Navigating</h3>
        <p>Move through the tree by tapping words.</p>
        <p>Selecting a word will make it red and show any follow-on words available below it.</p>
        <p>Tapping the word again will deselect it, hide the layer below, and select the word above it.</p>
        <p>You can view all verbs with the <v-icon aria-label="Verblist">mdi-image</v-icon> button.</p>
        <v-divider/>
        <h3>Definitions</h3>
        <p>For a given combination, possible meanings are provided and can be viewed using the <v-icon aria-label="Define">mdi-format-align-left</v-icon> button, if it is not greyed out. Many may only make sense with additional specific words/context (e.g. <strong>cuir i</strong> is used to mean "present" only in <strong>cuir i lathair</strong>).</p>
        <p>By default, for ease of navigation and app-responsiveness, we only show a handful of definitions. These are those that are (arguably) the most non-obvious even in context for an English speaker (e.g. <strong>cuir ar</strong> for "provoke"). In practice, these are mostly formulations that don't involve specific nouns/verbs that would hint at the meaning. As an example, we drop <strong>cuir faoi</strong> for "blow on" in the short list, as it only makes sense with "anáil" as "cuir anáil faoi" or similar, so is easier to infer than e.g. <strong>cuir uaibh</strong> which can stand alone. You can swap between short/full modes using the <v-icon aria-label="Longlist">mdi-arrow-expand-all</v-icon> and <v-icon aria-label="Shortlist">mdi-format-vertical-align-center</v-icon> buttons. In general, the definitions are based on those in <a href="teanglann.ie">Teanglann</a>.</p>
        <p>Even in the long list, we do not include all definitions, as there are a <em>lot</em>, and this is a learning aid, not a dictionary.</p>

      </v-card-text>
    </v-card>
</template>

<script lang="js">
import { store } from "../store.js"
export default {
  name: 'help',
  data () {
    return {
      "show": true
    }
  },
  watch: {
    show (value) {
      store.showHelp = value
    }
  }
}
</script>

<style scoped>
hr {
  padding-bottom: 10px;
  margin-top: 20px;
}
h3 {
  padding-bottom: 10px;
}
p {
  padding-bottom: 3px;
}
</style>
