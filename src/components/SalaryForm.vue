<template>
  <v-card class="pa-4" flat tile>
    <v-text-field
      :label="prompt"
      type="number"
      hide-details="auto"
      @input="changeValue"
    ></v-text-field>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="submitSalary">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SalaryForm extends Vue {
  vuetify = new Vuetify();

  @Prop({ required: true })
  prompt!: string;

  salary = -1;

  changeValue(newSalary: number): void {
    this.salary = newSalary;
  }

  submitSalary(): void {
    if (this.salary > 0) {
      this.$emit("confirmed", this.salary);
    } else {
      console.log("this is too small.");
    }
  }
}
</script>

<style scoped></style>
