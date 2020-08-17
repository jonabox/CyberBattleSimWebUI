<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-card min-width="100%" class="mb-4 pa-2">
          <v-card-title>Failure Scenarios</v-card-title>
          <v-container>
            <v-row justify="start" align="start">
              <v-btn text color="primary accent-4">AMI: Advanced Metering Infrastructure</v-btn>
              <v-btn text color="primary accent-4">DGM: Distribution Grid Management</v-btn>
              <v-btn text color="primary accent-4">CST: Common Sub-Tree</v-btn>
              <v-btn text color="primary accent-4">DR: Demand Response</v-btn>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
