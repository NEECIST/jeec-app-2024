import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      isLoggedInReady: false,
      loggedIn: false,
      user: {
        name: "",
        username: "",
        email: "",
        picture: "",
        student_external_id: "",
        squad_id: "",
        daily_ponts: "",
        total_points:"",
      },
    };
  },
  actions: {
    isLoggedIn() {
      if(localStorage.getItem("loggedIn") != null) {
        return this.loggedIn = localStorage.getItem("loggedIn")
      } else this.loggedIn = false
    },

    authUser(jwt) {
      console.log(jwt)
      axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/current_student_24",
          {
            timeout: 9999,
            headers: {Authorization: jwt}
          }
        )
        .then((response) => {
          console.log(response)
          const data = response.data
          this.user = data.current_student
        });
      
      console.log(this.user)
    }
  },
});
