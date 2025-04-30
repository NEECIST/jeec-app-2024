<template>
    <div class="eletrolink-card" :style="{ '--background': 'rgba(var(--color-yellow-rgb), 0.1)', '--border-background': 'var(--color-yellow)' }">
        <div v-if="no_eletrolink" class="container">
          <!-- Title -->
          <h2>ELETROLINK</h2>
    
          <!-- Subtitle -->
          <p class="subtitle">Today’s companies:</p>
    
          <!-- Company Logos -->
          <div class="companies">
            <div class="company" v-for="(company, index) in companies.images" :key="index">
              <img :src="company" class="logo" />
            </div>
          </div>
    
          <!-- Sign-up Button -->
          <button class="signup-btn"
            :class="{ pressed: isPressed }"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
          Sign up</button>
        </div>
        <!-- No Eletrolink Message -->
        <div v-else class="no-eletrolink">
          No Eletrolink today
        </div>
    </div>
  </template>
    
  <script setup>
    import { ref } from "vue";
    import axios from "axios";
    import authHeader from "@/services/auth-header";
    import { onMounted } from "vue";
    import { useUserStore } from '@/stores/UserStore';

    const userStore = useUserStore();
    const student = userStore.user;



    onMounted(() => {
      getEletrolink();
    });

    const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;
    // Example logos (Replace with real images)
    const companies = ref({
      images: []
    });
    const no_eletrolink = ref(false);
  
    const isPressed = ref(false);
  
    const onTouchStart = () => (isPressed.value = true);
    const onTouchEnd = () => setTimeout(() => (isPressed.value = false), 100);

    function getEletrolink() {
      axios
        .get(
          process.env.VUE_APP_JEEC_BRAIN_URL + "student/eletrolink_home",
          {
        headers: {
          ...authHeader(), 
          student: student
        }
          }
        )
        .then((response) => {
          if (response.data.eletrolink.companies && response.data.eletrolink.companies.length > 0) {
            console.log(response.data.eletrolink.companies);
            no_eletrolink.value = true;
            const bufferArray = response.data.eletrolink.companies.map((image) => 
              process.env.VUE_APP_JEEC_BRAIN_URL + image
            );
            companies.value.images = bufferArray;
          } else {
            no_eletrolink.value = false;
          }
        });
}
  </script>
    
  <style scoped>

    .no-eletrolink {
      padding: 2rem 0;
      color: var(--color-font);
      font-size: clamp(1.4rem, 3.1vw, 1.8rem);
      font-family: "Lexend Exa";
      text-transform: uppercase;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-weight: 700;
    }
  
    /* Container Styling */
    .container {
      padding: 0.5rem 0.05rem 0.9rem 0.05rem;
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      --background: rgba(var(--color-yellow-rgb), 0.1); /* Use RGB values with transparency */
      --border-background: var(--color-yellow);
    }
    
    /* Title */
    .container h2 {
    font-size: clamp(1.4rem, 3.1vw, 1.8rem);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Lexend Exa";
    text-transform: uppercase;
  }
    
  
    /* Subtitle */
    .subtitle {
      font-family: "Lexend Exa";
      font-size: clamp(0.8rem, 3.2vw, 1.1rem);
      font-weight: 700;
      overflow: hidden;
      letter-spacing: 0.05em;
      align-self: flex-start;
      margin-bottom: 10px;
      margin-top:5px;
    }
    
    /* Company Logos */
    .companies {
      display: flex;
      justify-content: center;
      gap: 7%;
      margin-bottom: 15px;
      width: 85%;
      height: 100%
    }
    
    .company {
      min-width: 60px;
      width: 5em;
      height: 3em;
      min-height: 40px;
      border-radius: 10px;
      border-color: none;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    
    .logo {
      width: 100%;
    }
    
    /* Sign-up Button */
    .signup-btn {
      font-family: "Lexend Exa";
      background-color:var(--color-yellow);
      color: var(--color-font);
      font-size: 1rem;
      font-weight: bold;
      padding: 5px 15px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
  
    .pressed {
      transform: scale(1.1);
      opacity: 0.8;
    }
  </style>
    