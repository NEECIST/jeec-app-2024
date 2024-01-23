import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

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
        })
        // .catch(err => {
        //   // If there was a problem, we want to
        //   // dispatch the error condition
        //   console.log('18890420')
        //   console.log(err);
        //   return err;
        // });
      
      if (this.user.name != "") {
        router.push("/home");
      } else {
        console.log('************************************************');
        // window.location.reload();
      }

        console.log(this.user)
    }
  },
});
