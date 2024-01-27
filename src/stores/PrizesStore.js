import { defineStore } from "pinia";
import axios from "axios";

export const usePrizesStore = defineStore("PrizesStore", {
  state: () => {
    return {
      loggedIn: false,
      loggedInState: false,
      prizes: {
        img_solo_daily_prize: '',
        img_squad_daily_prize: '',
        solo_ranking: '',
        squad_ranking: '',
      },
    };
  },
  actions: {
    isLoggedIn() {
      var buffer = localStorage.getItem("loggedIn")
      this.loggedIn = JSON.parse(buffer)
      
      if(this.loggedIn == true) {
        buffer = localStorage.getItem("user")
        this.user = { ... JSON.parse(buffer) }
      }
    },

    async authUser(jwt) {
      console.log(jwt)
      await axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/current_student_24",
          {
            headers: {Authorization: jwt}
          }
        )
        .then((response) => {
          console.log(response)
          const data = response.data
          this.prizes = data.current_student
          localStorage.setItem("prizes", JSON.stringify(this.prizes))
          localStorage.setItem("loggedIn", JSON.stringify(true))
          localStorage.setItem("jwt", JSON.stringify(jwt))
        })


      if (this.user.name != "") {
        window.location.replace('home');
      } else {
        window.location.reload();
      }

      

      console.log(this.userprizes)
    }
  },
});
