<template>
  <v-card>
    <!-- main container divides graph and node properties -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card-title> {{ tool }} mode</v-card-title>
          <v-card outlined>
            <d3-network
              :net-nodes="nodes"
              :net-links="links"
              :selection="{ nodes: selected, links: linksSelected }"
              :options="options"
              :link-cb="lcb"
              @node-click="nodeClick"
              @link-click="linkClick"
            ></d3-network>
            <v-card-actions>
              <v-btn color="secondary" v-on:click="tool = 'parent'">
                add node
              </v-btn>
              <v-btn color="secondary" v-on:click="tool = 'remove'">
                remove
              </v-btn>
              <v-btn color="secondary" v-on:click="tool = 'edit'"> edit </v-btn>
              <v-spacer></v-spacer>
              <v-switch
                color="secondary"
                v-model="options.nodeLabels"
                :label="`Show node labels: ${options.nodeLabels.toString()}`"
                @input="changeOptions(options)"
              ></v-switch>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-form v-model="valid" v-if="lastSelected">
            <v-card-title>Editing: {{ lastSelected.name }}</v-card-title>
            <v-tabs v-model="tab" background-color="transparent" grow>
              <v-tab>General</v-tab>
              <v-tab>Vulnerabilities</v-tab>
              <v-tab>Firewall Rules</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="lastSelected.name"
                        label="id"
                        :rules="[
                          (v) => !!v || 'Item is required',
                          (v) => isINodeIdUnique(v) || 'node id already in use',
                        ]"
                        @change="hasFormUpdates = false"
                        @input="(newNodeName) => handleNewNodeName(newNodeName)"
                      ></v-text-field>

                      <v-text-field
                        v-model="lastSelected.value"
                        label="value"
                        hint="Intrinsic value of the node (translates into a reward if the node gets owned)"
                        persistent-hint
                        :rules="[
                          (v) => v === 0 || !!v || 'Item is required',
                          (v) =>
                            (0 <= v && v <= 100) ||
                            'Value must range from 0 to 100',
                        ]"
                        @change="hasFormUpdates = true"
                      ></v-text-field>

                      <v-text-field
                        v-model="lastSelected.services"
                        label="services"
                        hint="List of port/protocol the node is listening to"
                        :rules="[(v) => !!v || 'Item is required']"
                        @change="hasFormUpdates = true"
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="lastSelected.properties"
                        label="properties"
                        hint="Properties of the nodes, some of which can imply further vulnerabilities"
                        :rules="[(v) => !!v || 'Item is required']"
                        @change="hasFormUpdates = true"
                        persistent-hint
                      ></v-text-field>

                      <v-text-field
                        v-model="lastSelected.owned_string"
                        label="owned string"
                        hint="String displayed when the node gets owned"
                        @change="hasFormUpdates = true"
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container>
                  <v-card-title
                    >{{ lastSelected.name }} has {{ vulnerabilityString }}
                  </v-card-title>
                  <v-select
                    v-model="selectedVulnerability"
                    label="choose a vulnerability to edit"
                    :items="Object.values(lastSelected.vulnerabilities)"
                    @change="selectedCredential = null"
                    item-text="id"
                    return-object
                  ></v-select>
                  <div v-if="selectedVulnerability">
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="selectedVulnerability.id"
                          label="id"
                          :rules="[
                            (v) => !!v || 'Item is required',
                            (v) =>
                              isVulnerabilityIdUnique(v) ||
                              'vulnerability id already in use',
                          ]"
                          @change="hasFormUpdates = true"
                        ></v-text-field>
                        <v-text-field
                          v-model="selectedVulnerability.description"
                          label="vulnerability description"
                          hint="an optional description of what the vulnerability is"
                          @change="hasFormUpdates = true"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectedVulnerability.type"
                          label="vulnerability type"
                          :items="vulnerabilityTypes"
                          :rules="[(v) => !!v || 'Item is required']"
                          @change="hasFormUpdates = true"
                        ></v-select>
                      </v-col>
                      <!-- <v-col>
                TODO: ADD SUPPORT FOR ADVANCED VULNERABILITY FEATURES
                <v-text-field
                  v-model="vulnerability[3]"
                  label="vulnerability precondition"
                  
                ></v-text-field>
                <v-text-field
                  v-model="vulnerability[4]"
                  label="vulnerability rates"
                  @change="hasFormUpdates = true"
                 
                ></v-text-field>

                <v-text-field
                  v-model="vulnerability[5]"
                  label="vulnerability URL"
                  @change="hasFormUpdates = true"
                  
                 
                ></v-text-field>

                <v-text-field
                  v-model="vulnerability[6]"
                  label="vulnerability reward string"
                  @change="hasFormUpdates = true"
                  
                 
                ></v-text-field> -->
                      <!-- </v-col> -->
                    </v-row>
                    <v-card-title>
                      {{ selectedVulnerability.id + " " + outcomeString }}
                    </v-card-title>
                    <div
                      v-if="Object.keys(selectedVulnerability.outcome).length"
                    >
                      <v-select
                        v-if="selectedVulnerability.outcome.nodes"
                        v-model="selectedVulnerability.outcome.nodes"
                        label="vulnerability outcomes"
                        hint="What nodes will be discovered if vulnerability is exploited"
                        :items="getPotentialOutcomes(lastSelected.name)"
                        @input="
                          (selection) =>
                            updateEdges(
                              selection,
                              selectedVulnerability.outcome.nodes_copy
                            )
                        "
                        @change="hasFormUpdates = true"
                        multiple
                        small-chips
                        deletable-chips
                        persistent-hint
                      ></v-select>
                      <div
                        v-else-if="selectedVulnerability.outcome.credentials"
                      >
                        <v-select
                          label="choose a credential to edit"
                          v-model="selectedCredential"
                          :items="
                            Object.values(
                              selectedVulnerability.outcome.credentials
                            )
                          "
                          item-text="credential"
                          return-object
                        ></v-select>

                        <v-row v-if="selectedCredential">
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="selectedCredential.credential"
                                  label="credential"
                                  hint="exposed credential id"
                                  @change="hasFormUpdates = true"
                                  persistent-hint
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="selectedCredential.node"
                                  label="node"
                                  hint="node id"
                                  :rules="[(v) => !!v || 'Item is required']"
                                  :items="
                                    getPotentialOutcomes(lastSelected.name)
                                  "
                                  @input="
                                    (selection) =>
                                      updateEdges(
                                        [selection],
                                        selectedCredential.node_copy
                                      )
                                  "
                                  @change="hasFormUpdates = true"
                                  persistent-hint
                                ></v-select
                              ></v-col>
                              <v-col>
                                <v-text-field
                                  v-model="selectedCredential.port"
                                  label="port"
                                  hint="A port name"
                                  :rules="[(v) => !!v || 'Item is required']"
                                  @change="hasFormUpdates = true"
                                  persistent-hint
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-btn class="my-2" @click="removeCredential()">
                                  remove credential
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-row>
                        <v-btn class="my-4 mr-2" @click="addCredential()">
                          add new credential
                        </v-btn>
                      </div>
                      <v-btn
                        v-if="selectedVulnerability"
                        class="my-2"
                        @click="removeOutcome()"
                      >
                        remove outcome
                      </v-btn>
                    </div>

                    <v-select
                      v-else
                      v-model="selectedOutcomeType"
                      label="select new outcome type"
                      :items="outcomeTypes"
                      @input="createOutcome()"
                      @change="hasFormUpdates = true"
                      persistent-hint
                    >
                    </v-select>
                  </div>
                  <v-divider class="mb-4" />
                  <v-btn class="mr-2" @click="addVulnerability()"
                    >add new vulnerability</v-btn
                  >
                  <v-btn @click="removeLastVulnerability()">
                    remove vulnerability
                  </v-btn>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container>
                  <v-row>
                    <v-col
                      v-for="(rules, groupName) in lastSelected.firewall"
                      v-bind:key="groupName"
                    >
                      <!-- capitalize first letter of group name -->
                      <v-card-title>
                        {{
                          groupName.charAt(0).toUpperCase() + groupName.slice(1)
                        }}
                        Firewall Rules:
                      </v-card-title>
                      <v-row
                        v-for="(firewall, index) in rules"
                        v-bind:key="index"
                      >
                        <v-col>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="firewall.port"
                                label="port"
                                :rules="[(v) => !!v || 'Item is required']"
                                hint="A port name"
                                persistent-hint
                                @change="hasFormUpdates = true"
                              ></v-text-field
                            ></v-col>
                            <v-col
                              ><v-select
                                v-model="firewall.permission"
                                label="permission"
                                hint="Determines if a rule is blocks or allows traffic"
                                :items="['ALLOW', 'BLOCK']"
                                :rules="[(v) => !!v || 'Item is required']"
                                @change="hasFormUpdates = true"
                                persistent-hint
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-text-field
                                v-model="firewall.reason"
                                label="reason"
                                hint="An optional reason for the block/allow rule"
                                @change="hasFormUpdates = true"
                                persistent-hint
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
            <v-btn
              :disabled="!hasFormUpdates || !valid"
              class="ma-2"
              color="success"
              @click="updateNode()"
              >submit changes</v-btn
            >
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
  </v-card>
</template>

<script>
import * as utils from "../components/utils.js";
import D3Network from "vue-d3-network";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
const defaultEdgeColor = "#888C8B";
const newEdgeColor = "#FFA500";
const selectedNodeColor = "#FFA500";
const defaultNodeColor = "#C2EDB9";
const removedEdgeColor = "#A71E36";
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      tab: null,
      //
      selectedVulnerability: null,
      selectedCredential: null,
      selectedOutcomeType: null,
      vulnerabilityTypes: ["LOCAL", "REMOTE"],
      outcomeTypes: [
        "LeakedCredentials",
        "LeakedNodesId",
        "PrivilegeEscalation",
        "AdminEscalation",
        "SystemEscalation",
        "CustomerData",
        "LateralMove",
        "ExploitFailed",
      ],
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
      hasFormUpdates: false,
      // Interface Components
      valid: false,
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
        nodeLabels: true,
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
  computed: {
    vulnerabilityString() {
      if (this.lastSelected.vulnerabilities) {
        let vulnerabilityCount = Object.keys(
          this.lastSelected.vulnerabilities
        ).length;
        if (vulnerabilityCount == 1) {
          return "1 vulnerability";
        } else {
          return vulnerabilityCount + " vulnerabilities";
        }
      } else {
        return "no vulnerabilities";
      }
    },
    outcomeString() {
      if (this.selectedVulnerability.outcome) {
        if (this.selectedVulnerability.outcome.nodes) {
          return "could leak the following nodes";
        } else if (this.selectedVulnerability.outcome.credentials) {
          let credentialCount = Object.keys(
            this.selectedVulnerability.outcome.credentials
          ).length;
          if (credentialCount == 1) {
            return "could leak 1 credential";
          } else {
            return "could leak " + credentialCount + " credentials";
          }
        } else if (this.selectedVulnerability.outcome.customer_data) {
          return "could leak customer data";
        } else {
          return "has no outcome";
        }
      } else {
        return "has no outcome";
      }
    },
  },
  methods: {
    // selection(array): nodes to be included in current graph model
    // reference(array): nodes already in graph model
    // adds and removes edges in graph to update graph model
    updateEdges(selection, reference) {
      console.log(selection);
      console.log(reference);
      let toAdd = selection.filter((x) => !reference.includes(x));
      let toRemove = reference.filter((x) => !selection.includes(x));
      for (let nodeId of toAdd) {
        // check if edge is already added
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
        this.$set(edgeToAdd, "_color", newEdgeColor);
        reference.push(nodeId);
      }
      for (let nodeId of toRemove) {
        // check if edge exists
        let edgeToRemove = this.links.find(
          (edge) => edge.sid == this.lastSelected.name && edge.tid == nodeId
        );
        if (edgeToRemove) {
          this.$set(edgeToRemove, "_color", removedEdgeColor);
          reference.splice(reference.indexOf(nodeId), 1);
        }
      }
    },
    handleNewNodeName(newName) {
      let oldName = this.lastSelected.tempName;
      for (let node of this.nodes) {
        for (let vulnerability of Object.values(node.vulnerabilities)) {
          // change name in outcome nodes
          if (vulnerability.outcome.nodes) {
            let outcomeIndex = vulnerability.outcome.nodes.indexOf(oldName);
            if (outcomeIndex != -1) {
              vulnerability.outcome.nodes.splice(outcomeIndex, 1, newName);
              //outcome index should be the same for reference
              vulnerability.outcome.nodes_copy.splice(outcomeIndex, 1, newName);
            }
          }
          // change name in outcome credentials
          if (vulnerability.outcome.credentials) {
            for (let credential of vulnerability.outcome.credentials) {
              if (credential.node == oldName) {
                credential.node = newName;
                credential.node_copy = [newName];
              }
            }
          }
        }
      }
      this.lastSelected.tempName = newName;
    },
    isINodeIdUnique(id) {
      // returns whether there is a duplicate id in nodes
      // indeces are only equal if there is at most one id
      let ids = this.nodes.map((item) => item.id);
      return ids.indexOf(id) == ids.lastIndexOf(id);
    },
    isVulnerabilityIdUnique(id) {
      // returns whether there is a duplicate id in vulnerabilities
      // indeces are only equal if there is at most one id
      let ids = Object.keys(this.lastSelected.vulnerabilities);
      return ids.indexOf(id) == ids.lastIndexOf(id);
    },
    getPotentialOutcomes(id) {
      // returns a list of potential outcome ids for a node id
      return this.nodes
        .filter((item) => item.name != id)
        .map((item) => item.name);
    },
    getGraphData() {
      axios
        .get("http://localhost:5000/api/get_nodes")
        .then((response) => {
          console.log("Success!");
          let nodes = response.data;
          for (let [nodeId, node] of Object.entries(nodes)) {
            // console.log(nodes[node]);
            this.nodes.push({
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
              _color: defaultNodeColor,
              svgSym: rectSvg,
              action: "None",
              // outcome (edge) modification
              outcomesToAdd: [],
              outcomesToRemove: [],
            });

            for (let [vulnerabilityId, vulnerability] of Object.entries(
              node.vulnerabilities
            )) {
              //check if vulnerability exposes nodes
              if (vulnerability.outcome.nodes) {
                for (let neighborId of vulnerability.outcome.nodes) {
                  this.links.push({ sid: nodeId, tid: neighborId });
                }
                // assign copy for reference
                this.$set(
                  vulnerability.outcome,
                  "nodes_copy",
                  vulnerability.outcome.nodes.concat()
                );
              }
              //check if vulnerability exposes credentials
              if (vulnerability.outcome.credentials) {
                for (let credential of vulnerability.outcome.credentials) {
                  this.links.push({ sid: nodeId, tid: credential.node });
                  // assign copy for reference (array enables compatibility with updateEdges)
                  this.$set(credential, "node_copy", [credential.node]);
                }
              }
              this.$set(vulnerability, "id", vulnerabilityId);
              this.$set(vulnerability, "serverId", vulnerabilityId);
            }
            this.lastNodeId = nodeId;
          }
          if (this.nodes.length) {
            // select the first added node
            this.selectNode(this.nodes[0]);
          }
          console.log(this.nodes);
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
          this.hasFormUpdates = false;
          console.log(response);
          this.finalizeNodeUpdate();
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    finalizeNodeUpdate() {
      //re-cache server IDs
      this.lastSelected.serverId = this.lastSelected.name;
      for (let vulnerability of Object.values(
        this.lastSelected.vulnerabilities
      )) {
        vulnerability.serverId = vulnerability.id;
      }

      // prune links that include removed nodes
      this.links = this.links.filter((link) => link._color != removedEdgeColor);
      this.links.forEach((link) => {
        if (link._color == newEdgeColor) {
          link._color = defaultEdgeColor;
        }
      });
    },

    addVulnerability() {
      let uuid = uuidv4();
      console.log(uuid);
      let newVulnerability = {
        id: uuid,
        serverId: uuid,
        description: null,
        type: null,
        outcome: {},
        precondition: "true",
        rates: [0, 0, 0],
        URL: "",
        cost: 0,
        reward_string: "",
      };
      this.$set(this.lastSelected.vulnerabilities, uuid, newVulnerability);
      this.selectedVulnerability = newVulnerability;
      this.selectedOutcomeType = null;
      this.hasFormUpdates = true;
    },
    removeLastVulnerability() {
      this.lastSelected.vulnerabilities.pop();
    },
    addCredential() {
      let uuid = uuidv4();
      let newCredential = {
        credential: uuid,
        node: null,
        node_copy: [],
        port: null,
      };
      let outcome = this.selectedVulnerability.outcome;
      // assign empty list to credentials properity if nonexistent
      console.log("outcome");
      console.log(outcome);
      console.log("outcome");
      if (!outcome.credentials) {
        this.$set(outcome, "credentials", []);
      }
      outcome.credentials.push(newCredential);
      this.selectedCredential = newCredential;
    },

    removeCredential() {
      let credentials = this.selectedVulnerability.outcome.credentials;
      let credentialToRemove = this.selectedCredential;
      credentials.splice(credentials.indexOf(credentialToRemove), 1);
      this.updateEdges([], this.selectedCredential.node_copy);
      this.selectedCredential = null;
    },

    createOutcome() {
      switch (this.selectedOutcomeType) {
        case "LeakedCredentials":
          this.addCredential();
          break;
        case "LeakedNodesId":
          this.$set(this.selectedVulnerability.outcome, "nodes", []);
          this.$set(this.selectedVulnerability.outcome, "nodes_copy", []);
          break;
        case "CustomerData":
          this.$set(this.selectedVulnerability.outcome, "customer_data", {});
          break;
        default:
          console.log(this.selectedOutcomeType + " not supported");
      }
    },

    removeOutcome() {
      if (this.selectedVulnerability.outcome.credentials) {
        for (let credential of this.selectedVulnerability.outcome.credentials) {
          this.updateEdges([], credential.node_copy);
        }
      } else if (this.selectedVulnerability.outcome.nodes) {
        this.updateEdges([], this.selectedVulnerability.outcome.nodes_copy);
      }
      // assign outcome property to empty object
      this.$set(this.selectedVulnerability, "outcome", {});
      this.selectedOutcomeType = null;
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
      if (this.lastSelected) {
        this.lastSelected._color = defaultNodeColor; // normal color
      }
      this.lastSelected = node;
      this.selectedVulnerability = null;
      this.selectedCredential = null;
      node._color = selectedNodeColor;
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
              this.selectNode(node);
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
          nNode._color = defaultNodeColor;
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
