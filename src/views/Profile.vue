<template>
  <div class="profile">
    <div class="top" style="margin-top:50px">
      <img alt="profile photo" :src="this.user.picture" class="profile-img" />
      <div class="profile-info">
        <div class="name">
          <p>{{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}</p>
        </div>
        <p class="level">Level 0</p>
        <Expbar
          :xp="this.user.total_points - 0"
          :progress="progress"
          :end_points="this.user.total_points"
          :width="xpbar_width"
          :height="height"
        />
      </div>
    </div>

    <div class="middle">
      <div class="button">
        <img :src="cv_img"  v-if="this.user.uploaded_cv === false"
        @click.stop="cv_click">
      
        <div class="added-cv" v-else-if="!loading_cv" style="padding-top: 2vh;">
          <div v-if="this.user.approved_cv == false">
            <p>WAIT FOR REVIEW</p>
          </div>
          <div v-else>
            <p>CV ACCEPTED</p>
            <v-icon large style="color: white">mdi-check</v-icon>
          </div>
          <p
            @click.stop="cv_click"
            style="cursor: pointer; background-color: #70c3e4"
          >
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
          <p @click.stop="see_cv" style="cursor: pointer">
            <v-icon large style="color: white">mdi-download</v-icon>
          </p>
          <a
            style="display: none"
            ref="see_cv"
            :href="cv_url"
            :download="this.user.username + '_cv.pdf'"
            >CV</a
          >
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="#27ade4"
            :size="50"
            :width="5"
            class="loading-bar"
          ></v-progress-circular>
        </div>
        <input
          hidden
          type="file"
          accept="application/pdf"
          ref="cv"
          @change="add_cv_novo"
        />
      </div>
      <div class="button">
        
        <img src="../assets/linkedin.png" alt="linkedin" v-if="this.user.linkedin_url === null"
          @click.stop="dialog = true"/>
        
        <div class="added-linkedin" v-else-if="!loading_linkedin" style="padding-top: 2vh;">
          <div>
            <p>Added</p>
            <v-icon large style="color: white">mdi-check</v-icon>
          </div>
          <p @click.stop="dialog = true" style="cursor: pointer">
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="#27ade4"
            :size="50"
            :width="5"
            class="loading-bar"
          ></v-progress-circular>
        </div>
      </div>
    </div>

    <div class="redeem-code">
      <p class="redeem-text">Redeem Code:</p>
   
      <input
        type="text"
        class="input-code"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        v-model="code"
        autofocus
      />
      <v-btn
          v-if="!loading_redeem"
          depressed
          @click.stop="redeem"
          class="white--text"
          id="redeem-btn"
          color="secundary"
          >Redeem</v-btn
        >
        <v-progress-circular
          v-else
          style="margin-top: 1.9vh"
          indeterminate
          color="#27ade4"
          :size="60"
          :width="6"
          class="loading-bar"
        ></v-progress-circular>
    </div>

      <div class="your-code">
      <p>Your referral code:</p>
        <input ref="referral" type="text" :value="referral_code" readonly style="color:#757575" />
        <v-btn
          depressed
          color="secundary"
          class="white--text"
          id="copy"
          @click.stop="clipboard"
          ><v-icon
            >mdi-content-copy</v-icon
          ></v-btn
        >
      </div>
      <br>



    <div class="bottom" v-if="!loading_companies && !loading_tags">
      <div class="bottom-container">
       <br>
      
      <p class="interest-title">Themes</p>
      <div class="tags">
        <p
          v-for="tag in tags"
          :key="tag"
          @click.stop="tag_click(tag)"
          class="interest-tag"
          :style="
            this.user.tags.includes(tag) ? 'background-color:#D93046' : ''
          "
        >
          {{ tag }}
          <v-icon
            v-if="xpbar_width === '62vw'"
            color="white"
            style="margin-left: 2vw"
            >{{
              this.user.tags.includes(tag) ? "mdi-check" : "mdi-plus"
            }}</v-icon
          >

          <v-icon v-else large color="white" style="margin-left: 1vw">{{
            this.user.tags.includes(tag) ? "mdi-check" : "mdi-plus"
          }}</v-icon>
        </p>
      </div>
    </div>
    <div class="bottom-container">
      <br>
      <p class="interest-title">Partners</p>
      <div class="tags">
        <p
          v-for="company in companies"
          :key="company"
          @click.stop="company_click(company)"
          class="tag"
          :style="
            this,.companies.includes(company)
              ? 'background-color:#26A2D5'
              : ''
          "
        >
          {{ company
          }}<v-icon
            v-if="xpbar_width === '62vw'"
            color="white"
            style="margin-left: 2vw"
            >{{
              this.user.companies.includes(company) ? "mdi-check" : "mdi-plus"
            }}</v-icon
          >

          <v-icon v-else large color="white" style="margin-left: 1vw">{{
            this.user.companies.includes(company) ? "mdi-check" : "mdi-plus"
          }}</v-icon>
        </p>
      </div>
    </div>
    </div>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>

    <v-dialog v-model="dialog" :width="dialog_width">
      <v-card>
        <div class="linkedin-input">
          <form @submit="add_linkedin">
            <input
              type="url"
              ref="linkedin_url"
              placeholder="https://www.linkedin.com/in/XXXXX/"
              pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$"
              autofocus
              :value="this.user.linkedin_url"
              required
            />
            <br />
            <center>
              <button type="submit">Confirm</button>
            </center>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Expbar from "@/components/Expbar.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';


export default {
  name: "Profile",
  components: {
    Expbar,
  },
  data: function () {
    return {
      color: "gray",
      dialog: false,
      tags: [],
      companies: [],
      cv_url: "",
      height: 30,
      xpbar_width: "62vw",
      dialog_width: "",
      loading_tags: true,
      loading_companies: true,
      loading_cv: false,
      loading_linkedin: false,
      cv_img:require("../assets/cv_2.png"),
      code: "",
      prev_length: 0,
      points: 0,
      squad: null,
      error: "",
      loading_redeem: false,
      loading_squad: true,
    };
  },
  methods: {
    redeem() {
      if (this.code.replaceAll("-", "").length == 16) {
        this.loading_redeem = true;
        UserService.redeemCode(this.code).then(
          (response) => {
            this.points =
              response.data.data.total_points - this.user.total_points;
            this.$store.dispatch("auth/userUpdate", response.data.data);

            UserService.getUserSquad().then(
              (response) => {
                this.squad = response.data.data;
              },
              (error) => {
                console.log(error);
              }
            );

            this.dialog = true;
            this.error = "";

            this.$emit(
              "notification",
              "Code redeemed successfully +" + this.points + "pts",
              "success"
            );
            this.loading_redeem = false;
          },
          (error) => {
            this.error = "Invalid Code";
            console.log(error);
            this.$emit(
              "notification",
              error.response ? error.response.data.error : "Invalid code",
              "error"
            );
            this.loading_redeem = false;
          }
        );
      } else {
        this.$emit("notification", "Incomplete code", "error");
      }
    },
    clipboard() {
      this.$refs.referral.select();
      document.execCommand("copy");
    },
    add_linkedin(e) {
      e.preventDefault();

      this.loading_linkedin = true;
      var url = this.$refs.linkedin_url.value;
      this.dialog = false;

      UserService.addLinkedin(url).then(
        (response) => {
          if (!this.user.linkedin_url) {
            this.$emit(
              "notification",
              "Added LinkedIn +" + process.env.VUE_APP_REWARD_LINKEDIN + "pts",
              "points"
            );
          } else {
            this.$emit(
              "notification",
              "LinkedIn updated successfully",
              "success"
            );
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
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
    tag_click(tag) {
      if (this.user.tags.includes(tag)) {
        this.delete_tag(tag);
      } else {
        this.add_tag(tag);
      }
    },
    company_click(company) {
      if (this.user.companies.includes(company)) {
        this.delete_company(company);
      } else {
        this.add_company(company);
      }
    },

    add_cv_novo() {
      this.loading_cv = true;
      UserService.addCVNOVO(this.$refs.cv).then(
        (response) => {
          if (!this.user.uploaded_cv) {
            this.$emit(
              "notification",
              "Added CV +" + process.env.VUE_APP_REWARD_CV + "pts",
              "points"
            );
          } else {
            this.$emit("notification", "CV uploaded successfully If approved you will receive a reward", "success");
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.loading_cv = false;
        },
        (error) => {
          console.log(error);
          this.$emit("notification", "Fail to upload CV", "error");
          this.loading_cv = false;
        }
      );

      this.$refs.cv.value = "";
    },

    add_cv() {
      this.loading_cv = true;
      UserService.addCV(this.$refs.cv).then(
        (response) => {
          if (!this.user.uploaded_cv) {
            this.$emit(
              "notification",
              "Added CV +" + process.env.VUE_APP_REWARD_CV + "pts",
              "points"
            );
          } else {
            this.$emit("notification", "CV updated successfully", "success");
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.loading_cv = false;
        },
        (error) => {
          console.log(error);
          this.$emit("notification", "Fail to upload CV", "error");
          this.loading_cv = false;
        }
      );

      this.$refs.cv.value = "";
    },
    see_cv() {
      if (this.user.uploaded_cv) {
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
    add_tag(tag) {
      let user_backup = JSON.parse(JSON.stringify(this.user));
      let user = JSON.parse(JSON.stringify(this.user));

      user.tags.push(tag);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.addTags([tag]).then(
        () => {},
        (error) => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    add_company(company) {
      let user_backup = JSON.parse(JSON.stringify(this.user));
      let user = JSON.parse(JSON.stringify(this.user));

      user.companies.push(company);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.addCompanies([company]).then(
        () => {},
        (error) => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    delete_tag(tag) {
      let user_backup = JSON.parse(JSON.stringify(this.user));
      let user = JSON.parse(JSON.stringify(this.user));

      user.tags = user.tags.filter((_tag) => _tag !== tag);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.deleteTag(tag).then(
        () => {},
        (error) => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    delete_company(company) {
      let user_backup = JSON.parse(JSON.stringify(this.user));
      let user = JSON.parse(JSON.stringify(this.user));

      user.companies = user.companies.filter(
        (_company) => _company !== company
      );
      this.$store.dispatch("auth/userUpdate", user);

      UserService.deleteCompany(company).then(
        () => {},
        (error) => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    resize() {
      
      this.xpbar_width = "62vw";
      this.dialog_width = "";
      
    },
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    nameArray() {
      var names = this.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.user.name, ""];
    },
    progress() {
      var xp = this.user.total_points;
      var start_points = 0;
      var end_points = this.user.total_points;

      return ((xp - start_points) / (end_points - start_points)) * 100;
    },
    referral_code() {
      var code = this.user.referral_code;
      return (
        code.substring(0, 4) +
        "-" +
        code.substring(4, 8) +
        "-" +
        code.substring(8, 12) +
        "-" +
        code.substring(12, 16)
      );
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    if (!this.user) {
      this.$router.push("/");
    }

    this.resize();

    UserService.getTags().then(
      (response) => {
        this.tags = response.data;
        this.loading_tags = false;
      },
      (error) => {
        console.log(error);
        this.loading_tags = false;
      }
    );

    UserService.getCompanies().then(
      (response) => {
        this.companies = response.data;
        this.loading_companies = false;
      },
      (error) => {
        console.log(error);
        this.loading_companies = false;
      }
    );
  },
  watch: {
    code(val) {
      if (
        val.replaceAll("-", "").length % 4 === 0 &&
        val[val.length - 1] !== "-" &&
        val.replaceAll("-", "").length < 16 &&
        val.length > 0 &&
        val.length > this.prev_length
      ) {
        this.code = this.code + "-";
      }

      if (val.replaceAll("-", "").length > 16 || val.length > 19) {
        this.code = this.code.substring(0, 19);
      }

      if (this.prev_length == 0) {
        for (var i = 0; i < this.code.length; i++) {
          if ((i == 4 || i == 9 || i == 14) && this.code[i] !== "-") {
            this.code =
              this.code.substring(0, i) + "-" + this.code.substring(i);
            i--;
          }
        }
      }

      this.prev_length = val.length;
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
        this.loading_squad = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
      }
    );
  },
};
</script>

<style scoped>

.profile {
  background-color: #FFFCF8;
  height:auto;
}

.top{
  background-color: #FFFCF8;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}
.middle{
  background-color: #FFFCF8;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display:flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
}

.bottom {
  width:95vw;
  margin-bottom:20vh
}

.bottom-container{
  background-color: #DDEEF3;
  border-radius:30px;
  margin-left:2.5vw;
  padding-bottom: 2vh;
  margin-bottom: 5vh;
}

::-webkit-scrollbar {
  width: 5vw;
  max-width: 30px;
}

::-webkit-scrollbar-thumb {
  border: 6px solid #f1f1f1;
  background-clip: padding-box;
  border-radius: 11px;
  background-color: #c8c8c8;
}

.top {
  display: flex;
}

.profile-info {
  margin-left: 4vw;
}

.profile-img {
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
}

.name p {
  margin: 0;
  font-size: 3vh;
  font-weight: 600;
  line-height: 3.2vh;
}

.level {
  margin: 0;
  margin-bottom: 0.5vh;
  font-size: 2.1vh;
  font-weight: 600;
}

.cv-wrapper,
.linkedin-wrapper {
  display: flex;
  align-items: center;
}

.cv-wrapper img,
.linkedin-wrapper img {
  height: 7.5vh;
  width: 7.5vh;
  margin-right: 5vw;
}

.add-cv,
.add-linkedin {
  font-size: 3.5vh;
  font-weight: 500;
  align-items: center;
  border-radius: 2vh;
  padding: 0.5vh;
  padding-left: 3vw;
  padding-right: 3vw;
  color: white;
  cursor: pointer;
}

.add-cv p,
.add-linkedin p {
  margin: 0;
}

.added-cv,
.added-linkedin {
  width: calc(40vh - 7.5vh);
  font-size: 3.5vh;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: white;
}

.added-cv > *,
.added-linkedin > * {
  background-color: #27ade4;
  border-radius: 2vh;
  padding: 0.5vh;
  margin: 0;
  margin-right: 2vw;
}

.added-cv div:first-of-type,
.added-linkedin div:first-of-type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 3vw;
  padding-right: 3vw;
  background-color: #70c3e4;
}

.added-cv div:first-of-type p,
.added-linkedin div:first-of-type p {
  margin: 0;
}

.interests {
  font-size: 3.5vh;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1vh;
}

.interest-title {
  font-size: 4vh;
  font-weight: 600;
  position:relative;
  margin-left:2vh;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  min-height: 5vh;
  margin-left:3vw;
}

.tag {
  margin: 0;
  line-height: 2.5vh;
  font-size: 2.5vh;
  font-weight: 700;
  text-align: center;
  color: white;
  height: 4vh;
  background-color: #70c3e4;
  border-radius: 3vh;
  padding: 2vh;
  margin-right: 1vh;
  margin-bottom: 1vh;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.interest-tag{
  margin: 0;
  line-height: 2.5vh;
  font-size: 2.5vh;
  font-weight: 700;
  color: white;
  height: 4vh;
  background-color:  #EB8F9B;
  border-radius: 3vh;
  padding: 2vh;
  margin-right: 1vh;
  margin-bottom: 1vh;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.add-tag {
  background-color: green;
  font-weight: 600;
  font-size: 2.5vh;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #50575c;
  margin-top: 0.8vh;
  margin-bottom: 0;
}

.spacer {
  height: 1.5vh;
}

.notifications-wrapper {
  margin-bottom: 9vh;
}

.notifications-switch {
  margin: 0;
  padding: 0;
}

.notifications,
.logout {
  color: rgba(255, 255, 255, 0.89);
  font-size: 3vh;
}

.logout {
  font-weight: 600;
  vertical-align: middle;
  cursor: pointer;
}

.logout-img img {
  height: 4vh;
  width: 4vh;
  display: block;
  margin-left: auto;
  margin-right: 3vw;
  cursor: pointer;
}

/* .linkedin-input {
} */

.linkedin-input input {
  width: 100%;
  margin-top: 0.5vh;
  font-size: 2.7vh;
  text-align: center;
}

.linkedin-input button {
  margin: 1vh;
  color: green;
  font-size: 2.4vh;
}

.loading {
  text-align: center;
  margin-top: 10vh;
}

.top {
  justify-content: center;
  align-items: center;
}

.name {
  display: flex;
}

.name p {
  font-size: 4vh;
}

.level {
  font-size: 2.7vh;
}

.second-name {
  margin-left: 0.5vw !important;
}

.middle {
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  padding-left: 3vw;
  padding-right: 3vw;
  padding-top: 4vh;
  padding-bottom: 4vh;
}

.cv-wrapper,
.linkedin-wrapper {
  width: 30vw;
}

.cv-wrapper img,
.linkedin-wrapper img {
  margin-right: 2vw;
}

.add-cv,
.add-linkedin {
  width: 23vw;
  padding-left: 1vw;
  padding-right: 1vw;
}

.added-linkedin > p:last-of-type {
  margin-right: 0;
}

.profile-img {
  height: 19vh;
  width: 19vh;
}

.tags {
  margin-bottom: 2vh;
}

::-webkit-scrollbar {
  width: 2vw;
}

.footer {
  margin-left: 0.1vw;
}

.footer table {
  width: 20vw;
  margin-left: 22vw;
}

tr {
  cursor: pointer;
}

.button img{
  width:15vw;
  border-radius:100%;
}

.redeem-code{
  margin-left:5vw;
  display:flex;
  font-size:25px;
  font-weight:600;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}

.redeem-text{
  margin-bottom:0px;
  color:#03618C;
}

.input-code{
  font-size:25px;
  margin-left:2vw;
  text-align: center;
}

@media screen and (max-width: 500px)  {
  .input-code{
  font-size:15px;
}
.redeem-code{
  font-size:15px; 
}
.your-code{
  font-size:15px !important
}
#redeem-btn{
  font-size:10px !important;
  height:20px !important;
  width:40px !important;
}
}
@media screen and (min-width: 1000px)  {
  .input-code{
  font-size:35px;
}
.redeem-code{
  font-size:35px !important;
}
.your-code{
  font-size:35px !important
}
#redeem-btn{
  font-size:20px !important;
  height:40px !important;
  width:120px !important;
}
}

.your-code{
  margin-left:5vw;
  font-size:25px;
  display:flex;
  font-weight:600;
  align-items: center;
  flex-wrap: wrap;
  color:#03618C;
}

.your-code p{
  margin-bottom:0;
  margin-right:2vw;
}

#copy{
  border-radius:20px;
  width:40px;
  height:40px;
  min-width: 0;
  margin-left:5vw;
}

#redeem-btn{
  border-radius:4vw;
  font-size:15px;
  height:30px;
  width:90px;
  margin-left:5vw;
}

.code-warning{
  padding-left:5vw;
  padding-right: 5vw;
}



</style>