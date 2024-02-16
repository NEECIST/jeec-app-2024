<template>
  <div class="squad-creation">
    <div class="squad-create">
      <div>
        <h2> SQUAD </h2>
        <input
          type="text"
          placeholder="Squad Name"
          v-model="name"
          class="squad-input"
          :class="{ input_exists: name.length }"
          @input="validateInput"
        />
        <br>
        <input
          type="text"
          placeholder="Motto"
          v-model="cry"
          class="squad-input"
          :class="{ input_exists: cry.length }"
          />
      </div>
     
      <div v-if="!image_uploaded" class="image-input disabled" @click.stop="input_click">
        <p>Add<br />Photo</p>
      </div>
      <input
        type="file"
        accept="image/*"
        ref="image_input"
        @change="input_file"
        style="display: none"
      />
      <img
        v-if="image_uploaded"
        @click.stop="input_click"
        class="squad-image"
        :src="currentImage"  
        alt="uploaded-image"
        ref="uploaded_image"
      />
     
      <button @click.stop="create_squad" class="button" v-if="!loading">
        Create Squad
      </button> 
      <p class="error-msg">{{ error }}</p>
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

</template>

<script>
import UserService from "../../services/user.service";

export default {
  name: "SquadCreation",
  data: function () {
    return {
      files: [],
      image_uploaded: true,
      currentImage: require('../../assets/jeec_colour_no_edition_transparent.svg'),  
      name: "",
      cry: "",
      error: "",
      loading: false,
      locked: true,
    };
  },
  // other computed properties...
  methods: {
    
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
      const response = await fetch(require('../../assets/logo.png')); 
      const data = await response.blob(); 
      return new File([data], "default-image.png", { type: 'image/png' });
    },
    
    async create_squad() {
      if (!this.nameExists){
        this.error = "Invalid information for new squad - Name cannot be left blank";
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
        })
        .catch((error) => {
          // handle error
          this.error = error.response.data.error;
          console.log(error);
          this.loading = false;
        });
        this.$router.go()
    },
  },
  computed: {
    nameExists() {
      return this.name.trim().length > 0;
    }
  },
};
</script>


<style scoped>


.squad-creation-title{
  text-align:center;
  font-size:8vw;
  font-weight: 600;
}

.n-squad-header {
  background-color: #FFFCF8;
  padding: 2vh;
  text-align: center;
  font-size: 2.5vh;
  font-weight: 600;
  margin-bottom: 0.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-squad-header p {
  margin: 0;
  padding-top: 0.8vh;
  padding-bottom: 0.8vh;
}

.squad-create {
  background-color: #2c3e50; 
  border-radius: 20px;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-input {
  background-color: white;
  border-radius: 50%;
  border: 5px solid #03618C;
  height: 13vh;
  width: 13vh;
  position: relative;
  cursor: pointer;
}

.image-input p {
  text-align: center;
  vertical-align: middle;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5vh;
  font-weight: 600;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 5px solid #03618C;
  cursor: pointer;
}

.squad-input {
  background: #27ade4;
  border: none;
  border-radius: 5px;
  margin: 1vh 0;
  padding: 1vh;
  width: 80%; 
  color: white;
  font-size: 3vh; 
}

.squad-input::placeholder {
  color: rgba(255, 255, 255, 0.7); 
}

.input_exists {
  border: 0.1vh solid #27ade4 !important;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #27ade4 !important;
}

.button {
  background-color: #03618C; 
  color: white; 
  border: none;
  border-radius: 5px;
  padding: 2vh 4vh;
  font-size: 3vh; 
  cursor: pointer; 
  margin-top: 2vh;
}

.button:hover {
  background-color: #0272a4; 
}

.plus-symbol{
  color:  #03618C;

}

.error-msg {
  text-align: center;
  font-size: 4vh;
  font-weight: 700;
  color: red;
  margin-top: 2vh;
}
</style>
