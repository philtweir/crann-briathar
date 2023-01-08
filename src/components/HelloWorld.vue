<script setup>
import { computed } from "vue";
import * as d3 from 'd3';
import { store } from '../store.js';
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
import { ANIMATION_DURATION, DEFAULT_HEIGHT_DECREMENT, DEFAULT_LEVEL_HEIGHT, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, MATCH_SCALE_REGEX, MATCH_TRANSLATE_REGEX } from '@ssthouse/tree-chart-core/build/tree-chart/constant.js';
</script>

<template>
  <div class="container">
    <div class="infotext">
      <p>Tap a word to show follow-on words. Tap it again to move up a level.</p>
      <p class="note">github.com/philtweir/crann-briathar</p>
      <p class="note">This is a hobbyist experiment - don't trust it.</p>
    </div>
    <vue-tree
      style="width: 100vw; height: 100vh"
      :dataset="dataset"
      :config="treeConfig"
      ref="tree"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          :class="['rich-media-node', (selectedNode && node.value == selectedNode.value) ? 'selected-node' : '', (node.children && node.children.length > 0) ? '' : 'leaf-node']"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold;"
                >{{ node.text }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
function recenterOn (node, root) {
  const _this = this;
  const transform = _this.svgElement.style.transform;
  const elWidthMid = _this.svgElement.getBoundingClientRect().width / 2;
  const startX = (root ? root.x : 0) + elWidthMid;
  const startY = (root ? root.y : 0) - 20;
  var originTransform = transform.replace("translate(0px)", "translate(0px, 0px)");
  var originOffsetX = 0;
  var originOffsetY = 0;
  if (originTransform) {
      var result = originTransform.match(MATCH_TRANSLATE_REGEX);
      if (result !== null && result.length !== 0) {
          var _a = result.slice(1), offsetX = _a[0], offsetY = _a[1];
          originOffsetX = parseInt(offsetX);
          originOffsetY = parseInt(offsetY);
      }
  }
  var newX = - Math.floor((node.x - startX) / _this.currentScale)// +
      //originOffsetX;
  var newY =-  Math.floor((node.y - startY) / _this.currentScale)// +
      //originOffsetY;
  var transformStr = "translate(".concat(newX, "px, ").concat(newY, "px)");
  if (originTransform) {
      transformStr = originTransform.replace(MATCH_TRANSLATE_REGEX, transformStr);
  }
  _this.svgElement.style.transitionDuration = "1s";
  _this.domElement.style.transitionDuration = "1s";
  _this.svgElement.style.transform = transformStr;
  _this.domElement.style.transform = transformStr;
}
export default {
  name: 'treemap',
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      previousSelectedNode: null,
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 },
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    selectedNode() {
      return store.selectedNode
    }
  },
  watch: {
    dataset() {
      this.init()
    },
    selectedNode(n) {
      const tree = this.$refs.tree
      const oldSelectedNode = this.previousSelectedNode
      if (oldSelectedNode) {
        tree.setNodeCollapsed(oldSelectedNode, true)
      }
      if (n) {
        tree.setNodeCollapsed(n, false)
        setTimeout(() => {
          const node = this.$refs.tree.treeChartCore.nodeDataList.find((node) => (node.data.value == n.value))
          const root = this.$refs.tree.treeChartCore.nodeDataList[0]
          this.$refs.tree.treeChartCore.recenterOn(node, root)
        }, 500)

        this.previousSelectedNode = n.data
      } else {
        this.previousSelectedNode = null
      }
    }
  },
  methods: {
    init() {
      const tree = this.$refs.tree
      tree.treeChartCore.recenterOn = recenterOn
      tree.treeChartCore.treeContainer.ontouchstart = (ev) => {
        ev.clientX = ev.changedTouches[0].clientX
        ev.clientY = ev.changedTouches[0].clientY
        return tree.treeChartCore.treeContainer.onmousedown(ev)
      }
      tree.treeChartCore.treeContainer.ontouchmove = (ev) => {
        ev.clientX = ev.changedTouches[0].clientX
        ev.clientY = ev.changedTouches[0].clientY
        return tree.treeChartCore.treeContainer.onmousemove(ev)
      }
      tree.treeChartCore.treeContainer.ontouchend = (ev) => {
        ev.clientX = ev.changedTouches[0].clientX
        ev.clientY = ev.changedTouches[0].clientY
        return tree.treeChartCore.treeContainer.onmouseup(ev)
      }
      tree.treeChartCore.buildTree = function () {
          var treeBuilder = d3
              .tree()
              .nodeSize([this.treeConfig.nodeWidth, this.treeConfig.levelHeight])
          var tree = treeBuilder(d3.hierarchy(this.dataset, (data) => (data._collapsed ? null : data.children)))
          return [tree.descendants(), tree.links()];
      }
      tree.setNodeCollapsed = function (data, on) {
        var tree = d3.hierarchy(this.treeChartCore.dataset).descendants();
        const node = tree.find(function (d) {
            return d.data.value == data.value;
        });
        if (on) {
          node.ancestors().forEach((ancestor) => (ancestor.data._collapsed = false))
          node.data._collapsed = true
        } else {
          node.ancestors().forEach((ancestor) => (ancestor.data._collapsed = false))
          node.data._collapsed = false
          if (node.data.children) {
            node.data.children.forEach((child) => (child._collapsed = true))
          }
        }
        this.treeChartCore.draw()
        this.nodeDataList = this.treeChartCore.getNodeDataList();
      }
      tree.onClickNode = (index) => {
        const target = tree.treeChartCore.nodeDataList[index].data
        if (this.selectedNode && target.value == this.selectedNode.value) {
          var node = tree.treeChartCore.nodeDataList[index].find((node) => (node.data.value == target.value))
          if (node.parent && node.parent.data.name !== "__invisible_root") {
            this.selectNode(node.parent.data)
          }
        } else {
          this.selectNode(target)
        }
      }
    },
    selectNode(node) {
      store.selectedNode = node
    },
    begin() {
      const tree = this.$refs.tree
      let root = tree.treeChartCore.nodeDataList[0].data
      tree.setNodeCollapsed(root, true)
      root = tree.treeChartCore.nodeDataList[0]
      this.$refs.tree.treeChartCore.recenterOn(root, root)
    },
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  color: black;
  padding-top: 20px;
}

.leaf-node {
  background-color: blue;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}

.rich-media-node.selected-node {
  background-color: red
}

.infotext {
  position: absolute;
  top: 50vh;
  width: 100vw;
  word-wrap: wrap;
  font-size: 150%;
  color: rgba(50, 50, 50, 0.5);
}

.note {
  font-size: 50%;
}
</style>
