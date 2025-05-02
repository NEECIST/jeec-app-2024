<template>
  <div class="profile">
    <div class="user-card">
      <div class="top-section">
        <div class="left-section">
          <h2 class="user-name">{{ student.name || "John Doe" }}</h2>
          <div class="user-stats">
            <span class="ticket">No Ticket</span>
            <span class="points">
              {{ student.total_points || 0 }}
              <img src="@/assets/icons/flash_home.svg" alt="Energy" />
            </span>
          </div>
        </div>

        <div class="user-wrapper">
          <UserImage :image="user.picture" variant="profile" />
        </div>
      </div>

      <div class="text-points-wrapper">
        <JEECPOT variant="profile" />
      </div>
    </div>

    <div class="profile-buttons-jeec">
      <button class="linkedin-button" @click="toggleModal">
        <img
          class="icon"
          src="@/assets/linkedin_button_img.svg"
          alt="LinkedIn"
        />
        <div class="button-text">
          <div class="button-text">
            <p v-if="student.linkedin_url === null">Submit<br />LinkedIn</p>
            <p v-else>LinkedIn<br />Submitted</p>
          </div>
        </div>
      </button>

      <button class="cv-button" @click.stop="toggleModal2">
        <img class="icon" src="@/assets/cv_button_img.svg" alt="CV" />
        <div class="button-text">
          <p>Upload</p>
          <p>your CV</p>
        </div>
      </button>
    </div>

    <div class="squad-section">
      <h2 class="squad-title">SQUAD</h2>
      <!-- <div v-if="!isInSquad"> -->
      <div v-if="true">
        <div v-if="!isCreatingSquad">
          <div class="profile-buttons-jeec">
            <button @click="change_Create" class="create-squad-button">
              <p>CREATE SQUAD</p>
            </button>
          </div>

          <div class="invites">
            <Invite
              v-for="invite in invites"
              :key="invite.id"
              :invite="invite"
              @accept="handleAcceptInvite"
              @reject="handleRejectInvite"
            />
          </div>
        </div>
        <div v-else="isCreatingSquad">
          <SquadCreation
            @return="creationReturn"
            @notification="showNotification"
          />
        </div>
      </div>
      <div v-else>
        <Squad :squad="hard_squad" />
      </div>
    </div>

    <div style="position: absolute">
      <a style="display: none" ref="see_cv" :href="cv_url">CV</a>

      <div class="modal" v-if="modalVisible == true">
        <div class="modal-backdrop" @click="toggleModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Add LinkedIn</h2>
            <button class="modal-close" @click="toggleModal">&times;</button>
          </div>
          <form @submit="add_linkedin">
            <div class="modal-body">
              <input
                type="url"
                ref="linkedin_url"
                class="input-field"
                placeholder="https://www.linkedin.com/in/XXXXX/"
                pattern="^https?://((www|\\w\\w)\\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\\w|\\d)+/?){3}))$"
                autofocus
              />
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
              <p>Are you from Técnico?</p>
              <label>
                <input type="radio" v-model="isFromTecnico" :value="true" />
                <p>Yes</p>
              </label>
              <label>
                <input type="radio" v-model="isFromTecnico" :value="false" />
                <p>No</p>
              </label>
              <div class="modal-spacer"></div>
              <p>Your level of education:</p>
              <select
                class="input-field"
                v-model="educationLevel"
                placeholder="Your level of education"
                required
              >
                <option value="BSc"><p>BSc</p></option>
                <option value="MSc"><p>MSc</p></option>
                <option value="Other"><p>Other</p></option>
              </select>
              <div class="modal-spacer"></div>
              <p>Your CV:</p>
              <button class="cv-button" @click.stop="cv_click" type="button">
                <p>Upload your CV</p>
              </button>
              <input
                hidden
                type="file"
                accept="application/pdf"
                ref="cv"
                @change="add_cv_novo"
              />
            </div>
            <div class="modal-submit">
              <button type="submit">Confirm</button>
            </div>
          </form>
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
    />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import axios from "axios";
import UserService from "../services/user.service";
import authHeader from "../services/auth-header";

// Importação de componentes
import TheUserInfo from "@/components/UserCard/TheUserInfo.vue";
import JEECPOT from "@/components/UserCard/JEECPOT.vue";
import UserImage from "@/components/UserCard/UserImage.vue";
import Squad from "@/components/Squads/Squad.vue";
import ToastNotification from "@/components/Squads/ToastNotification.vue";
import Invite from "@/components/Squads/Invite.vue";
import SquadCreation from "@/components/Squads/SquadCreation.vue";

// Variáveis de estado
const loading_linkedin = ref(false);
const modalVisible = ref(false);
const modalVisible2 = ref(false);
const code = ref("");
const dialog = ref(false);
const prev_length = ref(0);
const points = ref(0);
const squad = ref({});
const error = ref("");
const create_squad = ref(false);
const loading_redeem = ref(false);
const loading_squad = ref(true);
const student = ref({});
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const isFromTecnico = ref(false);
const educationLevel = ref("Other");
const get_cv_files = ref("");
const formData = ref(null);
const cv_url = ref("");
const percentage = ref(50);
const user = ref({}); // Tornar user reativo

const invites = ref([
  {
    id: 1,
    squad_name: "Exploradores",
    squad_cry: "Para além do limite!",
    sender_name: "João Silva",
  },
  {
    id: 2,
    squad_name: "Tech Masters",
    squad_cry: "Código é vida!",
    sender_name: "Maria Oliveira",
  },
  {
    id: 3,
    squad_name: "Engenheiros do Futuro",
    squad_cry: "Construindo o amanhã.",
    sender_name: "Carlos Ferreira",
  },
  {
    id: 4,
    squad_name: "Visionários",
    squad_cry: "Ver além do óbvio.",
    sender_name: "Ana Costa",
  },
  {
    id: 5,
    squad_name: "Inovadores",
    squad_cry: "Sempre um passo à frente.",
    sender_name: "Rui Martins",
  },
]);

const hard_squad = ref({
  name: "Teste",
  id: 1,
  cry: "For Victory!",
  members: [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
  ],
});

// Computed properties
const isInSquad = computed(() => student.value && student.value.squad);
const isCreatingSquad = computed(() => create_squad.value);

// Métodos
const showNotification = (message, type) => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
};

const validateAndUploadCV = () => {
  if (
    educationLevel.value !== "" &&
    (isFromTecnico.value === true || isFromTecnico.value === false) &&
    formData.value !== null
  ) {
    modalVisible2.value = false;
    axios
      .post(
        `${process.env.VUE_APP_JEEC_BRAIN_URL}/student/updateIsfromTecnico`,
        {
          student_username: student.value.username,
          tecnico: isFromTecnico.value,
          educationLevel: educationLevel.value,
        },
        {
          headers: authHeader(),
        }
      )
      .then(() => {
        UserService.addCVNOVO(formData.value).then(
          () => {
            student.value.approved_cv = false;
            formData.value = null;
            if (!student.value.uploaded_cv) {
              showNotification("CV Submitted", "points");
              student.value.uploaded_cv = true;
            } else {
              showNotification("CV and other fields updated", "success");
            }
          },
          (error) => {
            console.log(error);
            showNotification(
              "Failed to upload, file size may be too large. Try uploading less than 600kb",
              "error"
            );
          }
        );
      })
      .catch((error) => {
        console.error("Error updating ", error);
        showNotification("Something bad occurred", "error");
      });
  } else {
    showNotification("Please fill all the fields and upload your CV.", "error");
  }
};

const toggleModal = () => {
  modalVisible.value = !modalVisible.value;
};

const toggleModal2 = () => {
  modalVisible2.value = !modalVisible2.value;
};

const change_Create = () => {
  create_squad.value = !create_squad.value;
};

const creationReturn = () => {
  create_squad.value = false;
};

const handleAcceptInvite = (inviteId) => {
  // Handle the acceptance of the invite
  console.log(`Accepted invite with ID: ${inviteId}`);
};

const handleRejectInvite = (inviteId) => {
  // Handle the rejection of the invite
  console.log(`Rejected invite with ID: ${inviteId}`);
};

const add_linkedin = (e) => {
  e.preventDefault();

  modalVisible.value = false;
  loading_linkedin.value = true;
  const url = $refs.linkedin_url.value;
  dialog.value = false;

  UserService.addLinkedin(url).then(
    (response) => {
      if (!student.value.linkedin_url) {
        showNotification("Added LinkedIn points", "points");
        student.value.linkedin_url = url;
        setTimeout(() => {
          getPoints();
        }, 1000);
      } else {
        showNotification("LinkedIn updated successfully", "success");
      }

      loading_linkedin.value = false;
    },
    (error) => {
      showNotification("Failed to add LinkedIn", "error");
      loading_linkedin.value = false;
    }
  );
};

const cv_click = () => {
  $refs.cv.click();
};

const add_cv_novo = () => {
  if (!$refs.cv.files.length) return;

  formData.value = new FormData();
  formData.value.append("cv", $refs.cv.files[0]);
};

const see_cv = () => {
  if (student.value.uploaded_cv) {
    UserService.getCV().then(
      (response) => {
        const raw = atob(response.data.data);
        const uint8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          uint8Array[i] = raw.charCodeAt(i);
        }
        const fileBlob = new Blob([uint8Array], {
          type: response.data["content-type"],
        });
        const objetURL = window.URL.createObjectURL(fileBlob);

        cv_url.value = objetURL;

        $refs.see_cv.href = objetURL;
        $refs.see_cv.click();
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

// Substituir onCreated() por onMounted()
onMounted(() => {
  const userStore = useUserStore();
  user.value = userStore.user; // Atribuindo o valor corretamente

  UserService.getUserStudent().then(
    (response) => {
      student.value = response.data.data;
      student.value.squad = null;
      create_squad.value = false;
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>


<style scoped>
.user-card {
  background-color: #199cff1a;
  border: 1.5px solid #199cff;
  border-radius: 20px 60px 20px 20px;
  padding: 1rem 1.5rem;
  width: 90%;
  max-width: 650px;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-points-wrapper {
  width: 100%;
  margin-top: 0.5rem;
}

.user-name {
  font-size: 2rem;
  color: white;
  font-weight: 700;
  font-family: "Lexend Exa", sans-serif;
  margin: 0;
}

.user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.ticket,
.points {
  border: 2px solid #199cff;
  padding: 0.3rem 0.6rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 100;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.points img {
  height: 0.9rem;
  vertical-align: middle;
}

.user-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-buttons-jeec {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}

.profile-buttons-jeec button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: #199cff;
  border: none;
  border-radius: 12px;
  color: white;
  padding: 0.6rem 1rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 550;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-align: left;
  flex: none;
  letter-spacing: 0.1em;
}

.profile-buttons-jeec button:hover {
  transform: scale(1.02);
}

.profile-buttons-jeec .icon {
  height: 1.8rem;
  width: auto;
}

.button-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1.1rem;
}

.section-title {
  color: white;
  text-align: center;
  font-size: 2rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 700;
  text-shadow: 0 0 10px #199cff;
  margin-top: 3rem;
}

.create-squad-button {
  background-color: #199cff;
  border: none;
  border-radius: 12px;
  color: white;
  padding: 0.5rem 1rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-transform: uppercase;
  width: auto;
}

.create-squad-button:hover {
  transform: scale(1.02);
}

.squad-section {
  text-align: center;
  margin-top: 2rem;
}

.squad-title {
  font-family: "Lexend Exa", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: white;
  text-shadow: 0 0 10px #199cff;
  margin-bottom: 1rem;
}

.create-squad-button {
  background-color: #199cff;
  border: none;
  border-radius: 15px;
  color: white;
  padding: 0.8rem 1rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 182px;
  margin: 0 auto;
  transition: transform 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.create-squad-button:hover {
  transform: scale(1.02);
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
  background: var(--color-background-sec, #1e1e2f);
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
  color: white;
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
  color: white;
}

.modal-header .modal-close:hover {
  scale: 1.1;
}

.modal-body > p {
  padding-bottom: 0.1rem;
  color: white;
}

.modal-body .modal-spacer {
  padding-bottom: 1rem;
}

.modal-body label {
  display: flex;
  gap: 1ch;
  color: white;
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
  font-family: inherit;
}

.modal-submit button {
  margin-top: 1rem;
  background-color: #199cff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  float: right;
}

.modal-submit button:hover {
  background-color: #42b5ff;
}
</style>
