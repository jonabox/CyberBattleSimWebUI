<template>
  <v-app>
    <v-app-bar app clipped-left color="secondary" dark >
      <div class="d-flex align-center">
        <span class="mr-2">Scenario Based Simulation Platform</span>
      </div>
    </v-app-bar>
    <SideBar/>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";

export default {
  name: "App",

  components: {
    SideBar,
  },

  data: () => ({
    //
  }),
};
</script>
