<script setup>
import { ref } from 'vue'

const items = ref(
  Array.from({ length: 12 }, () => ({ bought: false }))
)


</script>

<template>

<!-- SECTION DOS PARAGRAFOS -->
<section class="info-section">
  <p>Earn points by participating in JEEC!</p>
  <p>Visit companies at the job fair or take part in Eletrolink to collect points. Use your points to redeem prizes below!</p>
  <p class="small">(maximum of one of each type per day)</p>
</section>

<!-- SECTION DO BUY DOS TICKETS PARA O DAILY DRAW -->
<section class="ticket-section">
  <div class="daily-ticket-container">
    <div class="circle"></div>
    <a href="#" class="ticket-link">
      <div class="ticket-content">
        <!-- SVG here -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v12H4z" fill="none" stroke="white" stroke-width="2"/>
          <path d="M8 12h8" stroke="white" stroke-width="2"/>
          <path d="M12 8v8" stroke="white" stroke-width="2"/>
        </svg>
        <span>Daily Draw Ticket</span>
        <span class="coin">50 🔵</span>
      </div>
    </a>
  </div>
</section>

<!-- SECTION PARA COMPRAREM OS PRIZES DA SHOP  -->
<section>
  <div class="shop-container">
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="circle-container"
    >
      <div 
        :class="['circle', { bought: item.bought }]"
      ></div>
      <div class="price">
        <span v-if="!item.bought">50 🔵</span>
        <span v-else>Bought</span>
      </div>
    </div>
  </div>
</section>

</template>

<style scoped>

  .info-section {
    text-align: center;
    color: white;
    padding: 20px;
  }

  .info-section .small {
    font-size: 0.8rem;
    color: gray;
    margin-top: 8px;
  }

  .ticket-section {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .daily-ticket-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .ticket-link {
    background: #9c27b0; /* purple background */
    padding: 10px 16px;
    border-radius: 12px;
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
  }

  .ticket-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .coin {
    margin-left: auto;
  }

  .shop-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background: #1a1a1a; /* Dark background */
  }

  .circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
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

  .price {
    margin-top: 8px;
    color: white;
    font-size: 14px;
    text-align: center;
  }

</style>