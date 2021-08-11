<template>
  <div>
    <v-btn class="ma-2" outlined href="custom.py" download>
      Generate Environment File
    </v-btn>
    <v-card-title> {{ tool }} mode </v-card-title>
    <!-- new -->
    <v-form v-if="lastSelected" ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="lastSelected.name"
              :counter="30"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field v-model="lastSelected.value" label="value" required></v-text-field>

            <v-text-field
              v-model="lastSelected.services"
              :rules="[(v) => !!v || 'Item is required']"
              label="services"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="lastSelected.firewall"
              :rules="[(v) => !!v || 'Item is required']"
              label="firewall"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastSelected.properties"
              label="properties"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastSelected.owned_string"
              label="owned string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="ma-4" @click="changeValue(lastSelected.value)">change value</v-btn>
      </v-container>
      <!-- indices: description, type, outcome, precondition, rates, URL, reward_string -->
      <v-container
        v-for="(data, vulnerability) in lastSelected.vulnerabilities"
        v-bind:key="vulnerability.id"
      >
        <v-divider />
        <v-row>
          <v-col>
            <v-text-field
              v-model="data[0]"
              label="vulnerability description"
              required
            ></v-text-field>

            <v-text-field
              v-model="data[1]"
              label="vulnerability type"
              required
            ></v-text-field>

            <v-text-field
              v-model="data[2]"
              label="vulnerability outcome"
              required
            ></v-text-field>

            <v-text-field
              v-model="data[3]"
              label="vulnerability precondition"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="data[4]"
              label="vulnerability rates"
              required
            ></v-text-field>

            <v-text-field
              v-model="data[5]"
              label="vulnerability URL"
              required
            ></v-text-field>

            <v-text-field
              v-model="data[6]"
              label="vulnerability reward string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn class="ma-4" @click="addVulnerability()">
        add new vulnerability
      </v-btn>
      <v-btn class="ma-4" @click="removeLastVulnerability()">
        remove last vulnerability
      </v-btn>
    </v-form>

    <!-- /new -->
    <v-spacer />
    <v-btn class="ma-4" color="secondary" v-on:click="tool = 'parent'">
      add IT node
    </v-btn>
    <v-btn class="ma-4" color="secondary" v-on:click="tool = 'parent ot'">
      add OT node
    </v-btn>
    <v-btn class="ma-4" color="secondary" v-on:click="tool = 'remove'">
      remove
    </v-btn>
    <v-btn class="ma-4" color="secondary" v-on:click="tool = 'edit'">
      edit
    </v-btn>
    <v-switch
      color="secondary"
      v-model="options.nodeLabels"
      :label="`Show node labels: ${options.nodeLabels.toString()}`"
      @change="changeOptions(options)"
    ></v-switch>
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :selection="{ nodes: selected, links: linksSelected }"
      :options="options"
      :link-cb= "lcb"
      @node-click="nodeClick"
      @link-click="linkClick"
    ></d3-network>
    <svg>
      <defs>
        <marker
          id="m-end"
          markerWidth="10"
          markerHeight="12"
          refX="15"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z"></path>
        </marker>
      </defs>
    </svg>
    server response:
    {{ serverNodes }}
  </div>
</template>

<script>
import * as utils from "./utils.js";
import D3Network from "vue-d3-network";
// import scenario from "../assets/scenario_detail";
import axios from "axios";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      //
      serverNodes: "empty",
      serverEdges: "empty",
      //
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
      // Graph Components
      nodes: [],
      links: [],
      options: {
        force: 1000,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
        // Interface Components
        valid: true,
        name: "",
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        email: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        select: null,

        checkbox: false,
      },
    };
  },
  created: function () {
    this.get_yaml();
    // this.nodes.push(
    //   {
    //     id: 1,
    //     name: "node 1",
    //     svgSym: rectSvg,
    //     action: "None",
    //     services: null,
    //     firewall: null,
    //     value: null,
    //     properties: null,
    //     owned_string: null,
    //     vulnerabilities: [],
    //     _color: "#c2edb9",
    //   }
    // );
    // uncomment for test data
    // for (var requirement of scenario["security_requirement_details"]) {
    //   this.nodes.push({
    //     id: requirement.id,
    //     name: null,
    //     services: null,
    //     firewall: null,
    //     value: null,
    //     properties: null,
    //     owned_string: null,
    //     vulnerabilities: [],
    //     _color: "#c2edb9",
    //     svgSym: rectSvg,
    //     action: "None",
    //   });
    //   this.lastNodeId = requirement.id;
    //   this.links.push({ sid: requirement.id, tid: 1 });
    // }
  },
  methods: {
    get_yaml() {
      axios
        .get("http://localhost:5000/api/get_nodes")
        .then((response) => {
          console.log("Success!");
          this.serverNodes = response.data;
          let nodes = this.serverNodes["data"]
          for (var node in nodes) {
            console.log(nodes[node]);
            this.nodes.push({
              id: node,
              name: null,
              // TODO: add agenet installed
              services: nodes[node]["services"],
              firewall: nodes[node]["firewall"],
              value: nodes[node]["value"],
              properties: nodes[node]["properties"],
              owned_string: nodes[node]["owned_string"],
              vulnerabilities: nodes[node]["vulnerabilities"],
              _color: "#c2edb9",
              svgSym: rectSvg,
              action: "None",
            });
            this.lastNodeId = node;
          }
          for (var edge of this.serverNodes["edges"]){
            let start = edge[0];
            let tail = edge[1];
            this.links.push({ sid: start, tid: tail });
          }
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    changeValue(newValue) {
      let data = {newValue: newValue}
      axios
        .post("http://localhost:5000/api/change_value", data)
        .then((response) => {
          console.log("Success!" + response);
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },
    addVulnerability() {
      this.lastSelected.vulnerabilities.push([0,0,0,0,0]);
    },
    removeLastVulnerability() {
      this.lastSelected.vulnerabilities.pop();
    },
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
      if(this.lastSelected){
        this.lastSelected._color = "#c2edb9"; // normal color
      }
      this.lastSelected = node;
      node._color = "#FFA500";
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
        case "parent ot":
          this.createParent(node, "normal OT");
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
            console.log(this.lastSelected)
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
          nNode._color = "#c2edb9";
          break;

        case "normal OT":
          nNode.svgSym = rectSvg;
          nNode.action = "None";
          nNode._color = "#adb3e6";
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
      nNode.name = null;
      nNode.services = null;
      nNode.firewall = null;
      nNode.value = null;
      nNode.properties = null;
      nNode.owned_string = null;
      nNode.vulnerabilities = [];
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