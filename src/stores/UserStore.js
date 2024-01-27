import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      loggedIn: false,
      loggedInState: false,
      user: {
        name: "",
        username: "",
        email: "",
        picture: "",
        student_external_id: "",
        squad_id: "",
        daily_ponts: "",
        total_points:"",
        uploaded_cv: "",
        approved_cv: "",
      },
      prizes: {
        img_solo_daily_prize: '',
        img_squad_daily_prize: '',
        solo_ranking: '',
        squad_ranking: '',
      },
      next_activity : {
        name: "",
        start_time: "",
        end_time: "",
        activity_type: "",
        images: null
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
          this.user = data.current_student
          localStorage.setItem("user", JSON.stringify(this.user))
          localStorage.setItem("loggedIn", JSON.stringify(true))
          localStorage.setItem("jwt", JSON.stringify(jwt))
        })


      if (this.user.name != "") {
        window.location.replace('home');
      } else {
        window.location.reload();
      }

      

      console.log(this.user)
    },

    async authUser2(jwt) {
      console.log(jwt)
      
      await axios
      .get(
        process.env.VUE_APP_JEEC_BRAIN_URL + "/student/next_activity",
        {
          headers: {Authorization: jwt}
        }
      )
      .then((response) => {
        console.log(response)
        const data = response.data
        this.next_activity = data.activity
        localStorage.setItem("next_activity", JSON.stringify(this.next_activity))
        localStorage.setItem("loggedIn", JSON.stringify(true))
        localStorage.setItem("jwt", JSON.stringify(jwt))
      })

      if (this.user.name != "") {
        window.location.replace('home');
      } else {
        window.location.reload();
      }

      

      console.log(this.next_activity)
    },

    async authUser3(jwt) {
      console.log(jwt)
      await axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/reward",
          {
            headers: {Authorization: jwt}
          }
        )
        .then((response) => {
          console.log(response)
          const data = response.data
          this.prizes = data.prizes
          localStorage.setItem("prizes", JSON.stringify(this.prizes))
          localStorage.setItem("loggedIn", JSON.stringify(true))
          localStorage.setItem("jwt", JSON.stringify(jwt))
        })


      if (this.user.name != "") {
        window.location.replace('home');
      } else {
        window.location.reload();
      }

      

      console.log(this.prizes)
    }
  },
});
