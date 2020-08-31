<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-card min-width="100%" class="mb-4 pa-2">
          <v-card-actions>
            <v-card-title>Failure Scenarios</v-card-title>
            <v-spacer></v-spacer>
            <v-btn @click.stop="isDialogOpen = true" fab x-small elevation="2" color="secondary">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-container>
            <v-row justify="start" align="start">
              <v-btn class="ma-1" outlined>AMI: Advanced Metering Infrastructure</v-btn>
              <v-btn class="ma-1" outlined>DGM: Distribution Grid Management</v-btn>
              <v-btn class="ma-1" outlined>CST: Common Sub-Tree</v-btn>
              <v-btn class="ma-1" outlined>DR: Demand Response</v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
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
                  <th class="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.Description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-row>
    </v-container>
    <v-dialog max-width="1000" v-model="isDialogOpen">
      <CreateNewScenario />
    </v-dialog>
  </div>
</template>

<script>
import CreateNewScenario from "@/components/CreateNewScenario";
export default {
  components: {
    CreateNewScenario,
  },
  data() {
    return {
      isDialogOpen: false,
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
