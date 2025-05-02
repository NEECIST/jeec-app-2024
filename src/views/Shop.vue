<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import { useUserStore } from '@/stores/UserStore' TODO

// const userStore = useUserStore();
const items = ref([])
const loading = ref(true)
const error = ref(null)
const showPopup = ref(false)
const selectedPrize = ref(null)
const dailyPrize = ref(null)
const dailyPrizeLoading = ref(true)
const dailyPrizeError = ref(null)


const fetchPrizes = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/get-prizes-shop', 
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );
    
    // Transform the data and properly handle base64 images
    items.value = response.data.map(prize => ({
      id: prize.id,
      name: prize.name || 'No prize',
      description: prize.description || 'No description available',
      // Make sure we're correctly formatting the base64 image
      imageData: prize.imageData ? `data:image/*;base64,${prize.imageData}` : null,
      price: prize.price || 50,
      bought: prize.bought || false
    }))
    console.log(items);
  } catch (err) {
    console.error('Failed to fetch prizes:', err)
    error.value = 'Failed to load prizes. Please try again later.'
    items.value = []
  } finally {
    loading.value = false
  }
}

const fetchDailyPrize = async () => {
  dailyPrizeLoading.value = true
  dailyPrizeError.value = null

  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/get-daily-prize',
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );

    if (response.data && response.data.length > 0) {
      const prize = response.data[0];
      dailyPrize.value = {
        id: prize.id,
        name: prize.name || 'No prize',
        imageData: prize.imageData ? `data:image/*;base64,${prize.imageData}` : null
      };
    } else {
      dailyPrize.value = null;
    }
  } catch (err) {
    console.error('Failed to fetch daily prize:', err); 
    dailyPrizeError.value = 'Failed to load daily prize. Please try again later.';
    dailyPrize.value = null;
  } finally {
    dailyPrizeLoading.value = false;
  }
};

const retryFetchDailyPrize = () => {
  fetchDailyPrize();
};

const openPrizePopup = (prize) => {
  selectedPrize.value = prize
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}

const buyPrize = async (prize) => {
  try {
    const username = userStore.username;
    
    const response = await axios.post(
      import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/buy-prize',
      { 
        prize_id: prize.id,
        username: username
      }, 
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    )
    
    const item = items.value.find(item => item.id === prize.id)
    if (item) {
      item.bought = true
    }
    
    closePopup()
  } catch (err) {
    console.error('Purchase failed:', err)
    alert('Failed to purchase the prize. Please try again.')
  }
}

onMounted(() => {
  fetchPrizes();
  fetchDailyPrize();
});
</script>

<template>
<div class="view">

  <!-- SECTION DOS PARAGRAFOS -->
  <section class="info-section">
    <p>Earn points by participating in JEEC!</p>
    <p>Visit companies at the job fair or take part in Eletrolink to collect points. Use your points to redeem prizes below!</p>
    <p class="small">(maximum of one of each type per day)</p>
  </section>

  <!-- SECTION DO BUY DOS TICKETS PARA O DAILY DRAW -->
  <section class="ticket-section">
    <div class="daily-ticket-container">
      <!-- Loading state for daily prize -->
      <div v-if="dailyPrizeLoading" class="daily-prize-circle loading-circle">
        <div class="loading-spinner-small"></div>
      </div>
      
      <!-- Error state for daily prize -->
      <div v-else-if="dailyPrizeError" class="daily-prize-circle error-circle" @click="retryFetchDailyPrize">
        <span class="error-icon">!</span>
      </div>
      
      <!-- Daily prize display when loaded -->
      <div v-else class="daily-prize-circle">
        <img v-if="dailyPrize?.imageData" :src="dailyPrize.imageData" alt="Daily Prize" class="daily-prize-image" />
        <div v-else class="no-image-placeholder">?</div>
      </div>
        
      <a href="#" class="ticket-link">
        <div class="ticket-content">
          <img src="@/assets/Ticket-Vector.svg" alt="Ticket image" style="height: 40px;width: 40px;">
          <div id="btn-ticket">
            <p>Daily Draw</p>
            <p>Ticket</p>
            <p class="coin">50 🔵</p>
          </div>
        </div>
      </a>
    </div>
  </section>

  <!-- SECTION PARA COMPRAREM OS PRIZES DA SHOP  -->
  <section class="shop-section">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading prizes...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button class="retry-button" @click="fetchPrizes">Retry</button>
    </div>
    
    <div v-else-if="items.length === 0" class="empty-container">
      <p>No prizes available at the moment.</p>
    </div>
    
    <div v-else class="shop-container">
      <div 
        v-for="item in items" 
        :key="item.id" 
        class="circle-container"
        @click="!item.bought && openPrizePopup(item)"
      >
        <div 
          :class="['circle', { bought: item.bought }]"
        >
          <img v-if="item.imageData" :src="item.imageData" :alt="item.name" class="prize-image" />
          <div v-else class="no-image-placeholder">?</div>
        </div>
        <div class="price">
          <span v-if="!item.bought">{{ item.price }} 🔵</span>
          <span v-else class="bought-text">Bought</span>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Prize Popup -->
  <div v-if="showPopup && selectedPrize" class="popup-overlay">
    <div class="prize-popup">
      <div class="popup-header">
        <h2>{{ selectedPrize.name }}</h2>
        <button class="close-button" @click="closePopup">✕</button>
      </div>
      <div class="popup-body">
        <div class="prize-circle">
          <img v-if="selectedPrize.imageData" :src="selectedPrize.imageData" :alt="selectedPrize.name" class="popup-prize-image" />
          <div v-else class="no-image-placeholder">?</div>
        </div>
        <p class="prize-description">{{ selectedPrize.description }}</p>
        <button 
          class="buy-button" 
          @click="buyPrize(selectedPrize)"
          :disabled="selectedPrize.bought"
        >
          BUY PRIZE <span class="price-tag">{{ selectedPrize.price }} 🔵</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.view {
  padding-top: var(--header-height);
  --acc-color: var(--c-acc-violet);
  min-height: 100vh;
  background-color: #1a1a1a;
  position: relative;
  font-family: Arial, sans-serif;
}

.daily-prize-circle {
  width: 80px;
  height: 80px;
  border: 2px solid #9c27b0;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.daily-prize-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .daily-prize-circle {
    width: 80px;
    height: 80px;
  }
}

#btn-ticket{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket-image {
  max-width: 80px;
  margin-left: 12px;
  border-radius: 4px;
}

#btn-ticket > p {
  font-size: 0.8rem;
}

.info-section {
  text-align: center;
  color: white;
  padding: 20px;
}

.info-section p {
  margin: 8px 0;
}

.info-section .small {
  font-size: 0.8rem;
  color: gray;
  margin-top: 8px;
}

.ticket-section {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;
}

.daily-ticket-container {
  display: flex;
  align-items: center;
  gap: 16px;
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
.shop-section {
  padding: 10px;
}

.shop-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px;
}

.circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  cursor: pointer;
}

.circle {
  width: 70px;
  height: 70px;
  border: 2px solid #9c27b0;
  border-radius: 50%;
  background: white;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.white-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
}

.circle.bought {
  background: grey;
  border: 2px solid grey;
}

.prize-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price {
  margin-top: 8px;
  color: white;
  font-size: 14px;
  text-align: center;
}

.bought-text {
  color: grey;
}

/* Loading styles for daily prize */
.loading-circle {
  background: rgba(255, 255, 255, 0.7);
}

.loading-spinner-small {
  border: 3px solid rgba(156, 39, 176, 0.2);
  border-radius: 50%;
  border-top: 3px solid #9c27b0;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

/* Error styles for daily prize */
.error-circle {
  background: #ffebee;
  cursor: pointer;
}

.error-icon {
  color: #f44336;
  font-size: 24px;
  font-weight: bold;
}

/* No image placeholder */
.no-image-placeholder {
  color: #9c27b0;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.prize-popup {
  background-color: #4a1075;
  width: 90%;
  max-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.popup-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.popup-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
}

.popup-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prize-circle {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.popup-prize-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prize-description {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
}

/* Loading and error states */
.loading-container, .error-container, .empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: white;
  text-align: center;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #9c27b0;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-top: 16px;
  cursor: pointer;
}

.buy-button {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buy-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.price-tag {
  margin-left: 8px;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .shop-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .circle-container {
    width: 100px;
  }
  
  .circle {
    width: 80px;
    height: 80px;
  }
}
</style>