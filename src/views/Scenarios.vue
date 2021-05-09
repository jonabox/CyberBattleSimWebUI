<template>
  <div class="about">
    <v-container fluid>
      <Graph/>
    </v-container>
    <v-dialog v-model="isAddDialogOpen">
      <CreateNewScenario />
    </v-dialog>
    <svg>
      <defs>
        <marker
          id="m-end"
          markerWidth="6"
          markerHeight="6"
          refX="12"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z"></path>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
import axios from "axios";
import Graph from "@/components/Graph";
import domainToScenariosImport from "../assets/domainToScenarios";
// import scenario from "../assets/scenario_detail";
import scenarioToNodesImport from "../assets/scenarioToNodes";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: {
    Graph
  },
  methods: {
    addScenario: function (scenario) {
      if (!this.selectedScenarios.includes(scenario)) {
        this.selectedScenarios.push(scenario);
        this.selectedScenarioID.push(scenario.scenario_id);
        this.search(scenario.scenario_id);
        this.reload(this.selectedScenarioID);
      }
    },
    nodeClicked(event, node) {
      console.log(event);
      this.nodeClick = true;
      this.selectedNode = node.id;
      this.selectedScenario = node.scenario;
      this.search(node.scenario);
    },
    reload: function (scenarioList) {
      this.nodes = [];
      this.links = [];
      let added = new Set();
      for (let scenario of scenarioList) {
        console.log(this.selectedScenarioID);
        for (let requirement of this.scenarioToNodes[scenario]) {
          let source = { id: requirement.attack_item_source, scenario: scenario, svgSym: rectSvg };
          let target = { id: requirement.attack_item_target, scenario: scenario, svgSym: rectSvg };
          if(source.id.includes("OR")){
            source.svgSym = null
            source._color = "#fed8b1";
          }
          else if(source.id.includes("AND")){
            source.svgSym = null
            source._color = "#add8e6";
          }
          if(target.id.includes("OR")){
            target.svgSym = null
            target._color = "#fed8b1";
          }
          else if(target.id.includes("AND")){
            target.svgSym = null
            target._color = "#add8e6";
          }

            
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
  search(scenario) {
      axios
        .get("http://10.138.7.72:5003/cams/api/v1/scenario_detail?id=" + scenario)
        .then(response => {
          console.log("Success!");
          this.scenarioData = response.data
          this.scenarioDetails = this.scenarioData.attack_graph_details[0].scenario_description;
          this.vulnerabilities = this.scenarioData.vulnerability_details;
          this.mitigations = this.scenarioData.mitigation_details;
        })
        .catch(error => {
          console.log({ error });
          alert(error.response.data);
        });
  },
  lcb (link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)'}
      return link
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
        force: 500,
        nodeSize: 25,
        nodeLabels: false,
        linkWidth: 2,
      },
      // Other Components
      scenarioData: "test",
      scenarioDetails: "",
      selectedNode: "",
      selectedScenario: "",
      vulnerabilities: [],
      mitigations: [],
      isAddDialogOpen: false,
      isDetailsDialogOpen: false,
      selected: "Generic",
      selectedScenarios: [],
      selectedScenarioID: [],
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
  mounted() {
    this.reload([""]);
    this.search("DGM11");
  },
}; 
</script>
<style>
#m-end path{
  fill:  #888C8B;
}
</style>
