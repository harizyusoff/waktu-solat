import store from '../index'
import { Action, Mutation, Module, VuexModule, getModule } from 'vuex-module-decorators'
import axios from 'axios'
import { Endpoints } from '../endpoints';

@Module({
  namespaced: true,
  dynamic: true,
  name: 'solat.details',
  store
})
class SolatDetailStore extends VuexModule {
  isLoading = false
  solatTime: any = []

  @Mutation
  setSolatTime(params: []) {
    this.solatTime = params
  }

  @Mutation
  updateLoadingStatus(params: boolean) {
    this.isLoading = params
  }

  @Action
  async getWaktuSolat() {
    this.context.commit('updateLoadingStatus', true)
    try {
      const {data} = await axios.get(`${Endpoints.solatTime}`)
      console.log(data)
    } catch(e) {
      console.log(e)
    }
    this.context.commit('updateLoadingStatus', false)
  }

}
export default getModule(SolatDetailStore)