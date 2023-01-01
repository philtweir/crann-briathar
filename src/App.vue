<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Nav from "./components/Nav.vue";
import Definition from "./components/Definition.vue";
</script>

<template>
  <v-app>
    <Nav />
    <HelloWorld />
    <Definition />
  </v-app>
</template>

<script>
export default {
  name: 'app',
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
