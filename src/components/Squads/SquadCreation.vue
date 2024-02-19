<template>
  <div class="create-squad radient-border-passthrough" :class="{ expanded: expanded }">
    <button @click="expanded = !expanded">Create Squad</button>
    <div class="create-modal" :aria-hidden="expanded" :inert="!expanded">
      <div class="name-image">
        <input class="create-name" :class="{ input_exists: name.length }" type="text" placeholder="Name for the squad..."
          v-model="name" @input="validateInput" maxlength="25" minlength="4"/>

        <button class="create-image radient-border-passthrough" @click.stop="input_click">
          <p v-if="!image_uploaded">add picture</p>
          <img v-if="image_uploaded" :src="currentImage" alt="uploaded-image" ref="uploaded_image">
          <div class="plus-symbol">&plus;</div>
          <input type="file" accept="image/*" ref="image_input" @change="input_file" style="display: none" />
        </button>
      </div>
      <div class="motto">
        <p>Motto</p>
        <div class="create-motto radient-border-passthrough">
          <input :class="{ input_exists: cry.length }" type="text" placeholder="Your Squad Motto..." v-model="cry" maxlength="60"/>
        </div>
      </div>

      <button class="create-submit" @click.stop="create_squad" v-if="!loading">Create</button>

      <p class="error-msg">{{ error }}</p>
    </div>
  </div>

  <div>
    <ToastNotification :message="toastMessage" :type="toastType" :visible="showToast" @close="showToast = false">
    </ToastNotification>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import ToastNotification from "@/components/Squads/ToastNotification.vue";

export default {
  name: "SquadCreation",
  components: {
    ToastNotification
  },
  data: function () {
    return {
      files: [],
      image_uploaded: false,
      currentImage: require('../../assets/jeec_colour_no_edition_transparent.svg'),
      name: "",
      cry: "",
      error: "",
      loading: false,
      locked: true,
      expanded: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
    };
  },
  // other computed properties...
  methods: {
    showNotification(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
    },
    input_click() {
      this.$refs.image_input.click();
    },
    input_file(event) {
      this.files = event.target.files;

      if (this.files.length == 1) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.currentImage = e.target.result;
          this.image_uploaded = true;
        };

        reader.readAsDataURL(this.files[0]);
      }
    },
    // Method to convert image URL to Blob
    async getDefaultImageBlob() {
      const response = await fetch(require('../../assets/jeec_mobile_white.svg'));
      const data = await response.blob();
      return new File([data], "default-image.svg", { type: 'image/svg' });
    },

    async create_squad() {
      if (!this.nameExists) {
        this.error = "Invalid information for new squad - Name cannot be left blank";
        return;
      } else if (!this.cryExists) {
        this.error = "Invalid information for new squad - Motto cannot be left blank";
        return;
      }
      this.loading = true;

      let imageData;
      if (this.files.length > 0) {
        imageData = this.files[0];
      } else {
        imageData = await this.getDefaultImageBlob();
      }

      const formData = new FormData();
      formData.append('file', imageData);
      formData.append('name', this.name);
      formData.append('cry', this.cry);

      await UserService.createSquad(formData)
        .then((response) => {
          // handle success
          this.$emit("create", response.data.data);
          this.error = "";
          this.loading = false;
          this.$router.go()
        })
        .catch((error) => {
          // handle error
          this.error = error.response.data.error;
          console.log(error);
          this.loading = false;
          this.error = "Squad name already taken";
          // this.showNotification("Squad already exists", "error");
        });
    },
  },
  computed: {
    nameExists() {
      return this.name.trim().length > 0;
    },
    cryExists() {
      return this.cry.trim().length > 0;
    }
  },
};
</script>


<style scoped>
.create-squad {
  max-height: 70px;
  max-width: 600px;
  overflow: hidden;
  margin: 0 auto;
  transition: max-height 0.8s ease;
  
  --border-radius: 35px;
}
.create-squad.expanded {
  max-height: 600px;
  transition: max-height 0.8s ease;
}
.create-squad::before {
  content: "";
}

.create-squad > button {
  height: 70px;
  width: 100%;
  font-family: "Lexend Exa";
  font-size: clamp(1.6rem, 6vw, 2rem);
  letter-spacing: 3px;
  color: #4CC9F0;
  background: none;
  border: none;
  cursor: pointer;
}
.create-squad > button:hover {
  background: radial-gradient(ellipse 150% 150% at 15% 0%, rgba(76, 202, 240, 0.14) 0%, rgba(76, 202, 240, 0.08) 70%, rgba(76, 202, 240, 0) 100%);
}
.create-modal {
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
}
.create-modal .name-image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.create-name {
  font-size: clamp(1.2rem, 6vw, 2rem);
  background: none;
  border: none;
  color: var(--color-font);
}
.create-name::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.create-image {
  width: 120px;
  min-width: 90px;
  aspect-ratio: 1;
  border: none;
  display: flex;
  position: relative;
  cursor: pointer;

  --border-radius: 50%;
}

.create-image::before {
  content: "";
}

.create-image p {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  text-transform: uppercase;
  color: #1A9CD8;
  font-weight: 600;
}

.create-image .plus-symbol {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  font-size: 1.2rem;
  aspect-ratio: 1;
  border: #1A9CD8 2px solid;
  background: linear-gradient(45deg, #1A9CD8, #60cdff);
}

.create-image img {
  height: 100%;
  width: 100%;
  object-fit: fill;
  border-radius: 50%;
}

.motto {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.motto p {
  font-size: 1.2rem;
  min-width: max-content;
}

.create-motto {
  flex-grow: 1;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;

  --border-radius: 25px;
  --border-width: 1.5px;
  --background: radial-gradient(ellipse 250% 200% at 0% 0%, rgba(114, 9, 183, 0.14), rgba(114, 9, 183, 0.08) 60%, rgba(114, 9, 183, 0));
  --border-background: linear-gradient(165deg, #7209B7, #A414A4 40%, #7209B7);
}

.create-motto::before {
  content: "";
}

.create-motto input {
  background: none;
  border: none;
  color: var(--color-font);
  font-family: "Lexend Deca";
  width: 100%;
  font-size: 1.1rem;
}

.create-submit {
  margin: 0 auto;
  margin-top: 2.5rem;
  max-width: 300px;
  padding: 0.5rem 2ch;
  font-size: 1.4rem;
  background: linear-gradient(165deg, #605ED0 -100%, #4CC9F0 20%, #7209B7 130%);
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.create-modal .error-msg {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: red;
  margin-top: 1rem;
}

@media screen and (max-width: 500px) {
  .motto {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .motto p {
    font-size: 1.4rem;
  }
}
</style>
