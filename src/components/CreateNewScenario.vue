<template>
  <v-card>
    <v-tabs dark v-model="tab" background-color="secondary" grow>
      <v-tab>1. Basic Information</v-tab>
      <v-tab>2. Attack Graph</v-tab>
      <v-tab>3. Vulnerabilities</v-tab>
      <v-tab>4. Response Plan</v-tab>
    </v-tabs>
    <!-- Basic Info -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="pa-10" flat>
          <v-select :items="items" label="Select Domain"></v-select>
          <v-text-field label="Scenario ID" v-model="scenarioId"></v-text-field>
          <v-text-field label="Scenario Name" v-model="scenarioName"></v-text-field>
          <v-text-field label="Description" v-model="scenarioDescription"></v-text-field>
        </v-card>
      </v-tab-item>
      <!-- Attack Graph -->
      <v-tab-item>
        <v-card class="pa-10" flat>
          <v-container>
            <v-row>
              <v-col>
                <NewComponentTable/>
              </v-col>
              <v-col>
                <Graph />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- Vulnerabilities -->
      <v-tab-item>
        <v-card class="pa-10" flat>
          <v-container>
            <v-row>
              <v-col>
                <Graph />
              </v-col>
              <v-col>
                 <v-text-field label="Component Selected" v-model="scenarioId"></v-text-field>
                 <v-select :items="items" label="Assign Actor"></v-select>
                 <v-select chips :items="items" label="Add Vulnerability"></v-select>
                 <v-select chips :items="items" label="Add Mitigations"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- Attack Graph -->
      <v-tab-item>
        <v-card class="pa-10" flat>
          <v-container>
            <v-row>
              <v-col>
                <v-card-text>Component Selected</v-card-text>
                <v-simple-table fixed-header>
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tableItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.target }}</td>
                        <td>{{ item.logic }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col>
                <Graph />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
      <v-card class="pa-5" flat>
        <v-card-actions>
        <v-spacer />
            <v-btn v-on:click="submitDataSign()">Save</v-btn>
            <v-btn color="secondary" v-on:click="submitDataSign()">Save & Exit</v-btn>
            <v-btn color="success" v-on:click="submitDataSign()">Done</v-btn>
        </v-card-actions>
      </v-card>
  </v-card>
</template>

<script>
import Graph from "@/components/Graph";
import NewComponentTable from "@/components/NewComponentTable";
// import scenario from '../assets/scenario_detail'
export default {
  components: { Graph, NewComponentTable },
  data() {
    return {
      tab: null,
      scenarioId: null,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
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