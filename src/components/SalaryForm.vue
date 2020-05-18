<template>
  <v-card class="pa-4" flat tile>
    <v-card-subtitle
      >Current {{ prompt }} is:
      {{ confirmedSalary }}</v-card-subtitle
    >

    <v-text-field
      v-if="confirmedSalary === 0"
      class="ma-4"
      :label="'New ' + prompt"
      type="number"
      hide-details="auto"
      @input="changeValue"
      @keydown.enter="submitSalary"
    ></v-text-field>

    <v-card-actions v-if="confirmedSalary === 0">
      <v-spacer />
      <v-btn color="primary" @click="submitSalary">Set</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SalaryForm extends Vue {
  @Prop({ required: true })
  prompt!: string;

  vuetify = new Vuetify();

  salaryInputValue = 0;
  confirmedSalary = this.salaryInputValue;

  changeValue(newSalary: number): void {
    this.salaryInputValue = newSalary;
  }

  submitSalary(): void {
    if (this.salaryInputValue > 0) {
      this.confirmedSalary = this.salaryInputValue;
      this.$emit("confirmed", this.confirmedSalary);
    } else {
      console.error("this is too small."); //should be handled by UI, obviously
    }
  }
}
</script>

<style scoped></style>
