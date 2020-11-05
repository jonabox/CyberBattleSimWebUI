<template>
  <div>
    <v-card-title> {{ tool }} mode </v-card-title>

    <v-spacer />
    <v-container fluid>
      <v-row>
        <v-col>
          <v-btn color="secondary" v-on:click="tool = 'parent'"> add </v-btn>
        </v-col>
        <v-col>
          <v-btn color="secondary" v-on:click="tool = 'and'"> and </v-btn>
        </v-col>
        <v-col>
          <v-btn color="secondary" v-on:click="tool = 'or'"> or </v-btn>
        </v-col>
        <v-col>
          <v-btn color="secondary" v-on:click="tool = 'remove'"> remove </v-btn>
        </v-col>
        <v-col>
          <v-btn color="secondary" v-on:click="tool = 'edit'"> edit </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-switch
      color="secondary"
      v-model="options.nodeLabels"
      :label="`Show node labels: ${options.nodeLabels.toString()}`"
      @change="changeOptions(options)"
    ></v-switch>
    <v-simple-table v-if="lastSelected">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ lastSelected.id }}</td>
            <td>
              <v-text-field
                v-model="lastSelected.action"
                clearable
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-spacer />
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :selection="{ nodes: selected, links: linksSelected }"
      :options="options"
      :link-cb="lcb"
      @node-click="nodeClick"
      @link-click="linkClick"
    ></d3-network>
    <svg>
      <defs>
        <marker
          id="m-end"
          markerWidth="10"
          markerHeight="12"
          refX="10"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z"></path>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
import * as utils from "./utils.js";
import D3Network from "vue-d3-network";
import scenario from "../assets/scenario_detail";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      tool: "edit",
      lastNodeId: 0,
      lastLinkId: 0,
      settings: {
        maxLinks: 3,
        maxNodes: 150,
      },
      showHint: true,
      toaster: null,
      svgChoice: false,
      toSvg: false,
      nodeSym: null,
      selected: {},
      lastSelected: null,
      showSelection: true,
      showMenu: true,
      linksSelected: {},
      // Graph Componnets
      nodes: [],
      links: [],
      options: {
        force: 1000,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
      },
    };
  },
  created: function () {
    this.nodes.push(
      {
        id: 1,
        name: "security requirements",
        svgSym: rectSvg,
        action: "None",
      }
      // {
      //   id: 2,
      //   name: "vulnerability details"
      // }
    );
    for (var requirement of scenario["security_requirement_details"]) {
      this.nodes.push({
        id: requirement.id,
        svgSym: rectSvg,
        action: "None",
      });
      this.lastNodeId = requirement.id;
      this.links.push({ sid: requirement.id, tid: 1 });
    }
  },
  methods: {
    linkCb(link) {
      link.name = "Link " + link.id;
      return link;
    },
    selection() {
      return {
        nodes: this.selected,
        links: this.linksSelected,
      };
    },
    updateSelection() {
      this.showSelection =
        Object.keys(this.selected).length |
        Object.keys(this.linksSelected).length;
    },
    removeLink(link) {
      this.unSelectLink(link.id);
      this.links.splice(link.index, 1);
    },
    rebuildLinks(nodes) {
      if (!nodes) nodes = this.nodes;
      let links = utils.rebuildLinks(nodes, this.links);
      for (let link of links.removed) {
        if (this.linksSelected[link.id]) {
          delete this.linksSelected[link.id];
        }
      }
      return links.newLinks;
    },
    removeNode(nodeId) {
      utils.removeNode(nodeId, this.nodes, (nodes) => {
        if (nodes) {
          this.links = this.rebuildLinks(nodes);
          this.unSelectNode(nodeId);
          this.nodes = utils.rebuildNodes(this.links, nodes);
        }
      });
    },
    // -- Selection
    selectNode(node) {
      // this.selected[node.id] = node
      this.lastSelected = node;
    },
    selectNodesLinks() {
      for (let link of this.links) {
        // node is selected
        if (this.selected[link.sid] || this.selected[link.tid]) {
          // this.selectLink(link)
          // node is not selected
        } else {
          this.unSelectLink(link.id);
        }
      }
    },
    nodeClick(event, node) {
      switch (this.tool) {
        case "remove":
          this.removeNode(node.id);
          break;
        case "parent":
          this.createParent(node, "normal");
          break;
        case "and":
          this.createParent(node, "and");
          break;
        case "or":
          this.createParent(node, "or");
          break;
        default:
          // selection tool
          // is selected
          if (this.selected[node.id]) {
            this.unSelectNode(node.id);
            // is not selected
          } else {
            this.selectNode(node);
          }
          this.selectNodesLinks();
          break;
      }
      this.updateSelection();
    },
    linkClick(event, link) {
      if (this.tool === "remove") {
        this.removeLink(link);
      } else {
        if (this.linksSelected[link.id]) {
          this.unSelectLink(link.id);
        } else {
          this.selectLink(link);
        }
      }
      this.updateSelection();
    },
    createParent(node, mode) {
      let nodeId = this.lastNodeId + 1;
      let linkId = this.lastLinkId + 1;
      let nNode = utils.newNode(nodeId);
      nNode.x = node.x + 50;
      nNode.y = node.y + 50;
      switch (mode) {
        case "normal":
          nNode.svgSym = rectSvg;
          nNode.action = "None";
          break;
        case "and":
          nNode.action = "And";
          nNode.name = "AND " + nNode.id;
          nNode._color = "#add8e6";
          break;
        case "or":
          nNode.action = "Or";
          nNode.name = "OR " + nNode.id;
          nNode._color = "#fed8b1";
          break;
        default:
          nNode.svgSym = rectSvg;
      }

      this.nodes = this.nodes.concat(nNode);
      this.lastNodeId++;
      this.links = this.links.concat(utils.newLink(linkId, node.id, nodeId));
      this.lastLinkId++;
    },
    selectLink(link) {
      this.$set(this.linksSelected, link.id, link);
    },
    selectionEvent(action, args) {
      utils.methodCall(this, action, args);
      this.updateSelection();
    },
    clearSelection() {
      this.selected = {};
      this.linksSelected = {};
    },
    unSelectNode(nodeId) {
      if (this.selected[nodeId]) {
        delete this.selected[nodeId];
      }
      this.selectNodesLinks();
    },
    unSelectLink(linkId) {
      if (this.linksSelected[linkId]) {
        delete this.linksSelected[linkId];
      }
    },
    setShowMenu(show) {
      this.showMenu = show;
      this.showHint = false;
    },
    changeOptions(options) {
      this.options = Object.assign({}, options);
    },
    lcb(link) {
      link._svgAttrs = { "marker-end": "url(#m-end)" };
      return link;
    },
  },
};
</script>
<style src="@/assets/vue-d3-network.css">
#m-end path,
#m-start {
  fill: #888c8b;
}
</style>