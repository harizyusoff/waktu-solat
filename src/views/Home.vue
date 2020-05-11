<template>
  <div class="container home-container">
    <div class="columns is-mobile">
      <div class="column is-6 dropdown-container">
        <label for="states">Negeri: </label>
        <b-dropdown aria-role="list" v-model="state">
          <button class="button" slot="trigger" slot-scope="{ active }">
            <span class="dropdown-placeholder">
              <template v-if="state">{{state}}</template>
              <template v-else>Pilih negeri</template>
            </span>
            <font-awesome-icon :icon="active ? 'chevron-up' : 'chevron-down'" />
          </button>
          <template v-for="(state, index) in stateLists">
            <b-dropdown-item class="dropdown-list" :key="index" :value="state" aria-role="listitem">{{state}}</b-dropdown-item>
          </template>
        </b-dropdown>
      </div>
      <div class="column is-6 dropdown-container">
        <label for="zones">Daerah: </label>
        <b-dropdown aria-role="list" v-model="zone" :disabled="state ? false : true">
          <button class="button" slot="trigger" slot-scope="{ active }">
            <span class="dropdown-placeholder">
              <template v-if="zone">{{zone}}</template>
              <template v-else>Pilih daerah</template>
            </span>
            <font-awesome-icon :icon="active ? 'chevron-up' : 'chevron-down'" />
          </button>
          <template v-for="(zone, index) in zoneLists">
            <b-dropdown-item class="dropdown-list" :key="index" :value="zone" aria-role="listitem">{{zone}}</b-dropdown-item>
          </template>
        </b-dropdown>
      </div>
    </div>
    <template v-for="(prayerTime, index) in prayerTimeLists">
      <div class="prayer-time-container" :key="index">
        <div class="columns" v-if="index <= 0">
          <div class="column">
            <p class="prayer-name-text">
              {{prayerTime.name}}
            </p>
            <p class="prayer-time-text is-size-1 has-text-weight-bold">
              {{formatDate(prayerTime.time)}}
            </p>
          </div>
        </div>
        <div class="columns is-mobile" v-else>
          <div class="column is-6">
            <p class="prayer-name-text">
              {{prayerTime.name}}
            </p>
          </div>
          <div class="column is-6">
            <p class="prayer-time-text">
              {{prayerTime.time}}
            </p>
          </div>
        </div>
      </div>
    </template>
    <!-- <label>Courstesy of Waktu Solat API by <a href="https://zaimramlan.github.io/waktu-solat-api/#apistates_list">Zaim Ramlan - Waktu Solat API</a></label> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { stateStores } from '../store/states/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { currentDate } from '../utils/helpers';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
library.add(faChevronUp, faChevronDown)
dayjs.extend(utc)

@Component({})
export default class Home extends Vue {
  state = ""
  zone = ""
  stateDetailsStore = stateStores.details

  async created() {
    await this.stateDetailsStore.getStates()
  }

  @Watch('state')
  async handleSelectedState() {
    this.zone = ""
    await this.stateDetailsStore.getZones(this.state)
  }
  
  @Watch('zone')
  async handleSelectedZone() {
    const {zone, state} = this
    await this.stateDetailsStore.getPrayerTimes({
      zone,
      state
    })
  }
  
  formatDate(date: string) {
    return currentDate(date).utcOffset(8);
  }

  get stateLists() {
    return this.stateDetailsStore.states
  }

  get zoneLists() {
    return this.stateDetailsStore.zones
  }

  get prayerTimeLists() {
    return this.stateDetailsStore.prayerTimes
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  border: 1px solid red;
  padding: 80px 0;
  height: 100vh;
}

.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    margin-right: 8px;
  }
}

.dropdown-placeholder {
  margin-right: 8px;
}

.dropdown-placeholder, .dropdown-list, .prayer-name-text {
  text-transform: capitalize;
}

.prayer-time-container {
  text-align: center;
}
</style>