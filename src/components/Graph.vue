<template>
  <div>
    tool: {{ tool }}
    <v-spacer />
    selected: {{ selected }}
    <v-spacer />
    <v-btn color="secondary" v-on:click="tool = 'parent'"> add </v-btn>
    <v-btn color="secondary" v-on:click="tool = 'killer'"> remove </v-btn>
    <v-btn color="secondary" v-on:click="tool = 'edit'"> edit </v-btn>
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :selection="{ nodes: selected, links: linksSelected }"
      :options="options"
      @node-click="nodeClick"
      @link-click="linkClick"
    ></d3-network>
  </div>
</template>

<script>
import * as utils from './utils.js'
import D3Network from "vue-d3-network";
import scenario from "../assets/scenario_detail";
const nodeIcon1 = '<svg version="1.1"><rect width="20" height="20"/></svg>';
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      tool: "parent",
      lastNodeId : 0,
      lastLinkId : 0,
      settings : {
        maxLinks: 3,
        maxNodes: 150
      },
      showHint : true,
      toaster : null,
      svgChoice : false,
      toSvg : false,
      nodeSym : null,
      selected: {},
      showSelection: true,
      showMenu: true,
      linksSelected: {},
      // Graph Componnets
      nodes: [],
      links: [],
      options: {
        force: 1000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 2,
      },
    };
  },
  created: function () {
    this.nodes.push(
      {
        id: 1,
        name: "security requirements",
      }
      // {
      //   id: 2,
      //   name: "vulnerability details"
      // }
    );
    for (var requirement of scenario["security_requirement_details"]) {
      this.nodes.push({
        id: requirement.id,
        svgSym: nodeIcon1,
      });
      this.links.push({ sid: requirement.id, tid: 1 });
    }
  },
  methods: {
    linkCb (link) {
      link.name = 'Link ' + link.id
      return link
    },
    selection () {
      return {
        nodes: this.selected,
        links: this.linksSelected
      }
    },
    updateSelection () {
      this.showSelection = (Object.keys(this.selected).length | Object.keys(this.linksSelected).length)
    },
    removeLink (link) {
      this.unSelectLink(link.id)
      this.links.splice(link.index, 1)
    },
    rebuildLinks (nodes) {
      if (!nodes) nodes = this.nodes
      let links = utils.rebuildLinks(nodes, this.links)
      for (let link of links.removed) {
        if (this.linksSelected[link.id]) {
          delete (this.linksSelected[link.id])
        }
      }
      return links.newLinks
    },
    removeNode (nodeId) {
      utils.removeNode(nodeId, this.nodes, (nodes) => {
        if (nodes) {
          this.links = this.rebuildLinks(nodes)
          this.unSelectNode(nodeId)
          this.nodes = utils.rebuildNodes(this.links, nodes)
        }
      })
    },
    // -- Selection
    selectNode (node) {
      this.selected[node.id] = node
    },
    selectNodesLinks () {
      for (let link of this.links) {
        // node is selected
        if (this.selected[link.sid] || this.selected[link.tid]) {
          this.selectLink(link)
          // node is not selected
        } else {
          this.unSelectLink(link.id)
        }
      }
    },
    nodeClick (event, node) {
      switch (this.tool) {
        case 'killer':
          this.removeNode(node.id)
          break
        case 'parent':
          this.createParent(node)
          break
        default: // selection tool
          // is selected
          if (this.selected[node.id]) {
            this.unSelectNode(node.id)
            // is not selected
          } else {
            this.selectNode(node)
          }
          this.selectNodesLinks()
          break
      }
      this.updateSelection()
    },
    linkClick (event, link) {
      if (this.tool === 'killer') {
        this.removeLink(link)
      } else {
        if (this.linksSelected[link.id]) {
          this.unSelectLink(link.id)
        } else {
          this.selectLink(link)
        }
      }
      this.updateSelection()
    },
    createParent (node) {
      let nodeId = this.lastNodeId + 1
      let linkId = this.lastLinkId + 1
      let nNode = utils.newNode(nodeId)
      nNode.x = node.x + 50
      nNode.y = node.y + 50
      this.nodes = this.nodes.concat(nNode)
      this.lastNodeId++
      this.links = this.links.concat(utils.newLink(linkId, node.id, nodeId))
      this.lastLinkId++
    },
    selectLink (link) {
      this.$set(this.linksSelected, link.id, link)
    },
    selectionEvent (action, args) {
      utils.methodCall(this, action, args)
      this.updateSelection()
    },
    clearSelection () {
      this.selected = {}
      this.linksSelected = {}
    },
    unSelectNode (nodeId) {
      if (this.selected[nodeId]) {
        delete (this.selected[nodeId])
      }
      this.selectNodesLinks()
    },
    unSelectLink (linkId) {
      if (this.linksSelected[linkId]) {
        delete (this.linksSelected[linkId])
      }
    },
    setShowMenu (show) {
      this.showMenu = show
      this.showHint = false
    }
  }
};
</script>
<style src="@/assets/vue-d3-network.css"></style>