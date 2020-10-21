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
      <v-row justify="start">
        <v-col>
          <!-- Graph Component -->
          <v-card class="pa-2">
            <v-card-title>
              Graph Component
            </v-card-title>
            <d3-network
              :net-nodes="nodes"
              :net-links="links"
              :options="options"
              @node-click="nodeClicked"
            ></d3-network>
          </v-card>
        </v-col>
        <v-col>
          <!-- Description -->
          <v-card min-width="100%" class="mb-2">
            <v-card-title>Description</v-card-title>
            <v-card-text v-if="nodeClick">
              {{ nodeDecription }}
            </v-card-text>
          </v-card>
          <!-- Related Risks -->
          <v-card min-width="100%" class="mb-2">
            <v-card-title>Related Risks</v-card-title>
            <v-card-text v-if="nodeClick">
              {{ nodeRisks }}
            </v-card-text>
          </v-card>
          <!-- Mitigations -->
          <v-card min-width="100%" class="mb-2">
            <v-container>
              <v-row justify="space-around">
                <v-card flat>
                  <v-card-title>CST#4</v-card-title>
                </v-card>
                <v-card flat>
                  <v-card-title>Risk Score</v-card-title>
                  <v-card-text>78</v-card-text>
                </v-card>
                <v-card flat>
                  <v-card-title>Mitigations</v-card-title>
                  <v-divider />
                  <v-container v-if="nodeClick">
                    <v-row>
                      <v-col cols="9">
                        <v-card-text
                          >Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, Lorem ipsum</v-card-text
                        >
                      </v-col>
                      <v-col>
                        <v-btn
                          class="ma-2"
                          rounded
                          outlined
                          color="secondary"
                          text
                          >Select</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                      <v-col cols="9">
                        <v-card-text
                          >Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, Lorem ipsum</v-card-text
                        >
                      </v-col>
                      <v-col>
                        <v-btn
                          class="ma-2"
                          rounded
                          outlined
                          color="secondary"
                          text
                          >Select</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                      <v-col cols="9">
                        <v-card-text
                          >Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, Lorem ipsum</v-card-text
                        >
                      </v-col>
                      <v-col>
                        <v-btn
                          class="ma-2"
                          rounded
                          outlined
                          color="secondary"
                          text
                          >Select</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                      <v-col cols="9">
                        <v-card-text
                          >Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, Lorem ipsum</v-card-text
                        >
                      </v-col>
                      <v-col>
                        <v-btn
                          class="ma-2"
                          rounded
                          outlined
                          color="secondary"
                          text
                          >Select</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-divider />
                  </v-container>
                </v-card>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="isAddDialogOpen">
      <CreateNewScenario />
    </v-dialog>
    <!-- Details Dialog -->
  </div>
</template>

<script>
import CreateNewScenario from "@/components/CreateNewScenario";
import domainToScenariosImport from "../assets/domainToScenarios";
import D3Network from "vue-d3-network";
// import scenario from "../assets/scenario_detail";
import scenarioToNodesImport from "../assets/scenarioToNodes";
const rectSvg = '<svg version="1.1"><rect width="25" height="10"/></svg>';
export default {
  components: {
    CreateNewScenario,
    D3Network,
  },
  methods: {
    addScenario: function (scenario) {
      if (!this.selectedScenarios.includes(scenario)) {
        this.selectedScenarios.push(scenario);
        this.selectedScenarioID.push(scenario.scenario_id)
        this.reload(this.selectedScenarioID);
      }
    },
    nodeClicked (event, node) {
      console.log(event);
      this.nodeClick = true;
      this.nodeDecription = node.id;
      this.nodeRisks = node.id;
      
      },
    reload: function (scenarioList) {
      let added = new Set();
      for (let scenario of scenarioList) {
        console.log(this.selectedScenarioID);
        for (let requirement of this.scenarioToNodes[scenario]) {
          let source = { id: requirement.attack_item_source, svgSym: rectSvg };
          let target = { id: requirement.attack_item_target, svgSym: rectSvg };
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
  },
  data() {
    return {
      // Graph Components
      nodeClick: false,
      nodeDecription: "None",
      nodeRisks: "None",
      scenarioToNodes: scenarioToNodesImport,
      nodes: [],
      links: [],
      options: {
        force: 300,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
      },
      // Other Components
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
    this.reload([])
  },
};
</script>
