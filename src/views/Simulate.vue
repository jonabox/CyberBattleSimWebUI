<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card class="mb-4">
            <v-card-title v-text="'Total Reward: ' + reward" />
            <v-sparkline
              v-if="cachedRewards"
              :value="cachedRewards"
              :labels="cachedRewards"
              :label-size="labelSize"
              :auto-draw-duration="graphAnimationDuration"
              color="black"
              auto-draw
              stroke-linecap="round"
              line-width="2"
              height="50"
            />
          </v-card>
          <v-card>
            <v-card-title> Discovered Nodes </v-card-title>
            <d3-network
              :net-nodes="nodes"
              :net-links="links"
              :selection="{ nodes: selected, links: linksSelected }"
              :options="options"
              :link-cb="lcb"
              @node-click="nodeClick"
            ></d3-network>
            <v-card-actions>
              <v-switch
                color="secondary"
                v-model="options.nodeLabels"
                :label="`Show node labels: ${options.nodeLabels.toString()}`"
                @change="changeOptions(options)"
              ></v-switch>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mb-4">
            <v-card-title> Actions </v-card-title>
            <template v-if="selectedAttack">
              <v-card-actions>
                <v-select
                  v-model="selectedAttack"
                  label="choose a target node"
                  :items="Array.from(attackMap.values())"
                  item-text="id"
                  return-object
                ></v-select>
              </v-card-actions>
              <v-card-title>
                {{ selectedAttack.id + " vulnerabilities" }}
              </v-card-title>
              <v-card-subtitle>
                {{ "status: " + selectedAttack.status }}
              </v-card-subtitle>
              <v-chip
                v-for="(property, propertyIndex) in selectedAttack.properties"
                v-bind:key="propertyIndex"
                v-text="property"
                class="mx-4"
              />
              <v-list>
                <template v-if="selectedAttack.local_attacks.length">
                  <v-subheader>Local Attacks:</v-subheader>
                  <v-list-item
                    v-for="(
                      attack, attackIndex
                    ) in selectedAttack.local_attacks"
                    v-bind:key="attackIndex"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ attack }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        color="green lighten-2"
                        @click="runAttack(attack, 'local_attacks')"
                      >
                        Exploit
                        <v-icon right dark> mdi-skull-crossbones </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </template>
                <template v-if="selectedAttack.remote_attacks.length">
                  <v-subheader> Remote Attacks: </v-subheader>
                  <v-list-item
                    v-for="(
                      attack, attackIndex
                    ) in selectedAttack.remote_attacks"
                    :key="attackIndex"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ attack }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        color="green lighten-2"
                        :disabled="!selectedAttackSourceNode"
                        @click="runAttack(attack, 'remote_attacks')"
                      >
                        Exploit
                        <v-icon right dark> mdi-skull-crossbones </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-select
                      v-model="selectedAttackSourceNode"
                      label="source node for remote attack"
                      :items="Array.from(ownedNodes)"
                      return-object
                    ></v-select>
                  </v-list-item>
                </template>
              </v-list>
            </template>
          </v-card>
          <v-card max-height="40rem">
            <v-card-title> Credentials </v-card-title>
            <template v-if="gatheredCredentials.length">
              <v-simple-table>
                <template>
                  <thead>
                    <tr>
                      <th class="text-left">Node ID</th>
                      <th class="text-left">Port</th>
                      <th class="text-left">Credential</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="credential in gatheredCredentials"
                      :key="credential.credential"
                    >
                      <td>{{ credential.node }}</td>
                      <td>{{ credential.port }}</td>
                      <td>{{ credential.credential }}</td>
                      <td>
                        <v-btn
                          color="green lighten-2"
                          small
                          :disabled="!selectedInfectSourceNode"
                          @click="connectAndInfect(credential)"
                        >
                          connect
                          <v-icon right dark> mdi-lock-open </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions>
                <v-select
                  v-model="selectedInfectSourceNode"
                  label="source node for connection"
                  :items="Array.from(ownedNodes)"
                  return-object
                ></v-select>
              </v-card-actions>
            </template>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="overflow-y-auto" max-height="50rem">
            <v-card-title> Logs </v-card-title>
            <v-list two-line v-if="logs.length">
              <div v-for="log in logs" v-bind:key="log.time">
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    {{ log.level + ": " + log.message }}
                    <v-list-item-subtitle
                      v-text="new Date(log.time * 1000)"
                      style="white-space: normal"
                    />
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
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
import D3Network from "vue-d3-network";
import axios from "axios";
const secondsToMilliseconds = 1000; // seconds to milliseconds
const graphAnimationDuration = 1000; // in milliseconds
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
const discoveredNodeColor = "#2C9E43";
const ownedNodeColor = "#BE385D";
const initialLabelSize = 7;
const labelReductionRate = 14;

export default {
  components: {
    D3Network,
  },
  data() {
    return {
      //
      selectedAttack: null,
      selectedAttackSourceNode: null,
      selectedInfectSourceNode: null,
      //
      reward: 0,
      cachedRewards: null,
      logs: [],
      //
      attackMap: new Map(),
      nodeMap: new Map(),
      edgeSet: new Set(),
      ownedNodes: new Set(),
      discoveredNodes: new Set(),
      gatheredCredentials: [],
      //
      vulnerabilityTypes: ["LOCAL", "REMOTE"],
      //
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
      showSelection: true,
      showMenu: true,
      linksSelected: {},
      // Graph Components
      nodes: [],
      links: [],
      options: {
        force: 2000,
        nodeSize: 25,
        nodeLabels: true,
        linkWidth: 2,
        resizeListener: true,
        select: null,
      },
      // constants
      secondsToMilliseconds: secondsToMilliseconds,
      graphAnimationDuration: graphAnimationDuration,
    };
  },
  created: function () {
    this.getGraphData();
    this.listAllAttacks();
    this.getTotalReward();
    this.getCredentials();
  },
  computed: {
    labelSize() {
      return (
        initialLabelSize -
        Math.floor(this.cachedRewards.length / labelReductionRate)
      );
    },
  },
  methods: {
    getGraphData() {
      axios
        .get("/api/get_nodes")
        .then((response) => {
          console.log("Success!");
          let nodes = response.data;
          for (let [nodeId, node] of Object.entries(nodes)) {
            this.nodeMap.set(nodeId, {
              id: nodeId,
              name: nodeId, // front-facing value
              services: node["services"],
              firewall: node["firewall"],
              value: node["value"],
              properties: node["properties"],
              owned_string: node["owned_string"],
              vulnerabilities: node["vulnerabilities"],
              _color: ownedNodeColor,
              svgSym: rectSvg,
              action: "None",
              // outcome (edge) modification
              outcomesToAdd: [],
              outcomesToRemove: [],
            });
            for (let [vulnerabilityId, vulnerability] of Object.entries(
              node.vulnerabilities
            )) {
              if (vulnerability.outcome.nodes) {
                for (let neighborId of vulnerability.outcome.nodes) {
                  this.edgeSet.add({
                    sid: nodeId,
                    tid: neighborId,
                  });
                }
              }
              if (vulnerability.outcome.credentials) {
                for (let credential of vulnerability.outcome.credentials) {
                  let neighborId = credential.node;
                  this.edgeSet.add({
                    sid: nodeId,
                    tid: neighborId,
                  });
                }
              }
              this.$set(vulnerability, "id", vulnerabilityId);
              this.$set(vulnerability, "serverId", vulnerabilityId);
            }
          }
          // finally update graph
          this.updateGraph();
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },
    updateGraph() {
      axios
        .get("/api/list_nodes")
        .then((response) => {
          // render nodes
          for (let node of response.data.result) {
            let nodeToUpdate = this.nodeMap.get(node.id);
            if (nodeToUpdate) {
              this.$set(nodeToUpdate, status, node.status);
              if (node.status == "discovered") {
                this.$set(nodeToUpdate, "_color", discoveredNodeColor);
              } else if (node.status == "owned") {
                this.ownedNodes.add(node.id);
              }
              if (!this.discoveredNodes.has(node.id)) {
                this.nodes.push(nodeToUpdate);
                this.discoveredNodes.add(node.id);
              }
            }
          }
          // render edges
          for (let edge of this.edgeSet) {
            let { sid: startId, tid: endId } = edge;
            if (
              this.discoveredNodes.has(startId) &&
              this.discoveredNodes.has(endId)
            ) {
              this.links.push(edge);
            }
          }
          this.logs = response.data.logs;
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    listAllAttacks() {
      axios
        .get("/api/list_all_attacks")
        .then((response) => {
          console.log(response.data);
          response.data.result.forEach((node) => {
            this.attackMap.set(node.id, node);
          });
          this.logs = response.data.logs;
          // select an attack if one has not been selected
          if (!this.selectedAttack && response.data.result.length) {
            this.selectedAttack = response.data.result[0];
          }
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    getTotalReward() {
      axios
        .get("/api/total_reward")
        .then((response) => {
          this.reward = response.data.result;
          this.logs = response.data.logs;
          this.cachedRewards = response.data.cachedRewards;
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    getCredentials() {
      axios
        .get("/api/credentials_gathered_so_far")
        .then((response) => {
          this.gatheredCredentials = response.data.result;
          this.logs = response.data.logs;
          this.cachedRewards = response.data.cachedRewards;
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    runAttack(vulnerabilityId, attackType) {
      let formData = new FormData();
      formData.append("targetNodeId", this.selectedAttack.id);
      formData.append("sourceNodeId", this.selectedAttackSourceNode);
      formData.append("vulnerabilityId", vulnerabilityId);
      let url =
        attackType == "local_attacks"
          ? "/api/run_attack"
          : "/api/run_remote_attack";

      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          this.logs = response.data.logs;
          // update graph
          this.updateGraph();
          // list possibly new attacks
          this.listAllAttacks();
          // update reward
          this.getTotalReward();
          // get credentials
          this.getCredentials();
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    connectAndInfect(credential) {
      let formData = new FormData();
      formData.append("targetNodeId", credential.node);
      formData.append("sourceNodeId", this.selectedInfectSourceNode);
      formData.append("credentialId", credential.credential);
      formData.append("port", credential.port);
      axios
        .post("/api/connect_and_infect", formData)
        .then((response) => {
          console.log(response.data);
          this.logs = response.data.logs;
          // update graph
          this.updateGraph();
          // list possibly new attacks
          this.listAllAttacks();
          // update reward
          this.getTotalReward();
          // get credentials
          this.getCredentials();
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
    },

    nodeClick(event, node) {
      this.selectedAttack = this.attackMap.get(node.id);
    },

    linkCb(link) {
      link.name = "Link " + link.id;
      return link;
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