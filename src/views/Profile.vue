<template>
  <div class="profile">
    <TheUserInfo variant="nav"></TheUserInfo>
    <div class="cv-linkedin">
      <div class="cv">
        <button v-if="this.student.uploaded_cv == false" @click.stop="cv_click">
          <img :src="cv_img" alt="">
          <p>Upload your CV</p>
        </button>
        <!-- <button v-else-if="this.student.approved_cv == false && this.student.rejected_cv == false"></button> -->
        <button v-else-if="this.student.approved_cv == false">
          <img :src="cv_img" alt="">
          <p>Waiting for approval</p>
        </button>
        <button v-else-if="this.student.approved_cv == true">
          <img :src="cv_img" alt="">
          <p>CV Approved</p>
        </button>
        <button v-else>
          <img :src="cv_img" alt="">
          <p>error</p>
        </button>
        <input hidden type="file" accept="application/pdf" ref="cv" @change="add_cv_novo" />
      </div>
      <div class="linkedin">
        <button v-if="this.student.linkedin_url === null" @click.stop="dialog = true">
          <img :src="link_img" alt="">
          <p>Submit your LinkedIn</p>
        </button>
        <button v-else @click.stop="dialog = true">
          <img :src="link_img" alt="">
          <p>LinkedIn Submitted</p>
        </button>
        <div class="linkedin-input">
          <form @submit="add_linkedin">
            <input
              type="url"
              ref="linkedin_url"
              placeholder="https://www.linkedin.com/in/XXXXX/"
              pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$"
              autofocus
              :value="this.student.linkedin_url"
              required
            />
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <Squad></Squad>
  
  <!-- <div v-if="!create_squad">
    <button @click="change_Create"> Create Squad </button>
  </div>
  <div v-else>
    <Squad></Squad>
  </div> -->
</template>

<script>
import TheUserInfo from "@/components/UserCard/TheUserInfo.vue";
import Squad from "@/components/Squads/Squad.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';


export default {
  name: "Profile",
  components: {
    TheUserInfo, Squad
  },
  data: function () {
    return {
      loading_linkedin: false,
      cv_img: require("../assets/cv_button_img.svg"),
      link_img: require("../assets/linkedin_button_img.svg"),
      code: "",
      prev_length: 0,
      points: 0,
      squad: null,
      error: "",
      create_squad: false,
      loading_redeem: false,
      loading_squad: true,
      squad: null,
      student: {},
    };
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    change_Create() {
      this.create_squad = !this.create_squad;
    },
    add_linkedin(e) {
      e.preventDefault();

      this.loading_linkedin = true;
      var url = this.$refs.linkedin_url.value;
      this.dialog = false;

      UserService.addLinkedin(url).then(
        (response) => {
          if (!this.student.linkedin_url) {
            this.$emit(
              "notification",
              "Added LinkedIn +" + process.env.VUE_APP_REWARD_LINKEDIN + "pts",
              "points"
            );
            this.student.linkedin_url = url;
          } else {
            this.$emit(
              "notification",
              "LinkedIn updated successfully",
              "success"
            );
          }
          
          this.loading_linkedin = false;
        },
        (error) => {
          console.log(error);
          this.$emit("notification", "Failed to add LinkedIn", "error");
          this.loading_linkedin = false;
        }
      );
    },

    cv_click() {
      this.$refs.cv.click();
    },
    add_cv_novo() {
      UserService.addCVNOVO(this.$refs.cv).then(
        (response) => {
          if (!this.student.uploaded_cv) {
            this.$emit(
              "notification",
              "Added CV +" + process.env.VUE_APP_REWARD_CV + "pts",
              "points"
            );
            this.student.uploaded_cv = true;
          } else {
            this.$emit("notification", "CV uploaded successfully If approved you will receive a reward", "success");
          }
        },
        (error) => {
          console.log(error);
          this.$emit("notification", "Fail to upload CV", "error");
        }
      );

      this.$refs.cv.value = "";
    },

    add_cv() {
      UserService.addCV(this.$refs.cv).then(
        (response) => {
          if (!this.student.uploaded_cv) {
            this.$emit(
              "notification",
              "Added CV +" + process.env.VUE_APP_REWARD_CV + "pts",
              "points"
            );
          } else {
            this.$emit("notification", "CV updated successfully", "success");
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
          
        },
        (error) => {
          console.log(error);
          this.$emit("notification", "Fail to upload CV", "error");
          
        }
      );

      this.$refs.cv.value = "";
    },
    see_cv() {
      if (this.student.uploaded_cv) {
        UserService.getCV().then(
          (response) => {
            var raw = atob(response.data.data);
            var uint8Array = new Uint8Array(raw.length);
            for (var i = 0; i < raw.length; i++) {
              uint8Array[i] = raw.charCodeAt(i);
            }
            var fileBlob = new Blob([uint8Array], {
              type: response.data["content-type"],
            });
            var objetURL = window.URL.createObjectURL(fileBlob);

            this.cv_url = objetURL;

            this.$refs.see_cv.href = objetURL;
            this.$refs.see_cv.click();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  created() {
    UserService.getUserStudent().then(
      (response) => {
        
        this.student = response.data.data;
        console.log("ola")
        console.log("ola", this.student.uploaded_cv)
      },
      (error) => {
        console.log(error);
      }
    );
  }
};
</script>

<style scoped>
.cv-linkedin {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
}
.cv-linkedin > div > button {
  display: flex;
  height: 50px;
  border: none;
  background: none;
  flex-grow: 1;
  min-width: 0;
  width: 220px;
  background: rgb(35, 49, 54);
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 0 2ch;
  gap: 2ch;
  cursor: pointer;
}

.cv-linkedin > div > button > img {
  height: 80%;
}
.cv-linkedin > div > button > p {
  flex-grow: 1;
  text-align: left;
}
.linkedin-input {
  position: absolute;
  visibility: hidden;
}
</style>