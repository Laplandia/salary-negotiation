import { mount, createLocalVue } from "@vue/test-utils";
import ResultDialog from "@/components/ResultDialog.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const localVue = createLocalVue();

describe("SalaryNegotiation.vue", () => {
  let vuetify = new Vuetify();
  const temperature = 451;
  const mockSuccessResponse = { main: { temp: temperature } };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });

  const mockRejectPromise = Promise.resolve(() =>
    Promise.reject("We are closed for lunch")
  );
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders result when shown", () => {
    const result = "This was a triumph.";
    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown: true }
    });
    expect(wrapper.text()).toMatch(result);
  });

  it("shows right temperature", async () => {
    const result = "It's hard to overstate my satisfaction.";

    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown: true }
    });

    await mockFetchPromise;
    await wrapper.vm.$forceUpdate();

    expect(wrapper.text()).toMatch(temperature.toString());
  });

  it("handles temperature service errors", async () => {
    const result = "It's hard to overstate my satisfaction.";

    global.fetch = jest.fn().mockImplementation(() => mockRejectPromise);

    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown: true }
    });

    await mockRejectPromise;

    await wrapper.vm.$forceUpdate();
    expect.assertions(1);

    expect(wrapper.text()).toMatch("error loading temperature");
  });

  it("emits hide event", async () => {
    const result = "It's hard to overstate my satisfaction.";

    const wrapper = mount(ResultDialog, {
      localVue,
      vuetify,
      propsData: { result, isShown: true }
    });

    wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().hide).toBeTruthy();
  });
});
