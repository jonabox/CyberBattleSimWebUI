<template>
  <div>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-for="(item, itemId) in column1"
                v-bind:key="itemId"
                :value="item"
                :label="itemId"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-for="(item, itemId) in column2"
                v-bind:key="itemId"
                :value="item"
                :label="itemId"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn class="ma-4" @click="runBenchmarks()"
          >run benchmarks</v-btn
        >
      </v-form>
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
import * as utils from "../components/utils.js";
// import D3Network from "vue-d3-network";
import axios from "axios";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: {},
  data() {
    return {
      column1: {
        env_size: 10,
        iteration_count: 1500,
        training_episode_count: 20,
        eval_episode_count: 10,
        maximum_node_count: 12,
        maximum_total_credentials: 10,
      },
      column2: {
        learner: [
          "random_run",
          "credlookup_run",
          "tabularq_run",
          "tabularq_exploit_run",
          "dql_run",
          "dql_exploit_run",
        ],
        episode_count: 10,
        iteration_count: 100,
        epsilon: 0.9,
        render: false,
        epsilon_exponential_decay: 10000,
        epsilon_minimum: 0.1,
      },
      //
      nodeStore: {},
      linkStore: {},
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
    this.getGraphData();
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
    runBenchmarks() { 
      axios
        .get("http://localhost:5000/api/run_benchmarks")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    listAllAttacks() {
      axios
        .get("http://localhost:5000/api/list_all_attacks")
        .then((response) => {
          console.log(response.data);
          this.vulnerabilities = response.data;
          // update graph
          this.nodes.splice(0); // clears content of array; splicing for reactivity
          for (let discoveredNode of response.data) {
            let nodeToUpdate = this.nodeStore[discoveredNode.id];
            if (nodeToUpdate) {
              this.$set(nodeToUpdate, status, discoveredNode.status);
              console.log(nodeToUpdate.status);
              if (discoveredNode.status == "discovered") {
                this.$set(nodeToUpdate, "_color", "#888C8B");
              }
              this.nodes.push(nodeToUpdate);
            }
          }
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    runExploit(nodeId, vulnerabilityId) {
      let formData = new FormData();
      formData.append("nodeId", nodeId);
      formData.append("vulnerabilityId", vulnerabilityId);
      axios
        .post("http://localhost:5000/api/run_attack", formData)
        .then((response) => {
          console.log(response.data);
          for (let discoveredNode of response.data.nodes) {
            //display node in graph
            let nodeToUpdate = this.nodeStore[discoveredNode];
            if (nodeToUpdate) {
              this.$set(nodeToUpdate, status, discoveredNode.status);
              if (discoveredNode.status == "discovered") {
                this.$set(nodeToUpdate, "_color", "#888C8B");
              }
              this.nodes.push(nodeToUpdate);
            }
          }
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    hideNode() {
      // Object.assign(node,{_cssClass:'hidden'})
      // this.$set(this.nodes,node.index,node)
    },

    getGraphData() {
      axios
        .get("http://localhost:5000/api/get_nodes")
        .then((response) => {
          console.log("Success!");
          let nodes = response.data;
          for (let [nodeId, node] of Object.entries(nodes)) {
            this.nodeStore[nodeId] = {
              id: nodeId,
              name: nodeId, // front-facing value
              tempName: nodeId, // temporary value to handle name changes
              serverId: nodeId, // server reference
              // TODO: add agenet installed
              services: node["services"],
              firewall: node["firewall"],
              value: node["value"],
              properties: node["properties"],
              owned_string: node["owned_string"],
              vulnerabilities: node["vulnerabilities"],
              _color: "#be385d",
              svgSym: rectSvg,
              action: "None",
              // outcome (edge) modification
              outcomesToAdd: [],
              outcomesToRemove: [],
            };

            for (let [vulnerabilityId, vulnerability] of Object.entries(
              node.vulnerabilities
            )) {
              for (let neighborId of vulnerability.outcome.nodes) {
                // concatenation of id's become key
                this.linkStore[nodeId + neighborId] = {
                  sid: nodeId,
                  tid: neighborId,
                };
              }
              this.$set(vulnerability, "id", vulnerabilityId);
              this.$set(vulnerability, "serverId", vulnerabilityId);
              this.$set(
                vulnerability.outcome,
                "nodes_copy",
                vulnerability.outcome.nodes.concat()
              );
            }
            this.lastNodeId = node;
          }
          this.listAllAttacks();
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
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
            if (this.hasFormUpdates) {
              alert("Please submit changes before reselecting.");
            } else {
              // this.selectNode(node);
            }
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
<style src="@/assets/vue-d3-network.css"/>