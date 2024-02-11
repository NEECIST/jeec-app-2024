import { defineStore } from "pinia";
import axios from "axios";
import authHeader from "../services/auth-header";

export const usePrizeStore = defineStore("PrizeStore", {
  state: () => {
    return {
        images:
        {
          solo_daily_prizes: [],
          squad_daily_prizes: [],
          jeecpot_prizes: [],
          squad_prizes: [],
          solo_prizes: [],
        },
      
      
    };
  },
  actions: {
    async getRewards() {
        await axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/prizes_images",
          {
            headers: authHeader()
          }
        )
        .then((response) => {
          this.images = response.data
          this.images.individual_weekly_rewards[0] = response.data.individual_weekly_rewards[1]
          this.images.individual_weekly_rewards[1] = response.data.individual_weekly_rewards[0]
          this.images.squad_weekly_rewards[0] = response.data.individual_weekly_rewards[1]
          this.images.squad_weekly_rewards[1] = response.data.individual_weekly_rewards[0]
          console.log(response.data)
        })
    },
  },
});
