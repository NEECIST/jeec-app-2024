import { defineStore } from "pinia";
import axios from "axios";
import authHeader from "@/services/auth-header";

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
      },
      milestones: {
        daily: [],
        final: 0,
      }
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

    logOut(){
      localStorage.clear()
      window.location.reload()
    },

    async authUser(jwt) {
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

    async getMilestones() {
      await axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/get_milestones",
          {
            headers: authHeader()
          }
        )
        .then((response) => {
          this.milestones.final = response.data.final_milestone;
          this.milestones.daily = response.data.daily_milestones;
        })
    }
  },
});
