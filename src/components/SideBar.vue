<template>
  <v-navigation-drawer
    class="primary"
    expand-on-hover
    disable-resize-watcher
    floating
    permanent
    app
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon color="secondary">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium secondary--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list>
        <v-list-item href="https://github.com/microsoft/CyberBattleSim" link>
          <v-list-item-icon>
            <v-icon color="secondary">mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium secondary--text">Reference</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item to="/settings" link>
          <v-list-item-icon>
            <v-icon color="secondary">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium secondary--text">Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        // { title: "Account", to: "Account", icon: "mdi-account" },
        { title: "Model", to: "Model", icon: "mdi-graph" },
        { title: "Interact", to: "Human_Player", icon: "mdi-sword-cross" },
        { title: "AI Learning", to: "AI_Learning", icon: "mdi-brain" },
        // { title: "Graph", icon: "mdi-graph" },
        // { title: "Details", icon: "mdi-flash-circle" },
        // { title: "Statistics", icon: "mdi-chart-bar" },
      ],
    };
  },
  computed: {
    isScreenSmall() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
</script>