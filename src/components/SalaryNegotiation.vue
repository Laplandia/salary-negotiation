<template>
  <v-app id="inspire">
    <v-dialog
      v-model="isResultShown"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Negotiation Result
        </v-card-title>

        <v-card-text>
          {{this.isSuccessful ? 'Success!': 'Failure!'}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="hideResult"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                        prompt="Maximum salary"
                        @confirmed="setOfferedSalary"
                      ></SalaryForm>

                    </v-tab-item>
                    <v-tab-item :key="1" :value="'tab-' + 1">
                      <SalaryForm
                        prompt="Minimum salary"
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

@Component({
  components: { SalaryForm }
})
export default class SalaryNegotiator extends Vue {
  private _offeredSalary = -1;
  private _demandedSalary = -1;
  private isSuccessful = false;
  isResultShown = false;

  vuetify = new Vuetify();
  tabs = ["Employer", "Employee"];

  setOfferedSalary(salary: number): void {
    this._offeredSalary = salary;
    console.log("offered salary = " + salary);
    this.showResult();

  }

  setDemandedSalary(salary: number): void {
    this._demandedSalary = salary;
    console.log("demanded salary = " + salary);
    this.showResult();
  }


  showResult(): void {
      if (!(this._offeredSalary > 0 && this._demandedSalary>0)) {
          console.log('salaries not set')
          return;
      }

      if (this._offeredSalary > this._demandedSalary) {
          this.isSuccessful = true;
          console.log('success')
      } else {
          this.isSuccessful = false;
          console.log('failure')
      }
      this.isResultShown = true;
  }

  hideResult(): void {
      this.isResultShown = false;
  }
}
</script>
