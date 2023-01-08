<script setup>
</script>

<template>
  <v-bottom-navigation
    app
    fixed
    grow
    v-model="activeItem"
    color="primary"
  >
    <v-btn value="home" @click="restart">
      <v-icon aria-label="Home">
          mdi-home
      </v-icon>
    </v-btn>
    <v-btn :disabled="!(selectedNode && selectedNode.meanings)" value="define" @click="goDefine">
      <v-icon aria-label="Define" :color="selectedNode && selectedNode.meanings ? 'green-darken-2': null">
          mdi-format-align-left
      </v-icon>
    </v-btn>
    <v-btn value="verblist" @click="goVerblist">
      <v-icon aria-label="Verblist">
          mdi-image
      </v-icon>
    </v-btn>
    <v-btn value="listlength" @click="toggleListlength">
      <v-icon aria-label="Longlist" v-if="useShort">
          mdi-arrow-expand-all
      </v-icon>
      <v-icon aria-label="Shortlist" v-else>
          mdi-format-vertical-align-center
      </v-icon>
    </v-btn>
    <v-btn value="help" @click="goHelp">
      <v-icon aria-label="Help">
          mdi-help
      </v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>

<script>
import { computed } from "vue"
import { store } from "../store.js"

export default {
  name: 'navigation',
  data() {
    return {
      activeItem: "",
      selectedNode: computed(() => store.selectedNode),
      define: computed(() => store.define),
      help: computed(() => store.showHelp),
    }
  },
  computed: {
    useShort: () => (store.useShort)
  },
  watch: {
    selectedNode () {
      this.setActive()
    },
    define () {
      this.setActive()
    },
    help () {
      this.setActive()
    }
  },
  methods: {
    goHelp () {
      store.showHelp = true
    },
    setActive() {
      if (this.help) {
        this.activeItem = "help"
      } else if (this.showVerblist) {
        this.activeItem = "verblist"
      } else if (this.define) {
        this.activeItem = "define"
      } else if (!this.selectedNode || this.selectedNode.value == "Briathra") {
        this.activeItem = "home"
      } else {
        this.activeItem = null
      }
    },
    goVerblist () {
      this.restart()
      store.showVerblist = true
      this.setActive()
    },
    toggleListlength() {
      store.useShort = !store.useShort
      store.selectedNode = null
    },
    goDefine () {
      if (this.selectedNode && this.selectedNode.meanings) {
        store.define = (this.activeItem == "define")
      } else {
        this.setActive()
      }
    },
    restart () {
      store.selectedNode = {"value": "Briathra", "_collapsed": true}
    }
  }
}
</script>

<style>
header {
  top: 0px;
  bottom: auto;
}
</style>
