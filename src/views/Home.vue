<template>
  <div>
    
    <HomeActivities class="card radient-border-passthrough"></HomeActivities>
    <HomePrizes class="card radient-border-passthrough"></HomePrizes>

    <div class="card bottom">
        <div v-if="cv_info.uploaded_cv == false || cv_info.uploaded_cv == null" class="cv-text">
          <p> Still didn’t add your CV?
            Do it and pass by our check in to win a surprise reward  </p>
        </div>
        <div v-if="cv_info.uploaded_cv == true && (cv_info.approved_cv == false || cv_info.approved_cv == null)" class="cv-text">
          <p> CV in validation process! </p>
        </div>
        <div v-if="cv_info.uploaded_cv == true && cv_info.approved_cv == true" class="cv-text">
          <p> You already submited your CV! </p>
        </div>
      <router-link :to="{ name: 'Profile' }">
        <img :src="cv_logo" class="cv-img">
      </router-link>
      
    </div>

  </div>
</template>

<script setup>
import HomeActivities from '@/components/HomeActivities.vue';
import HomePrizes from '@/components/HomePrizes.vue';
</script>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      cv_logo:require("../assets/cv_b-11 1.png"),
      cv_info : {
        uploaded_cv: "",
        approved_cv: "",
      },
    };
  },
  // mounted(){
  //   axios
  //     .get(
  //       process.env.VUE_APP_JEEC_BRAIN_URL + "/student/cv_info",
  //       {
  //         headers: authHeader()
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response)
  //       const data = response.data
  //       this.cv_info = data.cv_info
  //     })

  //     axios
  //       .get(
  //         process.env.VUE_APP_JEEC_BRAIN_URL + "/student/reward",
  //         {
  //           headers: authHeader()
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response)
  //         const data = response.data
  //         this.prizes = data.prizes
  //       })
  // },
};
</script>

<style scoped>
.card {
  --border-radius: 30px;
  --border-width: 2.5px;

  width: 80%;
  max-width: 800px;
  
  padding: 1rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom:3rem;
}
.card::before {
  content: "";
}
.cv-img{
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid rgba(0, 0, 0, 0);;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
}

.cv-text{
    text-align:center;
    width:30vw;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 16px;
    color:#03618C;
  }
  .quest-text{
    text-align:center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 16px;
    color:#03618C;
  }

  .quest-text h3{
    position:relative;
    top: 5vh;
  }

  .quest-info{
    display:flex;
    justify-content: space-evenly;
    width:80vw;
  }

  .bottom{
    background: radial-gradient(ellipse 200% 200% at 50% 100%, rgba(76, 201, 240, 0.3) 0%, rgba(76, 201, 240, 0.03) 45%, rgba(76, 201, 240, 0) 100%);
    backdrop-filter: blur(40px);
  }

  .image-container{
    display:flex;
    flex-wrap: wrap;
  }

  .size2{
    height: 9vh;
    width: 9vh;
  }
  .size3{
    height: 7vh;
    width: 7vh;
  }
  .size4{
    height: 5vh;
    width: 5vh;
  }

</style>
