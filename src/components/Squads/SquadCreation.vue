<template>
  <div class="squad-creation">
    <div class="squad-create">
      <div>
        <input
          type="text"
          placeholder="New Squad"
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
     
      <!-- Image Section -->
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
     
      <!-- Other parts of your template remain unchanged -->
      
        <button @click.stop="create_squad" class="button" v-if="!loading">
              <span class="plus-symbol">⊕</span> Create squad
        </button> 
      
      <v-progress-circular
        v-else
        style="margin-top: 3vh"
        indeterminate
        color="#27ade4"
        :size="80"
        :width="8"
        class="loading-bar"
      ></v-progress-circular>
      <p class="error-msg">{{ error }}</p>
    </div>
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
      currentImage: require('../../assets/logo.png'),  // Default image
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
      // Trigger the file input
      this.$refs.image_input.click();
    },
    input_file(event) {
      this.files = event.target.files;

      if (this.files.length == 1) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.currentImage = e.target.result; // File content will be used as an image source
          this.image_uploaded = true;
        };

        reader.readAsDataURL(this.files[0]);
      }
    },
    // Method to convert image URL to Blob
    async getDefaultImageBlob() {
      const response = await fetch(require('../../assets/logo.png')); // path to your default image
      const data = await response.blob(); // convert HTTP response to Blob
      return new File([data], "default-image.png", { type: 'image/png' }); // return blob as File
    },
    
    async create_squad() {
      if (!this.nameExists){
        this.error = "Invalid information for new squad - Name cannot be left blank";
        return;
      }
      this.loading = true;

      let imageData;
      if (this.files.length > 0) {
        // If user uploaded file, use it
        imageData = this.files[0];
      } else {
        // Otherwise, use default image as Blob (treated as File)
        imageData = await this.getDefaultImageBlob();
      }

      // Now, 'imageData' is a File object whether it's a user-uploaded file or the default image.

      // Assuming 'UserService.createSquad' needs FormData, we can create it like this:
      const formData = new FormData();
      formData.append('file', imageData); // append the image file to the FormData
      formData.append('name', this.name);
      formData.append('cry', this.cry);

      await UserService.createSquad(formData)
        .then((response) => {
          // handle success
          this.$emit("create", response.data.data);
          this.error = "";
          this.$emit("notification", "Squad created successfully", "success");
          this.loading = false;
        })
        .catch((error) => {
          // handle error
          this.error = error.response.data.error;
          console.log(error);
          this.$emit("notification", "Failed to create squad", "error");
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
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display:flex;
  justify-content: space-around;
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
  font-size: 2.5vh;
  font-weight: 600;
  margin-top:2vh;
  margin-bottom:2vh;
  padding-left: 2vw;
  width: 30vw;
  min-width:200px;
  height: 6vh;
  background: rgba(26, 156, 216, 0.15);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  border-left: 13px solid #1A9CD8
}

.input_exists {
  border: 0.1vh solid #27ade4 !important;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #27ade4 !important;
}

.button {
  font-size: 4vh;
  font-weight: 600;
  width: auto;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 10vw;
  margin-right: 1vw;
  margin-top: 4vh;
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
