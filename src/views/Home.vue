<template>
  <div class="container home-container">
    <div class="home-main-wrapper">
      <!-- Waktu solat selection -->
      <div class="columns">
        <div class="column is-6 dropdown-container">
          <label for="states">Negeri: </label>
          <b-dropdown aria-role="list" v-model="state">
            <button class="button" slot="trigger" slot-scope="{ active }">
              <span class="dropdown-placeholder">
                <template v-if="state">{{ state }}</template>
                <template v-else>Pilih negeri</template>
              </span>
              <font-awesome-icon :icon="active ? 'chevron-up' : 'chevron-down'" />
            </button>
            <template v-for="(state, index) in stateLists">
              <b-dropdown-item
                class="dropdown-list"
                :key="index"
                :value="state"
                aria-role="listitem"
                >{{ state }}</b-dropdown-item
              >
            </template>
          </b-dropdown>
        </div>
        <div class="column is-6 dropdown-container">
          <label for="zones">Daerah: </label>
          <b-dropdown aria-role="list" v-model="zone" :disabled="state ? false : true">
            <button class="button" slot="trigger" slot-scope="{ active }">
              <span class="dropdown-placeholder">
                <template v-if="zone">{{ zone }}</template>
                <template v-else>Pilih daerah</template>
              </span>
              <font-awesome-icon :icon="active ? 'chevron-up' : 'chevron-down'" />
            </button>
            <template v-for="(zone, index) in zoneLists">
              <b-dropdown-item
                class="dropdown-list"
                :key="index"
                :value="zone"
                aria-role="listitem"
                >{{ zone }}</b-dropdown-item
              >
            </template>
          </b-dropdown>
        </div>
      </div>
      <!-- Main screen of waktu solat -->
      <transition name="fade">
        <div class="main-prayer-time-wrapper">
          <!-- Waktu solat data -->
          <div
            v-if="prayerTimeLists.length && isStateAndZoneSelected"
            class="displayed-prayer-time-block"
          >
            <template v-for="(prayerTime, index) in prayerTimeLists">
              <div class="prayer-time-container" :key="index">
                <div class="columns is-mobile big-block" v-if="index === 0">
                  <div class="column">
                    <p class="prayer-name-text is-size-4 has-text-weight-bold">
                      {{ prayerTime.name }}
                    </p>
                    <!-- TODO: Dynamic based on prayer time -->
                    <div class="prayer-time-icon">
                      <img
                        :src="require(`@/assets/icons/${prayerTime.name}.svg`)"
                        alt="Illustration of prayer time"
                      />
                    </div>
                    <p class="prayer-time-text is-size-1 has-text-weight-bold">
                      {{ prayerTime.time }}
                    </p>
                    <p class="prayer-time-duration">
                      {{ getTimeDuration(prayerTime.time) }}
                    </p>
                  </div>
                </div>
                <div class="columns is-mobile small-block" v-else>
                  <div class="column is-6">
                    <p class="prayer-name-text">
                      {{ prayerTime.name }}
                    </p>
                  </div>
                  <div class="column is-6">
                    <p class="prayer-time-text">
                      {{ prayerTime.time }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- No waktu solat placeholder -->
          <div v-else class="empty-prayer-time-placeholder">
            <img src="../assets/masjid.svg" />
            <template v-if="state">
              <p>Sila pilih <b>Daerah</b> untuk paparan waktu solat</p>
            </template>
            <template v-else>
              <p>Sila pilih <b>Negeri</b> untuk paparan waktu solat</p>
            </template>
          </div>
          <!-- Fetching loader -->
          <b-loading
            :is-full-page="isFullPage"
            :active.sync="isLoading"
            :can-cancel="false"
          ></b-loading>
        </div>
      </transition>
      <!-- API Credit -->
      <div class="columns credit-container">
        <div class="column">
          <label class="credit-label"
            >Data waktu solat oleh
            <a target="_blank" href="https://zaimramlan.github.io/waktu-solat-api/#apistates_list"
              >Zaim Ramlan - Waktu Solat API</a
            ></label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { stateStores } from '@/store/states/index';
import { timeDuration, currentTime } from '@/utils/helpers';

@Component({})
export default class Home extends Vue {
  state = '';
  zone = '';
  isLoading = false;
  isFullPage = false;
  currentTime = '';
  stateDetailsStore = stateStores.details;

  async created() {
    this.isLoading = true;
    if (this.stateLists) {
      await this.stateDetailsStore.getStates();
      this.isLoading = false;
    }
  }

  @Watch('state')
  async handleSelectedState() {
    this.isLoading = true;
    this.zone = '';
    await this.stateDetailsStore.getZones(this.state);

    if (this.stateDetailsStore.zones) {
      this.isLoading = false;
    }
  }

  @Watch('zone')
  async handleSelectedZone() {
    this.isLoading = true;
    const { zone, state } = this;

    if (this.zone) {
      await this.stateDetailsStore.getPrayerTimes({
        zone,
        state,
      });
      this.isLoading = false;
    }
  }

  get stateLists() {
    return this.stateDetailsStore.states;
  }

  get zoneLists() {
    return this.stateDetailsStore.zones;
  }

  get prayerTimeLists() {
    return this.stateDetailsStore.sortedPrayerTimes;
  }

  get isStateAndZoneSelected() {
    return this.zone && this.state ? true : false;
  }

  getTimeDuration(prayerTime: string) {
    return timeDuration(currentTime(), prayerTime);
  }

  // getPrayerIcon(prayerName: string) {
  //   switch (prayerName) {
  //     case 'syuruk':
  //       return '../assets/icons/syuruk.svg'
  //     case 'subuh':
  //       return '../assets/icons/subuh.svg'
  //     case 'dhuha':
  //       return '../assets/icons/dhuha.svg'
  //     case 'zohor':
  //       return '../assets/icons/zohor.svg'
  //     case 'asar':
  //       return '../assets/icons/asar.svg'
  //     case 'maghrib':
  //       return '../assets/icons/maghrib.svg'
  //     case 'isyak':
  //       return '../assets/icons/isyak.svg'
  //     case 'imsak':
  //       return '../assets/icons/imsak.svg'
  //     default:
  //       return '../assets/icons/imsak.svg'
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 80px 0;
  height: 100vh;
  display: flex;
  align-items: center;
}

.home-main-wrapper {
  width: 100%;
  text-align: center;
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

.dropdown-placeholder,
.dropdown-list,
.prayer-name-text {
  text-transform: capitalize;
}

.prayer-time-container {
  text-align: center;
}

.prayer-time-icon {
  text-align: center;
  margin: 40px 0 40px 0;

  img {
    width: 120px;
  }

  // Animated img
  // img {
  //   width: 120px;
  //   -webkit-animation:spin 4s linear infinite;
  //   -moz-animation:spin 4s linear infinite;
  //   animation:spin 4s linear infinite;
  // }

  // @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  // @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  // @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
}

.credit-container {
  margin-top: 40px;
}

.credit-label {
  font-size: 12px;
  color: rgb(207, 207, 207);

  a {
    color: rgb(207, 207, 207);
    font-weight: 600;
  }
}

.empty-prayer-time-placeholder {
  img {
    height: 120px;
    width: 120px;
  }
}

.main-prayer-time-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 336px;

  .displayed-prayer-time-block {
    width: 100%;
  }
}
</style>
