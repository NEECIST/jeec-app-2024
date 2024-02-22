<template>
  <Transition name="slide" appear>
    <router-link to="/profile" class="popup" v-if="isOpen">
      <h2>You still haven't added your CV!</h2>
      <p>Upload now to get 500 points and get you closer to the JEECPOT</p>
    </router-link>
  </Transition>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import UserService from "@/services/user.service";

const isOpen = ref(false);

onMounted(() => {
  UserService.getUserStudent().then(
    (response) => {
      if (!response.data.data.uploaded_cv) {
        isOpen.value = true;
      };
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>
<style scoped>
.popup {
  position: fixed;
  top: 70px;
  left: 50%;
  translate: -50% 0;
  width: 80%;
  height: 100px;
  background: rgb(255, 0, 0);
  z-index: 100;
  border-radius: 25px;
  border: 4px solid rgb(176, 0, 0);
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  translate: translateY(0);
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>