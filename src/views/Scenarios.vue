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
              @click.stop="isDialogOpen = true"
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
              href="/Details"
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
    <v-dialog max-width="1000" v-model="isDialogOpen">
      <CreateNewScenario />
    </v-dialog>
  </div>
</template>

<script>
import CreateNewScenario from "@/components/CreateNewScenario";
import domainToScenariosImport from "../assets/domainToScenarios";
export default {
  components: {
    CreateNewScenario,
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
      isDialogOpen: false,
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
};
</script>
