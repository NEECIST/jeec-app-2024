<template>
  <div>
    <!-- User:
    {{ user }}
    next_activity:
    {{ next_activity }}
    prizes
    {{ prizes }}
    cv_info
    {{ cv_info }} -->
    <div class="card top radient-border-passthrough">      
      <template v-if="next_activity!=null">
        <h2>UP NEXT</h2>
        <div class="top-container">
          <div class="top-text">
            <p>
              {{ next_activity.activity_type }}
            </p>
            <p>
              {{ next_activity.name }}
            </p>
            <p>
              {{ next_activity.start_time }} {{ next_activity.end_time }}
            </p>
          </div>
          <div class="image-container">
            <div v-for="image in next_activity.images" :key="image" >
              <img :src="jeec_brain_url + image" class="activity-img" :class="{size2:next_activity.images.length==2,size3:next_activity.images.length==3,size4:next_activity.images.length>3}">
            </div>
          </div>
        </div>
      </template>
      <template v-else class="no-more-activities">
        <div>
          <p>There are no more activities scheduled</p>
        </div>
      </template>
    </div>

    <div class="middle">
      <!-- {{ prizes }} -->
      <div v-if="prizes.img_solo_daily_prize != null || prizes.img_squad_daily_prize != null" class="mid-component">
        <h1>TODAY'S PRIZE</h1>
        
        <div>
          <p>SOLO</p>
            
          <div class="reward-img">
            <img :src="jeec_brain_url + prizes.img_solo_daily_prize" class="activity-img">
          </div>

        </div>

        <div>
          <p>SQUAD</p>
          <!-- {{ prizes.img_squad_daily_prize }} -->
          <div class="reward-img">
            <img :src="jeec_brain_url + prizes.img_squad_daily_prize" class="activity-img"> 
          </div>

        </div>
        
        
      </div>
      <div v-else>
        NO PRIZES TODAY
      </div>
    </div>

    <div class="bottom">
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

<script>
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'

export default {
  name: "Home",
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  data: function () {
    return {
      cv_logo:require("../assets/cv_b-11 1.png"),
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      prizes: {
        img_solo_daily_prize: '',
        img_squad_daily_prize: '',
        solo_ranking: '',
        squad_ranking: '',
      },
      next_activity : {
        name: "",
        start_time: "",
        end_time: "",
        activity_type: "",
        images: null
      },
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

  //   axios
  //     .get(
  //       process.env.VUE_APP_JEEC_BRAIN_URL + "/student/next_activity",
  //       {
  //         headers: authHeader()
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response)
  //       const data = response.data
  //       this.next_activity = data.activity
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
.home {
  background-color: #FFFCF8;
  display:flex;
  flex-direction: column;
  justify-content:space-around;
  position:absolute;
  height:auto;
  padding-bottom:20vh;
}

.top {
  --border-radius: 50px 0 0 20px;
  --border-width: 2.5px;

  width: 80%;
  max-width: 800px;
  padding: 1rem;

  margin-top: 0.5rem;
  margin-bottom:3rem;
  margin: 0 auto;
}
.top::before {
  content: "";
}
.middle {
  position: relative;
  margin-top: 1vh;
  margin-bottom:8vh;
  background-color: rgba(26, 156, 216, 0.15);
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 4vw;
  padding-right: 4vw;
  display:flex;
  justify-content: space-evenly;
  width:80vw;
  height:auto;
  margin-left:10vw;
  margin-right:10vw;
  border-radius:35px;
  align-items:start;
}

.main

.main-title h1 {
  font-weight:1000;
  font-size: 40px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  color:white;
}

.top-container{
  display:flex;
  justify-content: space-around;
  height:auto;
}
.main-title p{
  font-family: Montserrat;
  font-weight:600;
  font-size: 24px;
  text-align: left;
  color:white;
  margin-bottom:-5px;
}

.no-more-activities{
  font-family: Montserrat;
  font-weight:800;
  font-size: 35px;
  text-align: center;
  vertical-align: middle;
  color:white;
}

.mid-component h1{
  color:#03618C;
  font-family: Montserrat;
  font-weight:bold;
  font-size: 24px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  margin-bottom:10px;
}

.mid-component p{
  color:#03618C;
  font-family: Montserrat;
  font-weight:bold;
  font-size: 18px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  margin-top:10px;
  width:30vw;
}




.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left:auto;
  margin-right:auto;
}

.quest-img {
  position: relative;
  top:-2.5vh;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  object-fit: cover;
}

.activity-img {
  align-self: right;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left:auto;
  margin-right:auto;
  object-fit: contain;
  margin-left:2vh;
  margin-right:2vh;
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
    position: relative;
    margin-top: 1vh;
    background-color: rgba(26, 156, 216, 0.15);
    padding-top: 1vh;
    padding-bottom: 4vh;
    padding-left: 4vw;
    padding-right: 4vw;
    display:flex;
    justify-content: space-around;
    height:auto;
    width:80vw;
    margin-left:10vw;
    margin-right:10vw;
    border-radius:35px;
    padding:10px;
    align-items:center;
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
