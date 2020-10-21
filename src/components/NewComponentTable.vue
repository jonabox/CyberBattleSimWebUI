<template>
  <div>
  <v-data-table :headers="headers" :items="desserts" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Add Components</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Component ID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Component Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.target" label="Target ID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.logic" label="Logical Node"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  <d3-network
                  :net-nodes="nodes"
                  :net-links="links"
                  :options="options"
                  @node-click="nodeClicked"
                ></d3-network>
  </div>
</template>

<script>
// import scenario from "../assets/scenario_detail";
import D3Network from "vue-d3-network";
const rectSvg = '<svg version="1.1"><rect width="25" height="10"/></svg>';
export default {
  components: { D3Network, },
  data: () => ({
    // Graph Components
      nodeClick: false,
      nodeDecription: "None",
      nodeRisks: "None",
      nodes: [],
      links: [],
      options: {
        force: 300,
        nodeSize: 25,
        nodeLabels: true,
        linkWidth: 2,
      },
    // Other Components
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Component Name", value: "name" },
      { text: "Target ID", value: "target" },
      { text: "Logical Node", value: "logic" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      target: "",
      logic: "",
    },
    defaultItem: {
      id: "",
      name: "",
      target: "",
      logic: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

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
    initialize() {
      this.desserts = [
        {
          id: "308",
          name: "Sample Name 1",
          target: "159",
          logic: "AND",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>