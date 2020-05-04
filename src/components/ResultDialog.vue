<template>
  <v-dialog v-model="isResultShown" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Negotiation Result
      </v-card-title>

      <v-card-text>
        {{ this.result}}
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
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ResultDialog extends Vue {
    @Prop({required:true})
    isResultShown!: boolean;
    @Prop({required:true})
    result!: string;
  vuetify = new Vuetify();

  hideResult(): void {
    this.$emit("hide");
  }
}
</script>

<style scoped></style>
