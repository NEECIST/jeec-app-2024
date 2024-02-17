<template>
  <div class="profile">
    <TheUserInfo variant="profile"></TheUserInfo>

    <div class="profile-buttons">
      <button v-if="this.student.uploaded_cv == false" @click.stop="toggleModal2">
        <img :src="cv_img" alt="">
        <p>Upload your CV</p>
      </button>
      <!-- <button v-else-if="this.student.approved_cv == false && this.student.rejected_cv == false"></button> -->
      <button v-else-if="this.student.approved_cv == false" @click.stop="toggleModal2">
        <img :src="cv_img" alt="">
        <p>Waiting for approval</p>
      </button>
      <button v-else-if="this.student.approved_cv == true" @click.stop="toggleModal2">
        <img :src="cv_img" alt="">
        <p>CV Approved</p>
      </button>
      <button v-else>
        <img :src="cv_img" alt="">
        <p>Loading</p>
      </button>

      <!-- <button v-if="this.student.uploaded_cv == true" @click="see_cv">
        <img :src="cv_img" alt="">
        <p>See CV</p>
      </button> -->

      <button @click="toggleModal">
        <img :src="link_img" alt="">
        <p>{{ student.linkedin_url === null ? 'Submit your LinkedIn' : 'LinkedIn Submitted' }}</p>
      </button>

      <a href="https://www.ordemengenheiros.pt/pt/admissao-a-ordem/membro-estudante/" target="_blank">
        <p> Ordem dos engenheiros form</p>
      </a>

      <div style="position: absolute;">
        <a style="display: none" ref="see_cv" :href="cv_url" :download="this.student.username + '_cv.pdf'">CV</a>

        <div class="modal" v-if="modalVisible == true">
          <div class="modal-backdrop" @click="toggleModal"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h2>Add LinkedIn</h2>
              <button class="modal-close" @click="toggleModal">&times;</button>
            </div>
            <form @submit="add_linkedin">
              <div class="modal-body">
                <input type="url" ref="linkedin_url" class="input-field" placeholder="https://www.linkedin.com/in/XXXXX/"
                  pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$" autofocus
                  :value="this.student.linkedin_url" required />
              </div>
              <div class="modal-submit">
                <button type="submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>

        <div class="modal" v-if="modalVisible2 == true">
          <div class="modal-backdrop" @click="toggleModal2"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h2>Add CV</h2>
              <button class="modal-close" @click="toggleModal2">&times;</button>
            </div>
            <form @submit.prevent="validateAndUploadCV">
              <div class="modal-body">
                <p> Are you from Técnico?</p>
                <label>
                  <input type="radio" v-model="isFromTecnico" :value="true">
                  <p>Yes</p>
                </label>
                <label>
                  <input type="radio" v-model="isFromTecnico" :value="false">
                  <p>No</p>
                </label>
                <div class="modal-spacer"></div>
                <p> Your level of education:</p>
                <select class="input-field" v-model="educationLevel" placeholder="Your level of education" required>
                  <option value="BSc">
                    <p>BSc</p>
                  </option>
                  <option value="MSc">
                    <p>MSc</p>
                  </option>
                  <option value="Other">
                    <p>Other</p>
                  </option>
                </select>
                <div class="modal-spacer"></div>
                <p> Your CV:</p>
                <button class="cv-button" @click.stop="cv_click" type="button">
                  <p>Upload your CV</p>
                </button>
                <input hidden type="file" accept="application/pdf" ref="cv" @change="add_cv_novo" />
              </div>
              <div class="modal-submit">
                <button type="submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <ToastNotification :message="toastMessage" :type="toastType" :visible="showToast" @close="showToast = false">
    </ToastNotification>
  </div>

  <Squad></Squad>
</template>

<script>
import TheUserInfo from "@/components/UserCard/TheUserInfo.vue";
import Squad from "@/components/Squads/Squad.vue";
import UserService from "../services/user.service";
import ToastNotification from "@/components/Squads/ToastNotification.vue";
import { useUserStore } from '@/stores/UserStore';
import { mapState, mapActions } from 'pinia';
import axios from "axios";
import authHeader from "../services/auth-header";

export default {
  name: "Profile",
  components: {
    TheUserInfo, Squad, ToastNotification
  },
  data: function () {
    return {
      loading_linkedin: false,
      modalVisible: false,
      modalVisible2: false,
      cv_img: require("../assets/cv_button_img.svg"),
      link_img: require("../assets/linkedin_button_img.svg"),
      code: "",
      dialog: false,
      dialog_width: "",
      prev_length: 0,
      points: 0,
      squad: null,
      error: "",
      create_squad: false,
      loading_redeem: false,
      loading_squad: true,
      squad: null,
      student: {},
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      isFromTecnico: false,
      educationLevel: "Other",
      get_cv_files: '',
      formData: null,
    };
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserStore, ['getPoints']),

    showNotification(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
    },

    validateAndUploadCV() {
      if (this.educationLevel != "" && (this.isFromTecnico == true || this.isFromTecnico == false) && this.formData != null) {
        this.modalVisible2 = false;
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/updateIsfromTecnico", {
          student_username: this.student.username,
          tecnico: this.isFromTecnico,
          educationLevel: this.educationLevel
        }, {
          headers: authHeader()
        },).then(response => {
          UserService.addCVNOVO(this.formData).then(
            () => {
              this.student.approved_cv = false;
              this.formData = null;
              if (!this.student.uploaded_cv) {
                this.showNotification("Added CV points", "points");
                this.student.uploaded_cv = true;
              } else {
                this.showNotification("CV and other fields updated", "success");
              }
            },
            (error) => {
              console.log(response.statusCode, error);
              this.showNotification("Failed to upload, file size may be too large. Try uploading less than 600kb", "error");
            }
          );
        }).catch(error => {
          console.error("Error updating ", error);
          this.showNotification("Something bad occurred", "error");
        });

      } else {
        this.showNotification("Please fill all the fields and upload your CV.", "error");
      }
    },

    toggleModal() {
      this.modalVisible = !this.modalVisible;
    },

    toggleModal2() {
      this.modalVisible2 = !this.modalVisible2;
    },

    change_Create() {
      this.create_squad = !this.create_squad;
    },
    add_linkedin(e) {
      e.preventDefault();

      this.modalVisible = false;

      this.loading_linkedin = true;
      var url = this.$refs.linkedin_url.value;
      this.dialog = false;

      UserService.addLinkedin(url).then(
        (response) => {
          if (!this.student.linkedin_url) {
            this.showNotification("Added LinkedIn points", "points");
            this.student.linkedin_url = url;
            setTimeout(() => {
              this.getPoints();
            }, 1000);
          } else {
            this.showNotification("LinkedIn updated successfully", "success");
          }

          this.loading_linkedin = false;
        },
        (error) => {

          this.showNotification("Failed to add LinkedIn", "error");
          this.loading_linkedin = false;
        }
      );
    },

    cv_click() {
      this.$refs.cv.click();
    },
    add_cv_novo() {

      if (!this.$refs.cv.files.length) return;

      this.formData = new FormData(); // Re-initialize to ensure it's fresh
      this.formData.append('cv', this.$refs.cv.files[0]);

      // UserService.addCVNOVO(formData).then(
      //   (response) => {
      //     if (!this.student.uploaded_cv) {
      //       this.showNotification("Added CV points", "points");
      //       this.student.uploaded_cv = true;
      //     } else {
      //       this.showNotification("CV uploaded successfully. If approved, you will receive a reward", "success");
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //     this.showNotification("Failed to upload CV", "error");
      //   }
      // );
      // this.$refs.cv.value = ""; 
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
};
</script>

<style scoped>
.profile-buttons {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 2rem auto;
}

.profile-buttons> :is(button, a) {
  display: flex;
  height: 50px;
  border: none;
  background: none;
  background: linear-gradient(165deg, #605ED0 -100%, #4CC9F0 20%, #7209B7 130%);
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 0 2ch;
  gap: 2ch;
  flex-basis: 200px;
  min-width: 200px;
  flex-grow: 0.6;
  cursor: pointer;
  font-family: "Lexend Exa";
  text-decoration: none;
  flex-shrink: 0;
}

.profile-buttons> :is(button, a)>img {
  height: 70%;
  flex-shrink: 0;
}

.profile-buttons> :is(button, a)>p {
  text-align: center;
  margin: 0 auto;
  font-size: clamp(0.8rem, 4vw, 1rem);
}

.linkedin-input {
  position: absolute;
  visibility: hidden;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.modal-content {
  background: var(--color-background-sec);
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
  margin-bottom: 20px;
  position: relative;
}

.modal-header h2 {
  text-align: center;
}

.modal-header .modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.modal-header .modal-close:hover {
  scale: 1.1;
}

.modal-body>p {
  padding-bottom: 0.1rem;
}

.modal-body .modal-spacer {
  padding-bottom: 1rem;
}

.modal-body label {
  display: flex;
  gap: 1ch;
}

.modal-body > button {
  color: var(--color-background-sec);
  padding: 0.5rem 2ch;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #7f8c8d;
}

.modal-submit button {
  margin-top: 1rem;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  float: right;
}
.modal-submit button:hover {
  background-color: #3498db;
}</style>