<template>
  <v-card>
    <v-tabs dark v-model="tab" background-color="secondary" grow>
      <v-tab>1. Basic Information</v-tab>
      <v-tab>2. Graph</v-tab>
      <!-- <v-tab>3. Vulnerabilities</v-tab>
      <v-tab>4. Response Plan</v-tab> -->
    </v-tabs>
    <!-- Basic Info -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="pa-10" flat>
          <v-select :items="items" label="Select Domain"></v-select>
          <!-- <v-text-field label="Scenario ID" v-model="scenarioId"></v-text-field> -->
          <v-text-field
            label="Scenario Name"
            v-model="scenarioName"
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="scenarioDescription"
          ></v-text-field>
        </v-card>
      </v-tab-item>
      <!-- Attack Graph -->
      <v-tab-item>
        <v-btn-toggle>
        </v-btn-toggle>
        <v-card class="pa-10" flat>
          <!-- <NewComponentTable /> -->
          <Graph/>
        </v-card>
      </v-tab-item>
      <!-- Vulnerabilities -->
      <!-- <v-tab-item>
        <v-card class="pa-10" flat>
          <v-container>
            <v-row>
              <v-col>
            
              </v-col>
              <v-col>
                <v-text-field
                  label="Component Selected"
                  v-model="scenarioId"
                ></v-text-field>
                <v-select
                  chips
                  :items="items"
                  label="Add Vulnerability"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item> -->
      <!-- Response Plan -->
      <!-- <v-tab-item>
        <v-card class="pa-10" flat>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Component Selected"
                  v-model="scenarioId"
                ></v-text-field>
                <v-select
                  chips
                  :items="items"
                  label="Add Mitigations"
                ></v-select>
              </v-col>
              <v-col>
                
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item> -->
    </v-tabs-items>
    <v-card class="pa-5" flat>
      <v-card-actions>
        <v-spacer />
        <v-btn v-on:click="submitDataSign()">Save</v-btn>
        <v-btn color="secondary" v-on:click="submitDataSign()"
          >Save & Exit</v-btn
        >
        <v-btn color="success" v-on:click="submitDataSign()">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import Graph from "@/components/Graph";
// import NewComponentTable from "@/components/NewComponentTable";

const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
// import scenario from '../assets/scenario_detail'
export default {
  components: { Graph },
  methods: {
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
      // Other components
      tab: null,
      scenarioId: null,
      items: [
        "Advanced Metering Infrastructure",
        "Distributed Energy Resources",
        "Distribution Grid Management",
        "Demand Response",
        "Electric Transportation",
        "Generation",
        "Generic",
        "Wide Area Monitoring, Protection, and Control",
      ],
      tableItems: [
        {
          id: null,
          name: null,
          target: null,
          logic: null,
        },
      ],
    };
  },
};
</script>