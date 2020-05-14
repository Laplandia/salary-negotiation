<template>
  <v-dialog v-model="isShown" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Negotiation Result
      </v-card-title>

      <v-card-text class="mt-4">
        {{ this.result }}
      </v-card-text>

      <v-card-text>
        Also, current temperature in London is: {{ this.temperature }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="hideResult">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultDialog extends Vue {
  @Prop({ required: true })
  isShown!: boolean;
  @Prop({ required: true })
  result!: string;
  vuetify = new Vuetify();

  temperature = "Loading...";

  hideResult(): void {
    this.$emit("hide");
  }
  mounted() {
    const key = "b90cf0" + 36 * 2 + "c034c96f5f80705635a24645"; //should actually be set in ENV variable
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=London&appid=" +
        key +
        "&units=metric"
    )
      .then(res => res.json())
      .then(responseBody => {
        this.temperature = `${responseBody.main.temp}°C`;
      })
      .catch(() => {
        this.temperature = "error loading temperature";
      });
  }
}
</script>

<style scoped></style>
