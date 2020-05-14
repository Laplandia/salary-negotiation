<template>
  <v-card class="pa-4" flat tile>
    <v-card-subtitle
      >Current {{ prompt.toLowerCase() }} is:
      {{ confirmedSalary }}</v-card-subtitle
    >

    <v-text-field
      class="ma-4"
      :label="'New ' + prompt"
      type="number"
      hide-details="auto"
      @input="changeValue"
    ></v-text-field>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="submitSalary">Update</v-btn>
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

  salaryInputValue = 0;
  confirmedSalary = this.salaryInputValue;

  changeValue(newSalary: number): void {
    this.salaryInputValue = newSalary;
  }

  submitSalary(): void {
    if (this.salaryInputValue > 0) {
      this.confirmedSalary = this.salaryInputValue;
      this.$emit("confirmed", this.salaryInputValue);
    } else {
      console.error("this is too small.");
    }
  }
}
</script>

<style scoped></style>
