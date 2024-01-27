import { defineStore } from "pinia";
import axios from "axios";

export const useNewActivityStore = defineStore("NewActivityStore", {
  state: () => {
    return {
      loggedIn: false,
      loggedInState: false,
      next_activity : {
        name: "",
        start_time: "",
        end_time: "",
        activity_type: "",
        images: ""
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

    async authUser(jwt) {
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
    }
  },
});
