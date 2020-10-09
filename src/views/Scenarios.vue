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
                :key="domain"
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
            <v-btn
              @click.stop="isDetailsDialogOpen = true"
              small
              elevation="2"
              color="secondary"
            >
              View Details
              <v-icon small right dark>mdi-magnify</v-icon>
            </v-btn>
          </v-card-actions>
          <v-container>
            <v-row justify="start" align="start">
              <v-btn
                class="ma-1"
                outlined
                v-for="scenario in selectedScenarios"
                v-on:click="selected = domain"
                :key="scenario"
                >{{ scenario.scenario_id }}</v-btn
              >
            </v-row>
          </v-container>
        </v-card>
      </v-row>
      <div v-if="selected">
        <v-row>
          <v-card min-width="100%" class="mb-4 px-2">
            <v-text-field
              prepend-icon="mdi-magnify"
              v-model="search"
              label="Search By Name"
              single-line
            ></v-text-field>
          </v-card>
        </v-row>
        <v-row>
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
                    :key="item.id"
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
      </div>
    </v-container>
    <v-dialog max-width="1000" v-model="isAddDialogOpen">
      <CreateNewScenario />
    </v-dialog>
    <v-dialog min-width="100%" v-model="isDetailsDialogOpen">
      <v-card>
        <v-container fluid>
        <v-row>
          <v-card
            color="rgb(0, 0, 0, 0)"
            min-width="100%"
            flat
            class="mb-4 pa-2"
          >
            <v-card-actions>
              <v-card-title>Scenario Details</v-card-title>
            </v-card-actions>
            <v-container min-width="100%">
              <v-row>
                <!-- Graph Component -->
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Graph Component</v-card-title>

                  <d3-network
                    :net-nodes="nodes"
                    :net-links="links"
                    :options="options"
                    @node-click="nodeClick = !nodeClick"
                  ></d3-network>
                </v-card>
                <v-col>
                  <!-- Description -->
                  <v-card min-width="100%" class="ma-2">
                    <v-card-title>Description</v-card-title>
                    <v-card-text v-if="nodeClick">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut Lorem ipsum dolor sit amet, consectetuer
                      adipiscing elit, sed diam nonummy nibh euismod tincidunt
                      ut laoreet dolore magna ali
                    </v-card-text>
                  </v-card>
                  <!-- Related Risks -->
                  <v-card min-width="100%" class="ma-2">
                    <v-card-title>Related Risks</v-card-title>
                    <v-card-text v-if="nodeClick">
                      Lorem ipsum dolor sit Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam Lorem ipsum dolor
                      sit Lorem ipsum dolor sit amet, consectetuer adipiscing
                      elit, sed diam Lorem ipsum dolor sit Lorem ipsum dolor sit
                      amet, consectetuer adipiscing elit, sed diam
                    </v-card-text>
                  </v-card>
                  <!-- Mitigations -->
                  <v-card min-width="100%" class="ma-2">
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
                                  >Lorem ipsum dolor sit amet, consectetuer
                                  adipiscing elit, Lorem ipsum</v-card-text
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
                                  >Lorem ipsum dolor sit amet, consectetuer
                                  adipiscing elit, Lorem ipsum</v-card-text
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
                                  >Lorem ipsum dolor sit amet, consectetuer
                                  adipiscing elit, Lorem ipsum</v-card-text
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
                                  >Lorem ipsum dolor sit amet, consectetuer
                                  adipiscing elit, Lorem ipsum</v-card-text
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
          </v-card>
        </v-row>
      </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CreateNewScenario from "@/components/CreateNewScenario";
import domainToScenariosImport from "../assets/domainToScenarios";
import D3Network from "vue-d3-network";
// import scenario from "../assets/scenario_detail";
import scenarioToNodesImport from "../assets/scenarioToNodes";
export default {
  components: {
    CreateNewScenario,
    D3Network,
  },
  methods: {
    addScenario: function (scenario) {
      if (!this.selectedScenarios.includes(scenario)) {
        this.selectedScenarios.push(scenario);
      }
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
        force: 1000,
        nodeSize: 50,
        nodeLabels: true,
        linkWidth: 5,
      },
      // Other Components
      isAddDialogOpen: false,
      isDetailsDialogOpen: true,
      selected: "Generic",
      selectedScenarios: [],
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
  mounted: function () {
    for (let requirement of this.scenarioToNodes["AMI1"]) {
      this.nodes.push({
        id: requirement.attack_item_source,
      });
    }
    for (let requirement of this.scenarioToNodes["AMI1"]) {
      this.links.push({
        sid: requirement.attack_item_target,
        tid: requirement.attack_item_source,
      });
    }
  },
};
</script>
