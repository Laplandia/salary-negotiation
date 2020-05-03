<template>
  <v-app id="inspire">
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
                    :centered="centered"
                    :grow="grow"
                    :vertical="vertical"
                    :right="right"
                    :prev-icon="
                      prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined
                    "
                    :next-icon="
                      nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined
                    "
                    :icons-and-text="icons"
                  >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab
                      v-for="(name, i) in tabs"
                      :key="i"
                      :href="`#tab-${i}`"
                    >
                      {{ name }}
                    </v-tab>
                    <v-tab-item
                      :key="0"
                      :value="'tab-' + 0"
                    >
                      <SalaryForm prompt="Minimum salary" event-id="employee"></SalaryForm>
                    </v-tab-item>
                    <v-tab-item
                      :key="1"
                      :value="'tab-' + 1"
                    >
                      <SalaryForm prompt="Maximum salary" event-id="employer"></SalaryForm>
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
    import {Component, Vue} from "vue-property-decorator";
    import Vuetify from "vuetify";
    import SalaryForm from "@/components/SalaryForm.vue";

    @Component({
        components: {SalaryForm}
    })
    export default class SalaryNegotiator extends Vue {

        private _offeredSalary = -1;
        private _demandedSalary = -1;
        get demandedSalary(): number {
            return this._demandedSalary;
        }

        set demandedSalary(value: number) {
            this._demandedSalary = value;
        }

        get offeredSalary(): number {
            return this._offeredSalary;
        }

        set offeredSalary(value: number) {
            this._offeredSalary = value;
        }

        vuetify = new Vuetify();

        text =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        icons = false;
        centered = false;
        grow = false;
        vertical = false;
        prevIcon = false;
        nextIcon = false;
        right = false;
        tabs = ["Employer", "Employee"];

        setOfferedSalary(salary: number): void {
            this._offeredSalary = salary;
        }

        setDemandedSalary(salary: number): void {
            this._demandedSalary = salary;
        }
    }

</script>
