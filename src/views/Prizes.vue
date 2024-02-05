<template>
  <div class="rewards">
    <!-- <Buttons
      @_click="click"
      :names="{
        personal: button === 'personal',
        squad: button === 'squad',
        jeecpot: button === 'jeecpot',
        kings: button === 'kings',
      }"
    /> -->

    <!-- {{ jeecpot_rewards }} 
    <div v-if="!loading_jeecpot_rewards"> {{ ATENCAO MUDEI ISTO }} -->

    <!-- {{ solos }} -->

    <div>
      <button style="background-color: #27ade4" @click.stop="click_daily()">
        Daily
      </button>
      <button style="background-color: #27ade4" @click.stop="click_week()">
        Week
      </button>
    </div>

    <div v-if="daily">
      <div>
        <p>SOLO PRIZES</p>

        <DailyPrizes style="margin-top: 8vh" :rewards="images.solo_daily_prizes" />
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p>SQUAD PRIZES</p>

        <DailyPrizes style="margin-top: 8vh" :rewards="images.squad_daily_prizes" />
      </div>
    </div>
    <div v-else>

      <div>
        <p>JEECPOT</p>

        <WeeklyPrizes style="margin-top: 8vh" :rewards="images.jeecpot_prizes" />
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p>SOLO PRIZES</p>

        <WeeklyPrizes style="margin-top: 8vh" :rewards="images.solo_prizes" />
      </div>
      <div>
        <p>SQUAD PRIZES</p>

        <WeeklyPrizes style="margin-top: 8vh" :rewards="images.squad_prizes" />
      </div>
    </div>

    <!--    </div>
    <div v-else class="loading">
      <v-progress-circular indeterminate color="#27ade4" :size="100" :width="10"
        class="loading-bar"></v-progress-circular>
    </div> -->

  </div>
</template>

<script>
// import Buttons from "@/components/Buttons.vue";
//import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import DailyPrizes from "@/components/DailyPrizes.vue";
import WeeklyPrizes from "@/components/WeeklyPrizes.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import axios from "axios";
import authHeader from "@/services/auth-header";


export default {
  name: "Prizes",
  components: {
    //PersonalRewards,
    SquadRewards,
    DailyPrizes,
    WeeklyPrizes,
    // Buttons,
  },
  data: function () {
    return {
      levels: [],
      squads_rewards: [],
      jeecpot_rewards: null,
      images:
      {
        solo_daily_prizes: [],
        squad_daily_prizes: [],
        jeecpot_prizes: [],
        squad_prizes: [],
        solo_prizes: [],
      },
      squad: null,
      button: "personal",
      loading_squad: true,
      loading_levels: true,
      loading_squad_rewards: true,
      loading_jeecpot_rewards: true,
      daily: true,

      types: [
        "Roadmap",
        "Daily Squad",
        "Jeecpot",
        "Kings",
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    }, click_daily() {
      this.daily = true;
    }, click_week() {
      this.daily = false;
    }
  },
  created() {

    // UserService.getSquadsRewards().then(
    //   (response) => {
    //     this.squads_rewards = response.data.data;
    //     console.log(this.squads_rewards);
    //     this.loading_squad_rewards = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading_squad_rewards = false;
    //   }
    // );

    //Mudar para DailyPrizes
    UserService.getJEECPOTRewards().then(
      (response) => {
        this.jeecpot_rewards = response.data;
        console.log(this.jeecpot_rewards);
        this.loading_jeecpot_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_jeecpot_rewards = false;
      }
    );

    // UserService.getUserSquad().then(
    //   (response) => {
    //     this.squad = response.data.data;
    //     this.loading_squad = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading_squad = false;
    //   }
    // );
  }, mounted() {
    axios
      .get(
        process.env.VUE_APP_JEEC_BRAIN_URL + "/student/prizes_images",
        {
          headers: authHeader()
        }
      )
      .then((response) => {
        console.log(response)
        const data = response.data
        this.images = data.images
      })
  },
};
</script>

<style scoped>
.prize-wrapper {
  height: auto;
  overflow-y: visible;
}

.prize-type {
  position: absolute;
  width: 65vw;
  text-align: center;
  top: 2vh;
  text-transform: uppercase;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  letter-spacing: 0.01em;

  color: #000000;
}

.arrow-btn {
  position: fixed;
  top: 12%;
}

.rewards {
  background-color: #050505;
  height: auto;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (min-width: 1100px) {
  .buttons {
    display: flex;
    justify-content: center;
  }
}
</style>