<template>
  <div class="about">
    <v-container fluid>
      <!-- Failure Domains -->
      <v-row>
        <v-card min-width="100%" class="mb-4 pa-2">
          <v-card-actions>
            <v-card-title>Failure Domains</v-card-title>
            <v-spacer></v-spacer>
            <v-btn
              @click.stop="isAddDialogOpen = true"
              elevation="2"
              small
              color="secondary"
            >
              Add Scenarios
              <v-icon right small dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-container>
            <v-row justify="start" align="start">
              <v-btn
                class="ma-1"
                outlined
                v-for="domain in domains"
                v-on:click="selected = domain"
                :key="domain.id"
                >{{ domain }}</v-btn
              >
            </v-row>
          </v-container>
        </v-card>
      </v-row>
      <!-- Search Bar -->
      <!-- <v-row>
          <v-card min-width="100%" class="mb-4 px-2">
            <v-text-field
              prepend-icon="mdi-magnify"
              v-model="search"
              label="Search By Name"
              single-line
            ></v-text-field>
          </v-card>
        </v-row> -->
      <v-row v-if="selected">
        <v-card min-width="100%" class="mb-4 pa-2">
          <v-card-title>Select Scenarios</v-card-title>
          <v-simple-table fixed-header>
            <template>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Source</th>
                  <th class="text-left">Add</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in domainToScenarios[selected]"
                  :key="item.scenario_id"
                >
                  <td>{{ item.scenario_id }}</td>
                  <td>{{ item.scenario_name }}</td>
                  <td>{{ item.scenario_source }}</td>
                  <td>
                    <v-icon small class="mr-2" @click="addScenario(item)">
                      mdi-plus
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-row>
      <!-- Selected Scenarios -->
      <v-row v-if="selectedScenarios.length">
        <v-card min-width="100%" class="mb-4 pa-2">
          <v-card-actions>
            <v-card-title>Selected Scenarios</v-card-title>
            <v-spacer></v-spacer>
            <!-- <v-btn
              @click.stop="isDetailsDialogOpen = true"
              small
              elevation="2"
              color="secondary"
            >
              View Details
              <v-icon small right dark>mdi-magnify</v-icon>
            </v-btn> -->
          </v-card-actions>
          <v-container>
            <v-row justify="start" align="start">
              <v-btn
                class="ma-1"
                outlined
                v-for="scenario in selectedScenarios"
                v-on:click="selectedDomain = domain"
                :key="scenario.id"
                >{{ scenario.scenario_id }}</v-btn
              >
            </v-row>
          </v-container>
        </v-card>
      </v-row>
      <v-row justify="start">
        <v-col>
          <!-- Graph Component -->
          <v-card class="pa-2">
            <v-card-title> Graph Component </v-card-title>
            <d3-network
              :net-nodes="nodes"
              :net-links="links"
              :options="options"
              :link-cb="lcb"
              @node-click="nodeClicked"
            ></d3-network>
          </v-card>
        </v-col>
        <v-col>
          <!-- Node Clicked -->
          <v-card min-width="100%" class="mb-2">
            <v-card-title>Selected Node</v-card-title>
            <v-card-text v-if="selectedNode">
              {{ selectedScenario + ": " + selectedNode}}
            </v-card-text>
          </v-card>
          <!-- Description -->
          <v-card min-width="100%" class="mb-2">
            <v-card-title>Description</v-card-title>
            <v-card-text >
              {{ scenarioDetails }}
            </v-card-text>
          </v-card>
          <!-- Vulnerabilities -->
          <v-card min-width="100%" class="mb-2">
            <v-card-title>Vulnerabilities</v-card-title>
            <div v-for="vulnerability in vulnerabilities" :key="vulnerability.id">
              <v-card-subtitle v-text="vulnerability.vulnerability_id + ': ' + vulnerability.vulnerability_name"/>
              <v-card-text v-text="vulnerability.common_vulnerability"/>
              <v-divider/>
            </div>
          </v-card>
          <!-- Mitigations -->
          <v-card min-width="100%" class="mb-2" v-if="nodeClick">
            <v-card-title>Mitigations</v-card-title>
            <div v-for="mitigation in mitigations" :key="mitigation.id">
              <v-card-subtitle v-text="'Mitigation #' + mitigation.id + ': ' + mitigation.action_common_category"/>
              <v-card-text v-text="'Action Group: ' + mitigation.action_group"/>
              <v-card-text v-text="'Action Application Context: ' + mitigation.action_application_context"/>
              <v-card-text v-text="mitigation.original_mitigation"/>
              <v-divider/>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="isAddDialogOpen">
      <CreateNewScenario />
    </v-dialog>
    <svg>
      <defs>
        <marker
          id="m-end"
          markerWidth="6"
          markerHeight="6"
          refX="12"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z"></path>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
import axios from "axios";
import CreateNewScenario from "@/components/CreateNewScenario";
import domainToScenariosImport from "../assets/domainToScenarios";
import D3Network from "vue-d3-network";
// import scenario from "../assets/scenario_detail";
import scenarioToNodesImport from "../assets/scenarioToNodes";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: {
    CreateNewScenario,
    D3Network,
  },
  methods: {
    addScenario: function (scenario) {
      if (!this.selectedScenarios.includes(scenario)) {
        this.selectedScenarios.push(scenario);
        this.selectedScenarioID.push(scenario.scenario_id);
        this.search(scenario.scenario_id);
        this.reload(this.selectedScenarioID);
      }
    },
    nodeClicked(event, node) {
      console.log(event);
      this.nodeClick = true;
      this.selectedNode = node.id;
      this.selectedScenario = node.scenario;
      this.search(node.scenario);
    },
    reload: function (scenarioList) {
      this.nodes = [];
      this.links = [];
      let added = new Set();
      for (let scenario of scenarioList) {
        console.log(this.selectedScenarioID);
        for (let requirement of this.scenarioToNodes[scenario]) {
          let source = { id: requirement.attack_item_source, scenario: scenario, svgSym: rectSvg };
          let target = { id: requirement.attack_item_target, scenario: scenario, svgSym: rectSvg };
          if(source.id.includes("OR")){
            source.svgSym = null
            source._color = "#fed8b1";
          }
          else if(source.id.includes("AND")){
            source.svgSym = null
            source._color = "#add8e6";
          }
          if(target.id.includes("OR")){
            target.svgSym = null
            target._color = "#fed8b1";
          }
          else if(target.id.includes("AND")){
            target.svgSym = null
            target._color = "#add8e6";
          }

            
          if (!added.has(source.id)) {
            this.nodes.push(source);
            added.add(source.id);
          }
          if (!added.has(target.id)) {
            this.nodes.push(target);
            added.add(target.id);
          }
          this.links.push({
            sid: requirement.attack_item_source,
            tid: requirement.attack_item_target,
          });
        }
      }
    },
  search(scenario) {
      axios
        .get("http://10.138.7.72:5003/cams/api/v1/scenario_detail?id=" + scenario)
        .then(response => {
          console.log("Success!");
          this.scenarioData = response.data
          this.scenarioDetails = this.scenarioData.attack_graph_details[0].scenario_description;
          this.vulnerabilities = this.scenarioData.vulnerability_details;
          this.mitigations = this.scenarioData.mitigation_details;
        })
        .catch(error => {
          console.log({ error });
          alert(error.response.data);
        });
  },
  lcb (link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)'}
      return link
    },
  },
  data() {
    return {
      // Graph Components
      nodeClick: false,
      scenarioToNodes: scenarioToNodesImport,
      nodes: [],
      links: [],
      options: {
        force: 500,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
      },
      // Other Components
      scenarioData: "test",
      scenarioDetails: "",
      selectedNode: "",
      selectedScenario: "",
      vulnerabilities: [],
      mitigations: [],
      isAddDialogOpen: false,
      isDetailsDialogOpen: false,
      selected: "Generic",
      selectedScenarios: [],
      selectedScenarioID: [],
      domainToScenarios: domainToScenariosImport,
      domains: [
        "Generic",
        "Wide Area Monitoring, Protection, and Control",
        "Electric Transportation",
        "Distributed Energy Resources",
        "Distribution Grid Management",
        "Demand Response",
        "Advanced Metering Infrastructure",
        "Generation",
      ],
      items: [
        {
          id: "AMI5",
          name: "Advanced Metering Infractructure 5",
          Description: "Description for Advanced Metering Infractructure 5",
        },
        {
          id: "AMI6",
          name: "Advanced Metering Infractructure 6",
          Description: "Description for Advanced Metering Infractructure 6",
        },
        {
          id: "AMI7",
          name: "Advanced Metering Infractructure 7",
          Description: "Description for Advanced Metering Infractructure 7",
        },
        {
          id: "AMI8",
          name: "Advanced Metering Infractructure 8",
          Description: "Description for Advanced Metering Infractructure 8",
        },
      ],
    };
  },
  mounted() {
    this.reload([""]);
    this.search("DGM11");
  },
}; 
</script>
<style>
#m-end path{
  fill:  #888C8B;
}
</style>
