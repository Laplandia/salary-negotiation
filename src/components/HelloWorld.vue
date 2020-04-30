<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
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
                      <v-icon v-if="icons">mdi-phone</v-icon>
                    </v-tab>

                    <v-tab-item
                      :key="0"
                      :value="'tab-' + 0"
                    >
                      <v-card flat tile>
                        <v-text-field
                          label="Minimum salary"
                          hide-details="auto"
                        ></v-text-field>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item
                      :key="1"
                      :value="'tab-' + 1"
                    >
                      <v-card flat tile>
                        <v-text-field
                          label="Maximum salary"
                          hide-details="auto"
                        ></v-text-field>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
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

@Component
export default class SalaryNegotiator extends Vue {
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
}

</script>
