<template>
  <div>
    <v-navigation-drawer location="bottom" temporary v-model="drawer">
        <p v-if="selectedNode && selectedNode.meanings">[ {{ selectedNode.value }} ]</p>
        <p v-else-if="selectedNode">{{ selectedNode.value }}</p>
        <v-list density="compact" nav v-if="(selectedNode && selectedNode.meanings) && !showVerblist">
          <v-list-item v-for="(meaning, ix) in selectedNode.meanings" prepend-icon="mdi-view-dashboard" :title="meaning.value" :value="meaning.value"></v-list-item>
        </v-list>
        <v-list v-else density="compact" nav>
          <v-list-item v-for="(verb, ix) in verbs" prepend-icon="mdi-view-dashboard" @click="goVerb(verb.value)" :title="verb.text" :value="verb.value"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-snackbar
        v-model="snackbar"
        height="200px"
        :timeout="timeout"
        v-if="selectedNode && selectedNode.meanings"
      >
      {{ selectedNode.meanings.map(meaning => meaning.value).join(", ") }}

        <template v-slot:actions>
          <v-btn
            color="blue"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

</template>

<script lang="js">
import { computed } from "vue";
import { store } from "../store.js"

export default {
  name: 'definition',
  data() {
    return {
      timeout: 2000,
      snackbar: false,
      define: computed(() => store.showVerbs),
      drawer: false,
      showVerblist: computed(() => store.showVerblist),
      define: computed(() => store.define),
      selectedNode: computed(() => store.selectedNode),
      verbs: computed(() => store.verbTree),
    }
  },
  watch: {
    showVerblist (value) {
      if (value) {
        this.drawer = true
      }
    },
    define (value) {
      if (value) {
        this.drawer = true
      }
    },
    drawer (value) {
      if (!value) {
        store.define = false
        store.showVerblist = false
      }
    },
    selectedNode () {
      this.snackbar = true
    }
  },
  methods: {
    goVerb (value) {
      this.drawer = false
      store.selectedNode = {"value": value}
    }
  }
}
</script>

<style>
</style>
