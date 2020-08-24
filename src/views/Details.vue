<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-card color="rgb(0, 0, 0, 0)" min-width="100%" flat class="mb-4 pa-2">
          <v-card-actions>
            <v-card-title>Scenario Details</v-card-title>
          </v-card-actions>
          <v-card-text>AMI: Advanced Metering Infrastructure Failure Scenarios</v-card-text>
          <v-container min-width="100%" >
            <v-row min-width="100%" min-height="100%">
              <v-col>
                <v-card min-width="100%" height="500px" class="ma-2">
                  <v-card-title>Graph Component</v-card-title>
                  <Graph/>
                </v-card>
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
                        <v-container>
                          <v-row>
                            <v-col cols="9">
                              <v-card-text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum</v-card-text>
                            </v-col>
                            <v-col>
                              <v-btn class="ma-2" rounded outlined color="secondary" text>Select</v-btn>
                            </v-col>
                          </v-row>
                          <v-divider />
                          <v-row>
                            <v-col cols="9">
                              <v-card-text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum</v-card-text>
                            </v-col>
                            <v-col>
                              <v-btn class="ma-2" rounded outlined color="secondary" text>Select</v-btn>
                            </v-col>
                          </v-row>
                          <v-divider />
                          <v-row>
                            <v-col cols="9">
                              <v-card-text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum</v-card-text>
                            </v-col>
                            <v-col>
                              <v-btn class="ma-2" rounded outlined color="secondary" text>Select</v-btn>
                            </v-col>
                          </v-row>
                          <v-divider />
                          <v-row>
                            <v-col cols="9">
                              <v-card-text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum</v-card-text>
                            </v-col>
                            <v-col>
                              <v-btn class="ma-2" rounded outlined color="secondary" text>Select</v-btn>
                            </v-col>
                          </v-row>
                          <v-divider />
                        </v-container>
                      </v-card>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col>
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Description</v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                    nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut Lorem ipsum
                    dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna ali
                  </v-card-text>
                </v-card>
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Related Risks</v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam
                    Lorem ipsum dolor sit Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam
                    Lorem ipsum dolor sit Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Graph from "../components/Graph";
export default {
  components: {
    Graph,
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
