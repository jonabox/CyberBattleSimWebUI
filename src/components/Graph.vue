<template>
  <div>
    {{ parsedData }}
     <d3-network :net-nodes="nodes" :net-links="links" :options="options"></d3-network>
  </div>
</template>

<script>
import D3Network from "vue-d3-network";
import scenario from '../assets/scenario_detail'
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      nodes: [
      ],
      links: [
      ],
      options:
      {
        force: 1000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      }
    };
  },
  created: function () {
    this.nodes.push(
          {
            id: 0,
            name: "mitigations",
            _color: "blue"
          },
          {
            id: 1,
            name: "security requirements",
            _color: "orange"
          },
          // {
          //   id: 2,
          //   name: "vulnerability details"
          // }
        )
    for (var mitigation of scenario["mitigation_details"]){
        this.nodes.push(
          {
            id: mitigation.id,
          }
        )
        this.links.push(
          { sid: mitigation.id, tid: 0, _color:'blue' },
        )
      }
    for (var requirement of scenario["security_requirement_details"]){
        this.nodes.push(
          {
            id: requirement.id,
          }
        )
        this.links.push(
          { sid: requirement.id, tid: 1, _color:'orange' },
        )
      }
    // for (var vulnerability of scenario["vulnerability_details"]){
    //     this.nodes.push(
    //       {
    //         id: vulnerability.id,
    //       }
    //     )
    //     this.links.push(
    //       { sid: vulnerability.id, tid: 2, _color:'orange' },
    //     )
    //   }
  },
};
</script>
<style src="vue-d3-network/dist/vue-d3-network.css"></style>