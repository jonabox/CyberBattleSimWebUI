<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-container>
              <v-row>
                <v-col>
                  <v-card flat>
                    <v-card-subtitle>Games Played</v-card-subtitle>
                    <v-card-title>29</v-card-title>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card flat>
                    <v-card-subtitle>Games Won</v-card-subtitle>
                    <v-card-title>16</v-card-title>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card flat>
                    <v-card-subtitle>Games Lost</v-card-subtitle>
                    <v-card-title>13</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Recent Games</v-card-title>
            <v-divider />
            <v-card flat height="100px"></v-card>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Result Analytics</v-card-title>
            <v-divider />
            <v-container>
              <v-card-title>Overview</v-card-title>
              <D3PieChart :config="chart_config" :datum="chart_data"></D3PieChart>
              <v-divider />
              <v-card-title>Score Trend</v-card-title>
              <v-sparkline
                :value="value"
                :gradient="gradient"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :fill="fill"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
              ></v-sparkline>
            </v-container>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Game History</v-card-title>
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
                    <td>{{ item.name }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.result }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { D3PieChart } from "vue-d3-charts";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  components: {
    D3PieChart,
  },
  data: () => ({
    chart_data: [
      { hours: 16, name: "Games Won" },
      { hours: 13, name: "Games Lost" },
    ],
    chart_config: {
      key: "name",
      value: "hours",
      color: { scheme: "schemeTableau10" },
      radius: { inner: 80 },
    },
    count: 1,
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,

    items: [
      {
        name: "Advanced Metering Infractructure",
        date: "07/17/2020",
        result: "success",
      },
      {
        name: "Advanced Metering Infractructure",
        date: "07/05/2020",
        result: "success",
      },
      {
        name: "Advanced Metering Infractructure",
        date: "07/05/2020",
        result: "success",
      },
      {
        name: "Advanced Metering Infractructure",
        date: "06/28/2020",
        result: "failed",
      },
    ],
  }),
};
</script>
