<template>
    <div class="kings-rewards" v-if="jeecpot_rewards">
        <div class="king-box" style="justify-content: left; right: 5vw">
            <div>
              <img style="margin-left: -1vh; border: 3px solid #D9D004;"
                class="image"
                :class="{ winner: jeecpot_rewards.king_job_fair_winner }"
                :src="jeec_brain_url + jeecpot_rewards.king_job_fair_reward.image"
              />
            </div>
            <div>
                <p class="king-info" style="text-align: left; left: 2.5vw;">King of Job Fair</p>
                <p class="winner-info" style="text-align: left; left: 2.5vw;">{{ jeecpot_rewards.king_job_fair_reward.name }}</p>
            </div>
        </div>
        <div class="king-box" style="justify-content: right; left: 5vw">
            <div>
                <p class="king-info" style="text-align: right; right: 2.5vw;">King of Knowledge</p>
                <p class="winner-info" style="text-align: right; right: 2.5vw;">{{ jeecpot_rewards.king_knowledge_reward.name }}</p>
            </div>
  
            <div>
              <img style="margin-right: -1vh; border: 3px solid #D9D004;"
                class="image"
                :class="{ winner: jeecpot_rewards.king_knowledge_winner }"
                :src="jeec_brain_url + jeecpot_rewards.king_knowledge_reward.image"
              />
            </div>
        </div>
        <div class="king-box" style="justify-content: left; right: 5vw">
            <div>
              <img style="margin-left: -1vh; border: 3px solid #D9D004;"
                class="image"
                :class="{ winner: jeecpot_rewards.king_hacking_winner }"
                :src="jeec_brain_url + jeecpot_rewards.king_hacking_reward.image"
              />
            </div>
            <div>
                <p class="king-info" style="text-align: left; left: 2.5vw;">King of Hacking</p>
                <p class="winner-info" style="text-align: left; left: 2.5vw;">{{ jeecpot_rewards.king_hacking_reward.name }}</p>
            </div>
        </div>
        <div class="king-box" style="justify-content: right; left: 5vw">
            <div>
                <p class="king-info" style="text-align: right; right: 2.5vw;">King of Networking</p>
                <p class="winner-info" style="text-align: right; right: 2.5vw;">{{ jeecpot_rewards.king_networking_reward.name }}</p>
            </div>
  
            <div>
              <img style="margin-right: -1vh; border: 3px solid #D9D004;"
                class="image"
                :class="{ winner: jeecpot_rewards.king_networking_winner }"
                :src="jeec_brain_url + jeecpot_rewards.king_networking_reward.image"
              />
            </div>
        </div>
        <div class="king-box" style="justify-content: left; right: 5vw">
            <div>
              <img style="margin-left: -1vh; border: 3px solid #D9D004;"
                class="image"
                :class="{ winner: jeecpot_rewards.cv_platform_raffle_winner }"
                :src="jeec_brain_url + jeecpot_rewards.cv_platform_raffle_reward.image"
              />
            </div>
            <div>
                <p class="king-info" style="text-align: left; left: 2.5vw;">CV Platform Raffle</p>
                <p class="winner-info" style="text-align: left; left: 2.5vw;">{{ jeecpot_rewards.cv_platform_raffle_reward.name }}</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "KingsRewards",
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
  .kings-rewards {
    font-weight: 600;
    height: 85vh;
    width: 100vw;

    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .king-box{
    position: relative;
    width: 80vw;
    height: 12.5vh;

    background: rgba(26, 156, 216, 0.2);
    border-radius: 6.25vh;

    display:flex;
    flex-direction: row;
  }

  .image{
    border-radius: 50%;

    position: relative;
    width: 12.5vh;
    height: 12.5vh;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .king-info{
    position: relative;
    width: 50vw;
    height: 6vh;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 2vh;
    line-height: 6vh;
    letter-spacing: 0.01em;

    color: #03618C;
  }

  .winner-info{
    position: relative;
    top: -16px;
    width: 50vw;
    height: 4vh;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 1.8vh;
    line-height: 4vh;
    letter-spacing: 0.01em;

    color: #000000;
  }
  </style>