import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      user: {
        loggedIn: 'false',
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
      this.loggedIn = localStorage.getItem("loggedIn")
      console.log(this.loggedIn)
      console.log(typeof this.loggedIn)
      if(this.loggedIn == true) {
        console.log('LOG DE MERDA')
        this.user = localStorage.getItem("user")
        console.log(this.user.name)

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
          localStorage.setItem("name", this.user.name)
          console.log(localStorage.getItem("name"))
          localStorage.setItem("loggedIn", 'true')
          console.log(localStorage.getItem("loggedIn"))
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
