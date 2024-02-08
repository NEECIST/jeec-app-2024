<template>
  <div class="center">
    <div class="podium">
            <div class="stand_2" v-if="other_rankingdata.length>1">
              <img :src="ProcessImg(other_rankingdata[1].photo)" class="podium-img second">               
              <p class="podium-text">{{other_rankingdata[1].name}}</p>
              <div class="pilar_2">
                <span class="number_2">2</span><sup class="super_2">nd</sup>
              </div>
            </div>
            <div class="stand_1" v-if="other_rankingdata.length>0">
              <img :src="ProcessImg(other_rankingdata[0].photo)" class="podium-img first">
              <p class="podium-text">{{other_rankingdata[0].name}}</p>
              <div class="pilar_1">
                <span class="number_1">1</span><sup class="super_1">st</sup>
              </div>
            </div>
            <div class="stand_3" v-if="other_rankingdata.length>2">
              <img :src="ProcessImg(other_rankingdata[2].photo)" class="podium-img third">
              <p class="podium-text">{{other_rankingdata[2].name}}</p>
              <div class="pilar_3">
                <span class="number_3">3</span><sup class="super_3">rd</sup>
              </div>
            </div>
    </div>
  </div>
    
      <div class="center">
        <div v-if="!show" class="top_10">
          <div class="box">
            <div class="student_ranking_number">
              <p>{{ user_ranking }}th</p>
            </div>
          </div>

          <div class="student_name">
             <p>You</p> 
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

    };
  },
  props: {
    other_rankingdata: Object,
    user_ranking: Number,
    user_points: Number,
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
  --Gold: #C1A875;
  --Silver: #CDC9C2;
  --Bronze: #C9705C;
  --grad_1: #605ED0;
  --grad_2: #4CC9F0;
  --grad_3: #7209B7;
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

.number_1 {
  font-family: "Russo One";
  font-size: 7vh;
  background: var(--Gold, linear-gradient(77deg, #C1A875 11.6%, #d6ad3c 25.31%, #b1982b 48.06%, #f7a503 55.72%, #f7a503 77.23%, #ffc400 85.34%, #ffc400 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number_2 {
  text-align: center;
  font-family: "Russo One";
  font-size: 5.5vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  background: var(--Silver, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number_3 {
  text-align: center;
  font-family: "Russo One";
  font-size: 4vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  background: linear-gradient(77deg, #db8553 11.6%, #da781d 25.31%, #ad4311 48.06%, #db8553 55.72%, #db8553 77.23%, #C9705C 85.34%, #C9705C 91.31%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.super_1{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: var(--Gold, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
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
  background: var(--Silver, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
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
  background: linear-gradient(77deg, #db8553 11.6%, #da781d 25.31%, #ad4311 48.06%, #db8553 55.72%, #db8553 77.23%, #C9705C 85.34%, #C9705C 91.31%);
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

.podium-img{
  position:relative;
  margin-left:auto;
  margin-right:auto;
  display:block;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  border-width: 20px;
  background-color: white;
}

.stand_1{
  position: relative;
  width:27vw;
  height: 25vh;
  background-color: #4CC9F0;

  background-position: bottom;
}
.stand_2{
  position: relative;
  width:27vw;
  height: 21vh;
  background-color: #4CC9F0;

  background-position: bottom;
}
.stand_3{
  position: relative;
  width:27vw;
  height: 18vh;
  background-color: #4CC9F0;

  background-position: bottom;
}




</style>