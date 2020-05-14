<template>
  <v-app id="inspire">
    <ResultDialog
      :is-shown="isResultShown"
      :result="isSuccessful ? 'Success' : 'Failure'"
      @hide="hideResult"
    ></ResultDialog>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-tabs
                    background-color="deep-purple accent-4"
                    class="elevation-2"
                    dark
                  >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                      v-for="(name, i) in tabs"
                      :key="i"
                      :href="`#tab-${i}`"
                    >
                      {{ name }}
                    </v-tab>
                    <v-tab-item :key="0" :value="'tab-' + 0">
                      <SalaryForm
                        prompt="maximum salary"
                        @confirmed="setOfferedSalary"
                      ></SalaryForm>
                    </v-tab-item>
                    <v-tab-item :key="1" :value="'tab-' + 1">
                      <SalaryForm
                        prompt="minimum salary"
                        @confirmed="setDemandedSalary"
                      ></SalaryForm>
                    </v-tab-item>
                  </v-tabs>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vuetify from "vuetify";
import SalaryForm from "@/components/SalaryForm.vue";
import ResultDialog from "@/components/ResultDialog.vue";

@Component({
  components: { ResultDialog, SalaryForm }
})
export default class SalaryNegotiator extends Vue {
  offeredSalary = 0;
  demandedSalary = 0;
  isSuccessful = false;
  isResultShown = false;

  vuetify = new Vuetify();
  tabs = ["Employer", "Employee"];

  setOfferedSalary(salary: number): void {
    this.offeredSalary = salary;
    this.showResult();
  }

  setDemandedSalary(salary: number): void {
    this.demandedSalary = salary;
    this.showResult();
  }

  showResult(): void {
    if (!(this.offeredSalary > 0 && this.demandedSalary > 0)) {
      console.error("salaries not set");
      return;
    }

    this.isSuccessful = this.offeredSalary >= this.demandedSalary;
    this.isResultShown = true;
  }

  hideResult(): void {
    this.isResultShown = false;
  }
}
</script>
