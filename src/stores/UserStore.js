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
      },
      points: {},
    };
  },
  actions: {
    isLoggedIn() {
      if(localStorage.getItem("loggedIn") !== null) {
        return this.loggedIn = localStorage.getItem("loggedIn")
      } else this.loggedIn = false
    },

    authUser(jwt) {
      axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "/student/current_student_24",
          {
            headers: {Authorization: jwt}
          }
        )
        .then((response) => (
          console.log(response.data),
          this.user = response.data
        ));
    }
    // login({ commit }, user_and_jwt) {
    //   return AuthService.login(user_and_jwt).then(
    //     user => {
    //       commit("loginSuccess", user);
    //       return Promise.resolve(user);
    //     },
    //     error => {
    //       commit("loginFailure");
    //       return Promise.reject(error);
    //     }
    //   );
    // },
    // logout({ commit }) {
    //   AuthService.logout();
    //   commit("logout");
    // },
    // userUpdate({ commit }, user) {
    //   AuthService.userUpdate(user);
    //   commit("userUpdate", user);
    // }
  },
});
