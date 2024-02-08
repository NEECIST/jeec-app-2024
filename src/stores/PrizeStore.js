import { defineStore } from "pinia";
import axios from "axios";

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
    getRewards() {
        axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/prizes_images",
          {
            headers: authHeader()
          }
        )
        .then((response) => {
          this.images = response.data.images
        })
    },
  },
});
