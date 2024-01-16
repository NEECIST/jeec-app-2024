<template>
  <div class="jeecpot-rewards" v-if="jeecpot_rewards">
    <div class="title-container">
      <div class="individual-title" style="margin-left: -5vw;">Individual</div>
      <div class="squads-title" style="margin-right: -2vw;">Squad</div>
    </div>
    <div class="winner-container">
      <div class="winner-box" style="background: rgba(217, 208, 4, 0.2)">
        <div class="prize" style="margin-left: -10vw;">
          <img style="border: 3px solid #D9D004;"
            class="image"
            :class="{ winner: jeecpot_rewards.first_student_winner }"
            :src="jeec_brain_url + jeecpot_rewards.first_student_reward.image"
          />
          <div class="reward-info" style="text-align: center;">
            {{ jeecpot_rewards.first_student_reward.name }}<br/>
          </div>
        </div>
        <div class="placements" style="color: #CEBD25;">1<sup><small><small>st</small></small></sup></div>
        <div class="prize" style="margin-right: -10vw;">
          <img style="border: 3px solid #D9D004;"
            class="image"
            :class="{ winner: jeecpot_rewards.first_squad_winner }"
            :src="jeec_brain_url + jeecpot_rewards.first_squad_reward.image"
          />
          <div class="reward-info" style="text-align: center;">
            {{ jeecpot_rewards.first_squad_reward.name }}<br/>
          </div>
        </div>
    </div>
    <div class="winner-box" style="background: rgba(26, 156, 216, 0.15)">
      <div class="prize" style="margin-left: -10vw;">
        <img style="border: 3px solid #1A9CD8;"
            class="image"
            :class="{ winner: jeecpot_rewards.second_student_winner }"
            :src="jeec_brain_url + jeecpot_rewards.second_student_reward.image"
          />
        <div class="reward-info" style="text-align: center;">
          {{ jeecpot_rewards.second_student_reward.name }}<br/>
        </div>
      </div>
      <div class="placements" style="color: #1A9CD8;">2<sup><small><small>nd</small></small></sup></div>
      <div class="prize" style="margin-right: -10vw;">
        <img style="border: 3px solid #1A9CD8;"
            class="image"
            :class="{ winner: jeecpot_rewards.second_squad_winner }"
            :src="jeec_brain_url + jeecpot_rewards.second_squad_reward.image"
          />
        <div class="reward-info" style="text-align: center;">
          {{ jeecpot_rewards.second_squad_reward.name }}<br/>
        </div>
      </div>
    </div>
    <div class="winner-box" style="background: rgba(217, 48, 70, 0.2); margin-bottom: 40px;">
      <div class="prize" style="margin-left: -10vw;">
        <img style="border: 3px solid #D93046;"
            class="image"
            :class="{ winner: jeecpot_rewards.third_student_winner }"
            :src="jeec_brain_url + jeecpot_rewards.third_student_reward.image"
          />
        <div class="reward-info" style="text-align: center;">
          {{ jeecpot_rewards.third_student_reward.name }}<br/>
        </div>
      </div>
      <div class="placements" style="color: #D93046;">3<sup><small><small>rd</small></small></sup></div>
      <div class="prize" style="margin-right: -10vw;">
        <img style="border: 3px solid #D93046;"
            class="image"
            :class="{ winner: jeecpot_rewards.third_squad_winner }"
            :src="jeec_brain_url + jeecpot_rewards.third_squad_reward.image"
          />
        <div class="reward-info" style="text-align: center;">
          {{ jeecpot_rewards.third_squad_reward.name }}<br/>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JEECPOTRewards",
  props: {
    jeecpot_rewards: Object,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {},
};
</script>

<style scoped>
.jeecpot-rewards {
  font-weight: 600;
  height: 90vh;
  width: 100vw;
}
.title-container{
  position: relative;
  top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.individual-title{
  width: 146px;
  height: 34px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;

  color: #03618C;
}

.squads-title{
  width: 94px;
  height: 34px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;

  color: #03618C;
}

.winner-container{
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.winner-box{
  position: relative;
  align-self: center;
  width: 90vw;
  height: 20vh;
  border-radius: 35px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.prize{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reward-info{
  position: relative;
  margin-top: 3vw;
  width: 80px;
  height: 24px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}

.image{
  border-radius: 50%;

  position: relative;
  width: 12.5vh;
  height: 12.5vh;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.placements{
  position: relative;
  margin-left: -5vw;
  width: 19px;
  height: 59px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  letter-spacing: 0.01em;
}

</style>
