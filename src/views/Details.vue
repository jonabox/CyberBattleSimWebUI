<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-card color="rgb(0, 0, 0, 0)" min-width="100%" flat class="mb-4 pa-2">
          <v-card-actions>
            <v-card-title>Scenario Details</v-card-title>
          </v-card-actions>
          <v-card-text
            >AMI: Advanced Metering Infrastructure Failure
            Scenarios</v-card-text
          >
          <v-container min-width="100%">
            <v-row min-width="100%" min-height="100%">
              <v-col>
                <!-- Graph Component -->
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Graph Component</v-card-title>
                  <div>
                    {{ parsedData }}
                    <d3-network
                      :net-nodes="nodes"
                      :net-links="links"
                      :options="options"
                      @node-click="nodeClick=!nodeClick"
                    ></d3-network>
                  </div>
                </v-card>
              </v-col>
              <v-col>
                <!-- Description -->
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Description</v-card-title>
                  <v-card-text v-if="nodeClick">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut Lorem ipsum dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna ali
                  </v-card-text>
                </v-card>
                <!-- Related Risks -->
                <v-card min-width="100%" class="ma-2">
                  <v-card-title>Related Risks</v-card-title>
                  <v-card-text v-if="nodeClick">
                    Lorem ipsum dolor sit Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam Lorem ipsum dolor sit
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam Lorem ipsum dolor sit Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam
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
  </div>
</template>

<script>
import D3Network from "vue-d3-network";
// import scenario from "../assets/scenario_detail";
import scenarioToNodesImport from "../assets/scenarioToNodes";
export default {
  components: {
    D3Network,
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
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 5,
      },
      // Other Components
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
  mounted: function () {
    // this.nodes.push(
    //       {
    //         id: 0,
    //         name: "mitigations",
    //         _color: "blue"
    //       },
    //       {
    //         id: 1,
    //         name: "security requirements",
    //       },
    //       // {
    //       //   id: 2,
    //       //   name: "vulnerability details"
    //       // }
    //     )
    // for (var mitigation of scenario["mitigation_details"]){
    //     this.nodes.push(
    //       {
    //         id: mitigation.id,
    //       }
    //     )
    //     this.links.push(
    //       { sid: mitigation.id, tid: 0, _color:'blue' },
    //     )
    //   }
    for (var requirement of this.scenarioToNodes["AMI1"]){
        this.nodes.push(
          {
            id: requirement.attack_item_source,
          }
        )
        this.nodes.push(
          {
            id: requirement.attack_item_target,
          }
        )
        this.links.push(
          { sid: requirement.attack_item_source, tid: requirement.attack_item_target },
        )
      }
  }
};
</script>
