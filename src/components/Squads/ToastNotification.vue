<template>
    <transition name="fade">
      <div v-if="visible" class="toast" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'ToastNotification',
    props: ['message', 'type', 'visible'],
    mounted() {
      if (this.visible) {
        setTimeout(() => {
          this.$emit('close');
        }, 3000); 
      }
    },
    watch: {
      visible(newValue) {
        if (newValue) {
          setTimeout(() => {
            this.$emit('close');
          }, 3000);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px; 
    left: 50%; 
    transform: translateX(-50%) translateY(100%);
    padding: 20px 40px; 
    color: #fff;
    border-radius: 8px; 
    font-size: 1.5rem; 
    animation: slide-up 0.5s ease-out forwards; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    z-index: 1000; 
  }
  
  @keyframes slide-up {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  .toast.success { background-color: #4CAF50; }
  .toast.error { background-color: #F44336; }
  .toast.points { background-color: #2196F3; }
  
  .fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  </style>
  