<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-card color="rgb(0, 0, 0, 0)" min-width="100%" min-height="100%" flat class="pa-2">
          <v-card-title>AMI: Advanced Metering Infrastructure Failure Scenarios</v-card-title>
          <v-container min-width="100%" min-height="100%">
            <v-row min-width="100%" min-height="100%">
              <v-col min-height="100%">
                <v-container>
                  <v-row>
                    <v-card min-width="100%" height="500px" class="ma-2">
                      <v-card-title>Graph Component</v-card-title>
                      
                    </v-card>
                    <v-card min-width="100%" min-height="50%" class="ma-2">
                      <v-card-title>Battle Record</v-card-title>
                      <v-container>
                        <v-row>
                          <v-card-text
                            class="secondary--text"
                          >Advesary: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</v-card-text>
                          <v-card-text
                            class="primary--text"
                          >Player: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</v-card-text>
                          <v-card-text
                            class="secondary--text"
                          >Advesary: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</v-card-text>
                          <v-card-text
                            class="primary--text"
                          >Player: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</v-card-text>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-row>
                </v-container>
              </v-col>
              <v-col>
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Adversary Response</v-card-title>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</v-card-text>
                </v-card>
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Make Next Move</v-card-title>
                  <v-container>
                    <v-row>
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-card>
                              <v-card-title>move #1</v-card-title>
                            </v-card>
                          </v-col>
                          <v-col>
                            <v-card>
                              <v-card-title>move #2</v-card-title>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-card>
                              <v-card-title>move #3</v-card-title>
                            </v-card>
                          </v-col>
                          <v-col>
                            <v-card>
                              <v-card-title>move #4</v-card-title>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-row>
                    <v-divider />
                    <v-row>
                      <v-card flat>
                        <v-card-title>Risk Score</v-card-title>
                        <v-card-text>78</v-card-text>
                        <v-card-title>Related Risks</v-card-title>
                        <v-card-text>
                          Lorem ipsum dolor sit Lorem ipsum dolor sit
                          amet, consectetuer adipiscing elit, sed diam
                          Lorem ipsum dolor sit Lorem ipsum dolor sit
                          amet, consectetuer adipiscing elit, sed diam
                        </v-card-text>
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
  </div>
</template>

<script>
export default {
  components: {
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

