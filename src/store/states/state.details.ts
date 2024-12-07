import store from '../index';
import { Action, Mutation, Module, VuexModule, getModule } from 'vuex-module-decorators';
import axios from 'axios';
import { Endpoints } from '../endpoints';
// import { currentTime } from '@/utils/helpers';
// import { prayerTime } from '@/utils/types';
// import { waktuOrder } from '@/utils/constants';

@Module({
  namespaced: true,
  dynamic: true,
  name: 'state.details',
  store,
})

/* eslint-disable */
class StateDetailsStore extends VuexModule {
  isLoading = false;
  states: any = [];
  zones: any = [];
  prayerTimes: any = [];

  @Mutation
  setStates(params: []) {
    this.states = params;
  }

  @Mutation
  setZones(params: []) {
    this.zones = params;
  }

  @Mutation
  setPrayerTimes(params: []) {
    this.prayerTimes = params;
  }

  @Mutation
  updateLoadingStatus(params: boolean) {
    this.isLoading = params;
  }

  // TODO: Recheck this sorted prayer times
  get sortedPrayerTimes() {
    // const ct = currentTime();
    // const greaterThanCt = this.prayerTimes.filter((data: prayerTime) => data.time > ct);
    // const lessThanCt = this.prayerTimes.filter((data: prayerTime) => data.time < ct);
    // const sortedTime = greaterThanCt.concat(lessThanCt);
    // console.log('[DEBUG] sortedPrayerTimes:', { prayerTimes: this.prayerTimes, sortedTime, waktuOrder })
    return this.prayerTimes;
  }

  @Action
  async getStates() {
    this.context.commit('updateLoadingStatus', true);
    try {
      const { data } = await axios.get(`${Endpoints.states}`);
      this.context.commit('setStates', data.data.negeri);
    } catch (e) {
      console.log(e);
    }
    this.context.commit('updateLoadingStatus', false);
  }

  @Action
  async getZones(param: string) {
    this.context.commit('updateLoadingStatus', true);
    try {
      const { data } = await axios.get(`${Endpoints.states}?negeri=${param}`);
      this.context.commit('setZones', data.data.negeri.zon);
    } catch (e) {
      console.log(e);
    }
    this.context.commit('updateLoadingStatus', false);
  }

  // Action always accept one params so second value will always be undefined
  // Solution we can pass it as array or object
  @Action
  async getPrayerTimes(params: any) {
    this.context.commit('updateLoadingStatus', true);
    try {
      const { data } = await axios.get(
        `${Endpoints.solatTime}?negeri=${params.state}&zon=${params.zone}`,
      );
      this.context.commit('setPrayerTimes', data.data.zon[0].waktu_solat);
    } catch (e) {
      console.log(e);
    }
    this.context.commit('updateLoadingStatus', false);
  }
}
export default getModule(StateDetailsStore);
