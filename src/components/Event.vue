<template>

<div class="event">

  <div class="hour-info">
    <div id="circle"></div>
    <div class="hour">
      {{ event.time }}
    </div>
  </div>
  <div class="item" :style="{borderColor: color}">
    <div class="main">
      <div id="title" :style="{color: color}">
        {{ event.type }}
      </div>
      <div id="text">
        {{ event.name }}
      </div>
      <router-link id="info" :to="link" :style="{color: color}">
        +info
      </router-link>
    </div>
    <div class="add">
      <svg id="symbol" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1105_545)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 0C4.54076 0 4.69973 0.065848 4.81694 0.183058C4.93415 0.300269 5 0.45924 5 0.625V1.25H15V0.625C15 0.45924 15.0658 0.300269 15.1831 0.183058C15.3003 0.065848 15.4592 0 15.625 0C15.7908 0 15.9497 0.065848 16.0669 0.183058C16.1842 0.300269 16.25 0.45924 16.25 0.625V1.25H17.5C18.163 1.25 18.7989 1.51339 19.2678 1.98223C19.7366 2.45107 20 3.08696 20 3.75V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V3.75C0 3.08696 0.263392 2.45107 0.732233 1.98223C1.20107 1.51339 1.83696 1.25 2.5 1.25H3.75V0.625C3.75 0.45924 3.81585 0.300269 3.93306 0.183058C4.05027 0.065848 4.20924 0 4.375 0V0ZM2.5 4.375C2.5 4.03 2.805 3.75 3.18125 3.75H16.8188C17.1938 3.75 17.5 4.03 17.5 4.375V5.625C17.5 5.97 17.195 6.25 16.8175 6.25H3.18125C2.80625 6.25 2.5 5.97 2.5 5.625V4.375ZM10.625 10.625C10.625 10.4592 10.5592 10.3003 10.4419 10.1831C10.3247 10.0658 10.1658 10 10 10C9.83424 10 9.67527 10.0658 9.55806 10.1831C9.44085 10.3003 9.375 10.4592 9.375 10.625V12.5H7.5C7.33424 12.5 7.17527 12.5658 7.05806 12.6831C6.94085 12.8003 6.875 12.9592 6.875 13.125C6.875 13.2908 6.94085 13.4497 7.05806 13.5669C7.17527 13.6842 7.33424 13.75 7.5 13.75H9.375V15.625C9.375 15.7908 9.44085 15.9497 9.55806 16.0669C9.67527 16.1842 9.83424 16.25 10 16.25C10.1658 16.25 10.3247 16.1842 10.4419 16.0669C10.5592 15.9497 10.625 15.7908 10.625 15.625V13.75H12.5C12.6658 13.75 12.8247 13.6842 12.9419 13.5669C13.0592 13.4497 13.125 13.2908 13.125 13.125C13.125 12.9592 13.0592 12.8003 12.9419 12.6831C12.8247 12.5658 12.6658 12.5 12.5 12.5H10.625V10.625Z" fill="#E7E7E7"/>
        </g>
        <defs>
          <clipPath id="clip0_1105_545">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>
    <div class="div-foto">
      <div id="foto">

      </div>
    </div>
  </div>
  <div class="hour-info">
    <div id="circle"></div>
    <div class="hour">
      {{ event.end_time }}
    </div>
  </div> 
</div>

</template>

<script>
export default {
  name: "Event",
  props: {
    event: Object,
    color: Number,
    foto: Object,
    link: String
  },

};
</script>

<style scoped>

.event {
  width: 100%;
  height: 130px;
  margin-bottom: 5px;
}

.hour-info {
  display: flex;
  height: 15px;
  align-items: center;
}

.hour {
  margin-left: 10px;
  font-size: 12pt;
  font-weight: bolder;
}

.item {
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 80px;
  border-radius: 0 45px 45px 45px;
  display: flex;
  align-items: center;
  border-style: solid;
}

.main {
  flex: 1;
  height: 100%;
}

.add {
  width: 25px;
  height: 100%;
  position: relative;
  margin: 5px;
}

.div-foto {
  width: 74px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#circle {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
}

#title {
  margin-top: 5px;
  margin-left: 15px;
  font-size: 15pt;
  font-weight: bolder;
}

#text {
  margin-left: 15px;
  font-size: 15pt;
  font-weight: bolder;
}

#info {
  margin-left: 40px;
  font-size: 10pt;
}

#symbol {
  width: 20px;
  height: 20px;

  position: absolute;
  bottom: 10px;
}

#foto {
  width: 60px;
  height: 60px;
  background: rgb(155, 24, 24);
  border-radius: 50%;
}

</style>
