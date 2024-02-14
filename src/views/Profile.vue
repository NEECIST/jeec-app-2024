<template>
  <div class="profile">
    <TheUserInfo variant="nav"></TheUserInfo>
    <div class="cv-linkedin">
      <div class="cv">
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
      </div>


      <div class="modal" v-if="modalVisible2 == true">
        <div class="modal-content">
          <div class="modal-header">
            <h4 style="text-align: center;">Add CV</h4>
            <button class="close-button" @click="toggleModal2">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="validateAndUploadCV">
              <p> Are you from Técnico?</p>
              <label>
                <input type="radio" v-model="isFromTecnico" :value="true" >
                Yes
              </label>
              <label>
                <input type="radio" v-model="isFromTecnico" :value="false">
                No
              </label>
              <br />
              <p> Your level of education:</p>
              <select class="input-field" v-model="educationLevel" placeholder="Your level of education" required>
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
                <option value="Other">Other</option>
              </select>
              <br />
              <p> Your CV:</p>
              <button  @click.stop="cv_click" type="button">
                <img :src="cv_img" alt="">
                <p>Upload your CV</p>
              </button>
              <input hidden type="file" accept="application/pdf" ref="cv" @change="add_cv_novo"/>
              <br />
              <div class="center-container">
                <button class="submit-button" type="submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="linkedin">
        <button @click="toggleModal">
          <img :src="link_img" alt="">
          <p>{{ student.linkedin_url === null ? 'Submit your LinkedIn' : 'LinkedIn Submitted' }}</p>
        </button>
      </div>

      <div v-if="this.student.uploaded_cv == true" class="linkedin">
        <button @click="see_cv">
          <img :src="cv_img" alt="">
          <p>See CV</p>
        </button>
      </div>

      <div class="linkedin" @click="redirectToform">
        <button>
          <p> Ordem dos engenheiros form</p>
        </button>
      </div>

      <a
        style="display: none"
        ref="see_cv"
        :href="cv_url"
        :download="this.student.username + '_cv.pdf'"
        >CV</a
      >
    
      <div class="modal" v-if="modalVisible == true">
        <div class="modal-content">
          <div class="modal-header">
            <h4 style="text-align: center;">Add LinkedIn</h4>
            <button class="close-button" @click="toggleModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit="add_linkedin">
              <input
                type="url"
                ref="linkedin_url"
                class="input-field"
                placeholder="https://www.linkedin.com/in/XXXXX/"
                pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$"
                autofocus
                :value="this.student.linkedin_url"
                required
              />
              <br />
              <div class="center-container">
                <button class="submit-button"  type="submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  </div>

  <div>
    <ToastNotification
      :message="toastMessage"
      :type="toastType"
      :visible="showToast"
      @close="showToast = false"
    ></ToastNotification>
  </div>

  <Squad></Squad>
  
</template>

<script>
import TheUserInfo from "@/components/UserCard/TheUserInfo.vue";
import Squad from "@/components/Squads/Squad.vue";
import UserService from "../services/user.service";
import ToastNotification from "@/components/Squads/ToastNotification.vue";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';
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

    redirectToform() {
      window.location.href = 'https://www.google.com';
    },

    showNotification(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
    },

    validateAndUploadCV() {
      if(this.formData == null) {
        console.log('aquiiii')
      }
      if (this.educationLevel != "" && (this.isFromTecnico == true || this.isFromTecnico == false) && this.formData != null) {
        this.modalVisible2 = false;
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/updateIsfromTecnico",{
            student_username: this.student.username, 
            tecnico: this.isFromTecnico,
            educationLevel: this.educationLevel
          }, {
            headers: authHeader()
          }, ).then(response => {
                  UserService.addCVNOVO(this.formData).then(
                    () => {
                      if (!this.student.uploaded_cv) {
                        this.showNotification("Added CV points", "points");
                        this.student.uploaded_cv = true;
                      } else {
                        this.showNotification("CV and other fields updated", "success");
                      }
                    },
                    (error) => {
                      console.log(error);
                      this.showNotification("Failed to upload CV", "error");
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #2c3e50;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.modal-header {
  border-bottom: 1px solid #34495e;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #ecf0f1;
}

.modal-body {
  color: #ecf0f1;
}

.close-button {
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.5rem;
  cursor: pointer;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #7f8c8d;
  box-sizing: border-box;
}

.submit-button {
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {
  background-color: #3498db;
}

.center-container {
  display: flex;
  justify-content: center;
}

</style>