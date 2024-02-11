<template>
  <div class="center">
    <div class="podium">
            <div class="stand_2" v-if="other_rankingdata.length>1">
              <div class="img-wrapper radient-border-passthrough">
                <img :src="ProcessImg(other_rankingdata[1].photo)" class="podium-img">
              </div>            
              <p class="podium-text">{{other_rankingdata[1].name}}</p>
              <div class="pilar_2">
                <span :id="'number-2'" class="number">2</span><sup class="super_2">nd</sup>
              </div> 
              <div :id="'line-silver'" class="line"></div>
            </div>
            <div class="stand_1" v-if="other_rankingdata.length>0">
              <div class="img-wrapper radient-border-passthrough">
                <img :src="ProcessImg(other_rankingdata[0].photo)" class="podium-img">
              </div>
              <p class="podium-text">{{other_rankingdata[0].name}}</p>
              <div class="pilar_1">
                <span :id="'number-1'" class="number">1</span><sup class="super_1">st</sup>
              </div>
              <div :id="'line-gold'" class="line"></div>
            </div>
            <div class="stand_3" v-if="other_rankingdata.length>2">
              <div class="img-wrapper radient-border-passthrough">
                <img :src="ProcessImg(other_rankingdata[2].photo)" class="podium-img">
              </div>
              <p class="podium-text">{{other_rankingdata[2].name}}</p>
              <div class="pilar_3">
                <span :id="'number-3'" class="number">3</span><sup class="super_3">rd</sup>
              </div>
              <div :id="'line-bronze'" class="line"></div>
            </div>
    </div>
  </div>
    
      <div class="center">
        <div v-if="!show && flag" class="top_10">
            <div class="box">
              <div class="student_ranking_number">
                <p>{{ user_ranking }}th</p>
              </div>
            </div>

            <div class="student_name">
              <p>{{ identity }}</p> 
            </div>

            <div class="student_xp">
              <p>{{ user_points }} xp</p>
            </div>
          

        </div>
      </div>
        
      <div class="center">
        <div v-if="show">
          <div v-for="index in 7" :key="index">
            <div class="top_10">
              <div class="box">
                <div class="student_ranking_number">
                  <p>{{ index + 3 }}th</p>
                </div>
              </div>
              

              <div class="student_name">
                <p>{{ other_rankingdata[index + 2].name }}</p>
              </div>

              <div class="student_xp">
                <p>{{ other_rankingdata[index + 2].points }} xp</p>
              </div>
            </div>
          </div>

        </div>
      </div>
        
      <div class="center">
        <div @click="show = !show" class="dropdown">
          <div><img :src="arrow" class="arrow"></div>
        </div>
      </div>  
  

</template>

<script>
import arrow from "../assets/chevron-compact-down.svg"

export default {
  name: "Rank",
  data: function () {
    return {
      show:false,
      arrow:arrow,
      Image:Image,
    };
  },
  props: {
    other_rankingdata: Object,
    user_ranking: Number,
    user_points: Number,
    identity: String,
    flag: Boolean,
  },
  computed: {

  },
  methods: {
    ProcessImg(image) {
      let photo = "data:image/png;base64," + image;
      return photo;
    }
  },
};
</script>

<style scoped>
:root {
  --color-dark: #1F1F1F;
}


.center{
  display: flex;
  justify-content: center;
}

.top_10{
  width: 85vw;
  height: 4.5vh;
  display: flex;
  font-family: "Lexend Exa";
  color: white;
  position: relative;
  background-color: #4CC9F0;
}

.student_name{
  display: flex;
  flex: 1;
  justify-content: start;
  align-items: center;
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.7vh;
  font-weight: 600;
  letter-spacing: 0.4vw;
}

.student_ranking_number{
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 6vw;
  height: 6vw;
  font-size: 2.1vw;
  background-color: #6D3F0B;
  border-radius: 100%;
}

.student_xp{
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.3vh;
  font-weight: 600;
  width: 20vw;
}

.dropdown{
  width: 40vw;
  height: 3.5vh;
  display: flex;
  position: relative;
  background-color: #4CC9F0;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 10vw 10vw;
}


.box {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 15vw;
  margin-left: 3vw;
}

.line {
  width: 100%;
  height: 5px;
  bottom: 0px;
  position: absolute;
}

.line::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%);
  mix-blend-mode: luminosity;
}

.line::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(339deg, rgba(255, 255, 255, 0.00) 52.79%, #FFF 95.95%);
  mix-blend-mode: overlay;
}

#line-gold {
  background-color: #C1A875;
}

#line-silver {
  background-color: #CDC9C2;
}

#line-bronze {
  background-color: #C9705C;
}

.number {
  position: relative;
  text-align: center;
  font-family: "Russo One";
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number::before {
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%);
  mix-blend-mode: luminosity;
}

.number::after {
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(339deg, rgba(255, 255, 255, 0.00) 52.79%, #FFF 95.95%);
  mix-blend-mode: overlay;
}

#number-1 {
  font-size: 5.5vh;
  background-color: #C1A875;
}

#number-2 {
  font-size: 4.5vh;
  background-color: #CDC9C2;
}

#number-3 {
  font-size: 3.5vh;
  background-color: #C9705C;
}

.super_1{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background-image: linear-gradient(90deg, #844414 0%, #c7801d 20%, #ffe233 50%, #c7801d 80%, #844414 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.super_2{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: linear-gradient(90deg, #787878 0%, #b5b5b5 25%, #e3e3e3 50%, #b5b5b5 75%, #787878 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.super_3{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: linear-gradient(90deg, #844414 0%, #cf7d52 25%, #fcd5be 50%, #cf7d52 75%, #844414 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.podium{
  width: 85vw;
  display:flex;
  justify-content: space-between;
  align-items: end;
}

.pilar_1{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 7vh;
}
.pilar_2{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 6vh;
}

.pilar_3{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 4vh;
}


.podium-text{
  color: var(--Greyish-White, #E7E7E7);
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.7vh;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.img-wrapper {
  --border-radius: 50%;
  overflow: hidden;
  width: 80%;
  aspect-ratio: 1;
  margin: 0 auto;
}

.img-wrapper::before{
  content: "";
}
.podium-img{
  width:100%;
  height: 100%;
  object-fit: cover;
}

.stand_1{
  position: relative;
  width:27vw;
  height: 25vh;
  background-color: #4CC9F0;
}
.stand_2{
  position: relative;
  width:27vw;
  height: 21vh;
  background-color: #4CC9F0;
}
.stand_3{
  position: relative;
  width:27vw;
  height: 18vh;
  background-color: #4CC9F0;
}




</style>