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
    <div v-if="!loading_jeecpot_rewards && !loading_levels && !loading_squad && !loading_squad_rewards">
      <v-carousel
            style="height: auto; background-color: #FFFCF8"
            hide-delimiter-background
            hide-delimiters
            v-model="model"
        >
        <template v-slot:prev="{ on, attrs }">
          <v-btn
            depressed
            class="arrow-btn"
            v-bind="attrs"
            v-on="on"
            style="background-color: rgba(255,252,248, 0)"
            ><v-icon class="arrow" color="blue"
              >mdi-chevron-left</v-icon
            ></v-btn
          >
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn
            depressed
            class="arrow-btn"
            v-bind="attrs"
            v-on="on"
            style="right: 0vw; background-color: rgba(255,252,248, 0)"
            ><v-icon class="arrow" color="blue"
              >mdi-chevron-right</v-icon
            ></v-btn
          >
        </template>
        <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="prize-wrapper" justify="center">
              <p class="prize-type">Roadmap</p>
              <PersonalRewards
                style="margin-top: 10vh;"
                :levels="levels"
                :user_points="currentUser.total_points"
                :user_level="currentUser.level.data.value"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="prize-wrapper" justify="center">
              <p class="prize-type">Daily Squad</p>
              <SquadRewards
                style="margin-top: 10vh;"
                :squad="squad"
                :squads_rewards="squads_rewards"
                :squad_points="squad ? squad.daily_points : 0"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="prize-wrapper" justify="center">
              <p class="prize-type">Jeecpot</p>
              <JEECPOTRewards
                style="margin-top: 8vh"
                :jeecpot_rewards="jeecpot_rewards"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="prize-wrapper" justify="center">
              <p class="prize-type">Kings</p>
              <KingsRewards
                style="margin-top: 8vh"
                :jeecpot_rewards="jeecpot_rewards"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
       </v-carousel>
      <!-- <PersonalRewards
        style="margin-top: 15vh"
        v-if="button === 'personal'"
        :levels="levels"
        :user_points="currentUser.total_points"
        :user_level="currentUser.level.data.value"
      />

      <SquadRewards
        style="margin-top: 15vh"
        v-if="button === 'squad'"
        :squads_rewards="squads_rewards"
        :squad_points="squad ? squad.daily_points : 0"
      />

      <JEECPOTRewards
        style="margin-top: 8vh"
        v-if="button === 'jeecpot'"
        :jeecpot_rewards="jeecpot_rewards"
      />

      <KingsRewards
        style="margin-top: 8vh"
        v-if="button === 'kings'"
        :jeecpot_rewards="jeecpot_rewards"
      /> -->
    </div>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
// import Buttons from "@/components/Buttons.vue";
import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import JEECPOTRewards from "@/components/JEECPOTRewards.vue";
import KingsRewards from "@/components/KingsRewards.vue";
import UserService from "../services/user.service";

export default {
  name: "Rewards",
  components: {
    PersonalRewards,
    SquadRewards,
    JEECPOTRewards,
    KingsRewards,
    // Buttons,
  },
  data: function () {
    return {
      levels: [],
      squads_rewards: [],
      jeecpot_rewards: null,
      squad: null,
      button: "personal",
      loading_squad: true,
      loading_levels: true,
      loading_squad_rewards: true,
      loading_jeecpot_rewards: true,

      types: [
        "Roadmap",
        "Daily Squad",
        "Jeecpot",
        "Kings",
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
        this.loading_levels = false;
      },
      (error) => {
        console.log(error);
        this.loading_levels = false;
      }
    );

    UserService.getSquadsRewards().then(
      (response) => {
        this.squads_rewards = response.data.data;
        this.loading_squad_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad_rewards = false;
      }
    );

    UserService.getJEECPOTRewards().then(
      (response) => {
        this.jeecpot_rewards = response.data;
        this.loading_jeecpot_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_jeecpot_rewards = false;
      }
    );

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
        this.loading_squad = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
      }
    );
  },
};
</script>

<style scoped>
.prize-wrapper{
  height: auto;
  overflow-y: visible;
}
.prize-type{
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

.arrow-btn{
  position: fixed;
  top: 12%;
}
.rewards {
  background-color: #e6e6e6;
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