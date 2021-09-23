<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <!-- node editing options -->
          <v-btn class="ma-4" color="secondary" v-on:click="tool = 'parent'">
            add node
          </v-btn>
          <v-btn class="ma-4" color="secondary" v-on:click="tool = 'remove'">
            remove
          </v-btn>
          <v-btn class="ma-4" color="secondary" v-on:click="tool = 'edit'">
            edit
          </v-btn>
          <v-card-title> {{ tool }} mode </v-card-title>
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
            :link-cb="lcb"
            @node-click="nodeClick"
            @link-click="linkClick"
          ></d3-network>
        </v-col>
        <v-col>
          <v-form
            v-if="lastSelected"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container>
              <v-card-title>Editing Node: {{ lastSelected.name }}</v-card-title>
              <!-- {{ this.nodes.map(function(item) {return item.id;})}}
        {{this.isINodeIdUnique(lastSelected.name)}} -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="lastSelected.name"
                    label="id"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => isINodeIdUnique(v) || 'node id already in use',
                    ]"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="lastSelected.value"
                    label="value"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) =>
                        (0 <= v && v <= 100) ||
                        'Value must range from 0 to 100',
                    ]"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="lastSelected.services"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="services"
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
                    :rules="[(v) => !!v || 'Item is required']"
                    label="properties"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="lastSelected.owned_string"
                    label="owned string"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <!-- indices: description, type, outcome, precondition, rates, URL, reward_string -->
            <v-container
              v-for="(vulnerability, serverId) in lastSelected.vulnerabilities"
              v-bind:key="serverId"
            >
              <v-divider />
              <v-card-title> Vulnerability: {{ vulnerability.id }} </v-card-title>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="vulnerability.id"
                    label="id"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => isVulnerabilityIdUnique(v) || 'vulnerability id already in use',
                    ]"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="vulnerability.description"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="vulnerability description"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="vulnerability.type"
                    :items="vulnerabilityTypes"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="vulnerability type"
                    required
                  ></v-select>
                  <v-select
                    v-model="vulnerability.outcome.nodes"
                    :items="getPotentialOutcomes(lastSelected.name)"
                    :rules="[(v) => !!v || 'Item is required']"
                    :menu-props="{ maxHeight: '400' }"
                    @input="
                      (selection) =>
                        updateEdges(selection, vulnerability.outcome.nodes_copy)
                    "
                    label="vulnerability outcomes"
                    multiple
                    small-chips
                    deletable-chips
                    hint="What nodes will be discovered if vulnerability is exploited"
                    persistent-hint
                    dense
                    required
                  ></v-select>
                </v-col>
                <!-- <v-col>
            TODO: ADD SUPPORT FOR ADVANCED VULNERABILITY FEATURES
            <v-text-field
              v-model="vulnerability[3]"
              label="vulnerability precondition"
              required
            ></v-text-field>
            <v-text-field
              v-model="vulnerability[4]"
              label="vulnerability rates"
              required
            ></v-text-field>

            <v-text-field
              v-model="vulnerability[5]"
              label="vulnerability URL"
              required
            ></v-text-field>

            <v-text-field
              v-model="vulnerability[6]"
              label="vulnerability reward string"
              required
            ></v-text-field> -->
                <!-- </v-col> -->
              </v-row>
            </v-container>
            <v-btn class="ma-4" @click="updateNode()">submit changes</v-btn>
            <v-btn class="ma-4" @click="addVulnerability()"
              >add new vulnerability</v-btn
            >
            <v-btn class="ma-4" @click="removeLastVulnerability()">
              remove last vulnerability
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
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
      vulnerabilityTypes: ["LOCAL", "REMOTE"],
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
      // Interface Components
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      // Graph Components
      nodes: [],
      links: [],
      options: {
        force: 1000,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
        resizeListener: false,
        select: null,

        checkbox: false,
      },
    };
  },
  created: function () {
    this.getNodeData();
  },
  methods: {
    updateEdges(selection, reference) {
      let toAdd = selection.filter((x) => !reference.includes(x));
      let toRemove = reference.filter((x) => !selection.includes(x));
      for (let nodeId of toAdd) {
        // check if edge is not already added
        let edgeToAdd = this.links.find(
          (edge) => edge.sid == this.lastSelected.name && edge.tid == nodeId
        );
        // if not, create new edge and add it to graph
        if (!edgeToAdd) {
          edgeToAdd = {
            sid: this.lastSelected.name,
            tid: nodeId,
          };
          this.links.push(edgeToAdd);
        }
        this.$set(edgeToAdd, "_color", "#FFA500");
        reference.push(nodeId);
      }
      for (let nodeId of toRemove) {
        // check if edge exists
        let edgeToRemove = this.links.find(
          (edge) => edge.sid == this.lastSelected.name && edge.tid == nodeId
        );
        if (edgeToRemove) {
          this.$set(edgeToRemove, "_color", "#A71E36");
          reference.splice(reference.indexOf(nodeId), 1);
        }
      }
    },
    isINodeIdUnique(id) {
      // returns whether there is a duplicate id in nodes
      // indeces are only equal if there is at most one id
      let ids = this.nodes.map((item) => item.id);
      return ids.indexOf(id) == ids.lastIndexOf(id);
    },
    isVulnerabilityIdUnique(id) {
      // returns whether there is a duplicate id in nodes
      // indeces are only equal if there is at most one id
      let ids = this.lastSelected.map((item) => item.id);
      return ids.indexOf(id) == ids.lastIndexOf(id);
    },
    getPotentialOutcomes(id) {
      // returns a list of potential outcome ids for a node id
      return this.nodes.filter((item) => item.id != id).map((item) => item.id);
    },
    getNodeData() {
      axios
        .get("http://localhost:5000/api/get_nodes")
        .then((response) => {
          console.log("Success!");
          let nodes = response.data;
          for (let [nodeId, node] of Object.entries(nodes)) {
            // console.log(nodes[node]);
            this.nodes.push({
              name: nodeId,
              serverId: nodeId,
              // TODO: add agenet installed
              services: node["services"],
              firewall: node["firewall"],
              value: node["value"],
              properties: node["properties"],
              owned_string: node["owned_string"],
              vulnerabilities: node["vulnerabilities"],
              _color: "#c2edb9",
              svgSym: rectSvg,
              action: "None",
              // outcome (edge) modification
              outcomesToAdd: [],
              outcomesToRemove: [],
            });

            for (let [vulnerabilityId, vulnerability] of Object.entries(
              node.vulnerabilities
            )) {
              for (let neighborId of vulnerability.outcome.nodes) {
                this.links.push({ sid: nodeId, tid: neighborId });
              }
              this.$set(vulnerability, "id", vulnerabilityId);
            }
            this.lastNodeId = node;
          }
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    updateNode() {
      let formData = new FormData();
      let jsonData = JSON.stringify(this.lastSelected);
      formData.append("updatedNode", jsonData);
      axios
        .post("http://localhost:5000/api/change_value", formData)
        .then((response) => {
          console.log(response);
          this.finalizeNodeUpdate(response);
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    finalizeNodeUpdate(serverResponse) {
      this.lastSelected.serverId = this.lastSelected.name; //re-cache server id
      // update removed and added nodes to default color
      for (let addedNodeId of serverResponse.data.nodesAdded) {
        let edgeToAdd = this.links.find(
          (edge) => edge.sid == this.lastSelected.name && edge.tid == addedNodeId
        );
        this.$set(edgeToAdd, "_color", "#888C8b");
      }

      let nodesRemoved = serverResponse.data.nodesRemoved;
      this.links = this.links.filter(
        (link) =>
          link.sid != this.lastSelected.name || !nodesRemoved.includes(link.tid)
      );
    },
    addVulnerability() {
      this.lastSelected.vulnerabilities.push([0, 0, 0, 0, 0]);
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
      if (this.lastSelected) {
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
          nNode._color = "#c2edb9";
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