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
        }, 3000); // Close the toast after 3 seconds
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
    right: 20px;
    padding: 10px 20px;
    color: #fff;
    border-radius: 5px;
    animation: slide-in 0.5s ease-out;
  }
  .toast.success { background-color: #4CAF50; }
  .toast.error { background-color: #F44336; }
  .toast.points { background-color: #2196F3; }
  .fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ { opacity: 0; }
  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  </style>
  