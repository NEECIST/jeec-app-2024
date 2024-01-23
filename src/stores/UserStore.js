import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
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
      var buffer = localStorage.getItem("loggedIn")
      this.loggedIn = JSON.parse(buffer)
      if(this.loggedIn == true) {
        buffer = localStorage.getItem("user")
        this.user = JSON.parse(buffer)

        if (this.user.name != "") {
          window.location.replace('home');
        } else {
          localStorage.setItem("loggedIn", false)
          window.location.reload();
        }
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
