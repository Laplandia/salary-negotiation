import { mount, createLocalVue} from "@vue/test-utils";
import ResultDialog from "@/components/ResultDialog.vue";
import Vue from 'vue'
import Vuetify from "vuetify";

Vue.use(Vuetify);


const localVue = createLocalVue();

describe("SalaryNegotiation.vue", () => {

  let vuetify = new Vuetify();
  const temperature = 451;
  const mockSuccessResponse = {main:{temp: temperature}};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  beforeEach(() => {
    vuetify = new Vuetify();

  });

  it("renders result when shown", () => {
    const result = "This was a triumph.";
    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown:true }
    });
    expect(wrapper.text()).toMatch(result);
  });


  it("shows right temperature", async () => {
    const result = "It's hard to overstate my satisfaction.";

    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown:true }
    });

    await mockFetchPromise;
    await wrapper.vm.$forceUpdate();

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toMatch(temperature.toString());
    });
  });
});

