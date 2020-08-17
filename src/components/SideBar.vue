<template>
  <v-navigation-drawer
    class="secondary accent-4"
    dark
    permanent
    clipped
    :mini-variant="isScreenSmall"
    app
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list>
        <v-list-item to="/help" link>
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/settings" link>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Scenarios", icon: "mdi-folder" },
        { title: "Compute", icon: "mdi-flash-circle" },
        { title: "Simulate", icon: "mdi-sword-cross" },
        { title: "Statistics", icon: "mdi-chart-bar" },
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