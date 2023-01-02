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
    <v-btn value="define" @click="goDefine" :variant="selectedNode && selectedNode.meanings ? 'tonal' : 'elevated'">
      <v-icon aria-label="Define" :color="selectedNode && selectedNode.meanings ? 'green-darken-2': null">
          mdi-help
      </v-icon>
    </v-btn>
    <v-btn value="verblist" @click="goVerblist">
      <v-icon aria-label="Verblist">
          mdi-image
      </v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>

<script lang="js">
import { computed } from "vue";
import { store } from "../store.js"

export default {
  name: 'navigation',
  data() {
    return {
      activeItem: "",
      selectedNode: computed(() => store.selectedNode),
      define: computed(() => store.define)
    }
  },
  watch: {
    selectedNode () {
      this.setActive()
    },
    define () {
      this.setActive()
    }
  },
  methods: {
    setActive() {
      if (this.showVerblist) {
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
    goDefine () {
      if (this.selectedNode && this.selectedNode.meanings) {
        store.define = (this.activeItem == "define")
      } else {
        this.setActive()
      }
    },
    restart () {
      store.selectedNode = {"value": "Briathra"}
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
