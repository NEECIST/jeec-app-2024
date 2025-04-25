<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, onMounted, computed, reactive} from 'vue';
import axios from "axios";

const config = {
  adjustableHeight: true,
  snapAlign: 'center',
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  breakpoints: {
    0: {
      itemsToShow: 1.5,
    },
    300: {
      itemsToShow: 3,
    },
    550: {
      itemsToShow: 3,
    },
    700: {
      itemsToShow: 3,
    },
    1000: {
      itemsToShow: 5,
    },
  },
};

const myObject = reactive({
  title: 'A',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
},
{
  title: 'B',
  author: 'Jane ASH',
  publishedAt: '2016-04-11'
},
{
  title: 'V',
  author: 'Jane DUSH',
  publishedAt: '2016-04-12'
}
);


</script>

<template>

  <!-- SECTION: Main Title and Description -->
  <section class="info-section">
    <h3>Earn points by participating in JEEC!</h3>
    <p>
      Visit companies at the job fair or take part in Eletrolink to collect points. 
      Use your points to buy tickets to the daily draw, increase your JEECPOT chances and more!
    </p>
  </section>

  <!-- SECTION: Daily Draw -->
  <section class="daily-draw-section">
    <h2>DAILY DRAW</h2>
    
    <div class="carousel-container">
      <Carousel v-bind="config">
        <Slide v-for="obj in myObject" :key="obj.id">
          <div class="shop">
            <div class="carousel__item">
            <!-- Circle goes here -->
            <div :class="['circle', { bought: obj.bought }]"></div>
            <p class="day-label">{{ obj.title }} a aa </p></div>
          </div>
          
          
        </Slide>
      </Carousel>
    </div>

    <a href="#" class="buy-ticket-btn">Buy Ticket</a>
  </section>

  <!-- SECTION: CV Draw -->
  <section class="cv-draw-section">
    <h2>CV DRAW</h2>

    <div class="cv-container">
      <a href="#" class="upload-cv-btn">
        <div class="upload-cv-content">
          <!-- SVG Icon -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 20h14a2 2 0 0 0 2-2V8l-6-6H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" fill="white"/>
          </svg>
          <span>Upload your CV</span>
        </div>
      </a>

      <div class="logo-cv"></div>
    </div>
  </section>

  <!-- SECTION: Solo Jeecpot -->
  <section class="solo-jeecpot-section">
    <h2>SOLO JEECPOT</h2>
    <p>The points you earn increase your chances of winning the JEECPOT!</p>
    
    <div class="prizes-container">
      <div class="prize-circle"></div>
      <div class="prize-circle"></div>
      <div class="prize-circle"></div>
    </div>
  </section>

  <!-- SECTION: Squad Jeecpot -->
  <section class="squad-jeecpot-section">
    <h2>SQUAD JEECPOT</h2>
    <p>The points your squad earns increase your chances of winning the JEECPOT!</p>
    
    <div class="prizes-container">
      <div class="prize-circle"></div>
      <div class="prize-circle"></div>
      <div class="prize-circle"></div>
    </div>
  </section>

</template>


<style scoped>

  .shop{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  section {
    padding: 20px;
    text-align: center;
    color: white;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ff4c9b;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  a {
    text-decoration: none;
  }


  .info-section {
    background: #1a1a1a; 
  }


  .daily-draw-section .carousel-container {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .carousel__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .circle {
    width: 60px;
    height: 60px;
    border: 2px solid purple;
    border-radius: 50%;
    background: white;
  }

  .circle.bought {
    background: grey;
    border: none;
  }

  .day-label {
    margin-top: 8px;
    font-size: 0.9rem;
  }


  .buy-ticket-btn {
    display: inline-block;
    margin-top: 12px;
    background-color: #ff4c9b;
    padding: 8px 20px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
  }


  .cv-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }

  .upload-cv-btn {
    background: #ff4c9b;
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 12px;
    color: white;
  }

  .upload-cv-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }


  .logo-cv {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    border: 2px solid purple;
  }


  .prizes-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  .prize-circle {
    width: 60px;
    height: 60px;
    border: 2px solid purple;
    border-radius: 50%;
    background: white;
  }

</style>