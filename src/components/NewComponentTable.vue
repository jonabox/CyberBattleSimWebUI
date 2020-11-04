<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="nodeList"
      sort-by="id"
      class="elevation-1 mb-4"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Add Components</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Component ID"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Component Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.target"
                        label="Target ID"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="gates" v-model="editedItem.logic" label="Logical Node"></v-select>
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
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
    <v-card>
      <d3-network
        :net-nodes="nodes"
        :net-links="links"
        :options="options"
        :link-cb="lcb"
        @node-click="nodeClicked"
      ></d3-network>
    </v-card>
    <svg>
      <defs>
        <marker
          id="m-end"
          markerWidth="10"
          markerHeight="12"
          refX="10"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z"></path>
        </marker>
        <marker
          id="m-start"
          markerWidth="6"
          markerHeight="6"
          refX="-4"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <rect width="3" height="6"></rect>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
// import scenario from "../assets/scenario_detail";
import D3Network from "vue-d3-network";
const rectSvg = '<svg version="1.1"><rect width="25" height="15"/></svg>';
export default {
  components: { D3Network },
  data: () => ({
    // Graph Components
    nodeClick: false,
    nodeDecription: "None",
    nodeRisks: "None",
    nodes: [],
    links: [],
    options: {
      force: 3000,
      nodeSize: 25,
      nodeLabels: true,
      linkWidth: 2,
    },
    // Other Components
    gates: ["NONE", "AND", "OR"],
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
    nodeList: [],
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
    initialize() {
      this.nodeList = [];
      this.reload();
    },

    editItem(item) {
      this.editedIndex = this.nodeList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.reload();
    },

    deleteItem(item) {
      const index = this.nodeList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.nodeList.splice(index, 1);
      this.reload();
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
        Object.assign(this.nodeList[this.editedIndex], this.editedItem);
      } else {
        this.nodeList.push(this.editedItem);
        this.reload();
      }
      this.close();
    },
    reload: function () {
      let added = new Set();
      this.nodes = [];
      this.links = [];
      for (let requirement of this.nodeList) {
        let source = { id: requirement.id, svgSym: rectSvg };
        if (!added.has(source.id)) {
          this.nodes.push(source);
          added.add(source.id);
        }
        if (requirement.target != ""){
          this.links.push({
          sid: requirement.id,
          tid: requirement.target,
        });
        }
      }
    },
    lcb (link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)'}
      return link
    }
  },
};
</script>
<style>
#m-end path, #m-start{
  fill:  #888C8B;
}
</style>