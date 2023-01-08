<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Help from "./components/Help.vue";
import Nav from "./components/Nav.vue";
import Definition from "./components/Definition.vue";
import { store } from "./store.js"
</script>

<template>
  <v-app>
    <Nav />
    <HelloWorld :dataset="richMediaData" />
    <Definition />
    <v-dialog v-model="help" fullscreen hide-overlay transition="dialog-bottom-transition">
      <Help/>
    </v-dialog>
  </v-app>
</template>

<script>
import { store } from "./store.js"

export default {
  name: 'app',
  mounted () {
    fetch("verb-tree.json").then(res => res.json()).then(verbTree => {
       store.verbTree = verbTree
    })
    fetch("verb-tree-short.json").then(res => res.json()).then(verbTreeShort => {
       store.verbTreeShort = verbTreeShort
    })
  },
  computed: {
    help() {
      return store.showHelp
    },
    richMediaData() {
      return {
        value: 'Briathra',
        text: 'Briathra',
        _collapsed: true,
        children: store.useShort ? store.verbTreeShort : store.verbTree
      }
    },
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.actions {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  left: 0;
  z-index: 100;
  background: white;
}
</style>
