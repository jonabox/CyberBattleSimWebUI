<template>
  <v-app color="secondary">
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

<style>
#app {
    background-color: var(--v-background-base);
}
</style>
