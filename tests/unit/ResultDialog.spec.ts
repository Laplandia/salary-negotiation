import { mount,createLocalVue} from "@vue/test-utils";
import ResultDialog from "@/components/ResultDialog.vue";
import Vue from 'vue'
import Vuetify from "vuetify";

Vue.use(Vuetify);


const localVue = createLocalVue();

describe("SalaryNegotiation.vue", () => {

  let vuetify = new Vuetify();
  const temperature = 451;


  beforeEach(() => {
    vuetify = new Vuetify()

    const mockSuccessResponse = {main:{temp: temperature}};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  })

  it("renders result when shown", () => {
    const result = "This was a triumph.";
    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown:true }
    })
    expect(wrapper.text()).toMatch(result);
  });


  it("shows right temperature", () => {
    const result = "It's hard to overstate my satisfaction.";
    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown:true }
    })
    expect(wrapper.text()).toMatch(temperature.toString());
  });
});

