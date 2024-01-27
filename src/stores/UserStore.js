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
        updated_cv: "",
        approved_cv: "",
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
    }
  },
});
