<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Simulation Parameters </v-card-title>
          <v-card-subtitle>
            Parameters can be referenced
            <a
              href="https://github.com/microsoft/CyberBattleSim/blob/main/notebooks/notebook_tabularq.ipynb"
            >
              here</a
            >.
          </v-card-subtitle>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col v-if="!showFigures">
                  <v-text-field
                    v-model="parameters.iterationCount"
                    label="iteration count"
                    hint="Maximum number of iterations in each episode"
                    :rules="intRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model.number="parameters.trainingEpisodeCount"
                    label="training episode count"
                    hint="Number of training episodes"
                    :rules="intRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="parameters.gamma"
                    label="gamma"
                    hint="gamma discount factor"
                    :rules="floatRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="parameters.learningRate"
                    label="learning rate"
                    hint="Non-learning mode at rate = 0; setting this value too close to 100 may lead to getting stuck, being more permissive (e.g. in the 80-90 range) typically gives better results"
                    :rules="intRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="parameters.epsilon"
                    label="epsilon"
                    hint="Explore vs Exploit: 0.0 to exploit the learned policy only without exploration vs 1.0 to explore purely randomly"
                    :rules="floatRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="parameters.epsilonDecay"
                    label="epsilon decay"
                    hint="Epsilon gets multiplied by this value after each episode"
                    :rules="intRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-title> Attacker Goal </v-card-title>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="parameters.attackerGoal.reward"
                    label="Reward"
                    hint="Creates goal to reach at least the specified cumulative total reward"
                    :rules="floatRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="parameters.attackerGoal.lowAvailability"
                    label="Low Availability"
                    hint="Creates goal to bring the availability to lower than the specified Service Level Agreement (SLA) value"
                    :rules="floatRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="parameters.attackerGoal.ownAtLeast"
                    label="Own At Least"
                    hint="Creates goal to own at least the specified number of nodes"
                    :rules="intRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="parameters.attackerGoal.ownAtLeastPercent"
                    label="Own At Least Percent"
                    hint="Creates goal to own at least the specified percentage of the network nodes. Set to 1.0 to define goal as the ownership of all network nodes. Ranges from 0 to 1."
                    :rules="rateRules"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-title> Defender Goal </v-card-title>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-switch
                    class="mt-0"
                    color="secondary"
                    v-model="parameters.defenderGoal.eviction"
                    :label="`eviction: ${parameters.defenderGoal.eviction.toString()}`"
                    hint="Define conditions to be simultanesouly met for the defender to win."
                    persistent-hint
                  ></v-switch>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid"
                  :loading="isRunning"
                  class="ma-4"
                  color="success"
                  @click="runLearningSimulation()"
                  >run Q-Learning</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col v-show="showLiveResults">
        <v-card class="mb-4">
          <v-alert v-if="!isRunning && showLiveResults" type="success" dense>
            <v-row align="center">
              <v-col class="grow"> Simulation has ended </v-col>
              <v-col class="shrink">
                <v-btn
                  :loading="isRunning"
                  dense
                  x-small
                  outlined
                  @click="showFigures = true"
                  >show generated figures</v-btn
                >
              </v-col>
            </v-row>
          </v-alert>
          <iframe
            id="live-results"
            width="1000px"
            height="425px"
            frameborder="0"
          />
          <v-card-actions v-show="isRunning">
            <v-slider
              v-model="refreshRate"
              :label="refreshRate + ' second refresh rate'"
              persistent-hint
              color="secondary lighten-1"
              track-color="primary"
              min="1"
              max="10"
              thumb-label
              thumb-size="21"
              inverse-label
            >
            </v-slider>
            <v-spacer />
          </v-card-actions>
        </v-card>
        <v-card v-if="showFigures">
          <v-tabs v-model="tab" background-color="transparent" grow>
            <v-tab>Progression</v-tab>
            <v-tab>Durations</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-title> Reward Progression </v-card-title>
              <v-container>
                <v-row no-gutters>
                  <v-col
                    v-for="step in rewardImagesCount"
                    v-bind:key="step"
                    class="d-flex child-flex"
                    cols="6"
                  >
                  {{step}}
                    <img
                      :src="'/api/reward_image_e' + finalEpisodeCount + '_' + step + '?t=' + Date.now()"
                    />
                  </v-col>
                </v-row> </v-container
            ></v-tab-item>
            <v-tab-item
              ><v-card-title> Episode Duration Plots </v-card-title>
              <v-container>
                <v-row no-gutters>
                  <v-col
                    v-for="episode in finalEpisodeCount"
                    v-bind:key="episode"
                    class="d-flex child-flex"
                    cols="6"
                  >
                    <img
                      :src="'api/episode_image_' + episode + '?t=' + Date.now()"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import D3Network from "vue-d3-network";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      isRunning: false,
      showLiveResults: false,
      showFigures: false,
      refreshRate: 5,
      finalEpisodeCount: 0,
      rewardImagesCount: 0,
      //
      tab: null,
      // Simulation Parameters
      parameters: {
        iterationCount: 300,
        trainingEpisodeCount: 5,
        gamma: 0.015,
        learningRate: 0.9,
        epsilon: 0.9,
        epsilonDecay: 0.75,
        // Attacker Goal
        attackerGoal: {
          reward: 0,
          lowAvailability: 1,
          ownAtLeast: 0,
          ownAtLeastPercent: 1,
        },
        // Defender Goal
        defenderGoal: {
          eviction: false,
        },
      },

      // Rules
      valid: true,
      floatRules: [
        (v) => v === 0 || !!v || "item is required",
        (v) => !isNaN(v) || "item must be a number",
      ],
      rateRules: [
        (v) => v === 0 || !!v || "item is required",
        (v) => (0 <= v && v <= 1) || "value must range from 0 to 1",
      ],
      intRules: [
        (v) => v === 0 || !!v || "item is required",
        (v) => Number.isInteger(parseFloat(v)) || "item must be an integer",
      ],
    };
  },

  methods: {
    runLearningSimulation() {
      this.isRunning = true;
      this.showLiveResults = true;
      this.showFigures = false; // any stored figures will be from previous run until current simmulation ends
      this.finalEpisodeCount = this.parameters.trainingEpisodeCount;
      let formData = new FormData();
      formData.append("simulation_parameters", JSON.stringify(this.parameters));
      axios
        .post("/api/run_learning_simulation", formData)
        .then((response) => {
          // simulation has ended once response has been received
          console.log(response.data);
          this.rewardImagesCount = response.data;
          this.isRunning = false;
        })
        .catch((error) => {
          console.log({ error });
          alert(error.response.data);
        });
      this.pollSimulation();
    },
    pollSimulation() {
      let iframe = document.getElementById("live-results");
      let newSrc = "/api/simulation_iframe?t=" + Date.now();
      iframe.src = newSrc;
      // keep polling until simulation ends
      if (this.isRunning) {
        setTimeout(this.pollSimulation, this.refreshRate * 1000);
      }
    },
  },
};
</script>
<style src="@/assets/vue-d3-network.css"/>