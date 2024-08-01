<template>
  <div class="main">
    <div class="PageTop">
      <div class="top">
        <div class="logo" ref="logo">
          <img src="../../assets/img/导航/雪豹logo.png" alt="Logo" class="responsive-img-logo" />
        </div>
        <div class="btns">
          <div class="btn1" @click="scrollToSection('item-zero')">
            <img src="../../assets/img/导航/home.png" alt="Home" class="responsive-img" />
          </div>
          <div class="btn2" @click="scrollToSection('item-one')">
            <img src="../../assets/img/导航/solutions.png" alt="Solutions" class="responsive-img" />
          </div>
          <div class="btn3" @click="scrollToSection('item-six')">
            <img src="../../assets/img/导航/industries.png" alt="Industries" />
          </div>
          <div class="btn4" @click="scrollToSection('item-eight')">
            <img src="../../assets/img/导航/partnerse.png" alt="Partners" class="responsive-img" />
          </div>
          <div class="btn5" @click="scrollToSection('item-nine')">
            <img src="../../assets/img/导航/about us.png" alt="About Us" class="responsive-img" />
          </div>
          <div class="more">
            <img src="../../assets/img/more.svg" alt="Logo" class="responsive-img-logo" />
          </div>
        </div>
        <div class="more svg-container">
          <img
            src="../../assets/img/more.svg"
            alt="SVG Image"
            class="responsive-img"
            @click="toggleDropdown"
          />
          <div class="dropdown-menu" v-show="isDropdownVisible">
            <div class="dropdown-item" @click="scrollToSection('item-zero')">Home</div>
            <div class="dropdown-item" @click="scrollToSection('item-two')">Solutions</div>
            <div class="dropdown-item" @click="scrollToSection('item-six')">Industries</div>
            <div class="dropdown-item" @click="scrollToSection('item-eight')">Partners</div>
            <div class="dropdown-item" @click="scrollToSection('item-nine')">About Us</div>
          </div>
        </div>
      </div>

      <div class="item-zero">
        <img src="../../assets/img/雪豹01.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-one">
        <img src="../../assets/img/雪豹1.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-two">
        <img src="../../assets/img/雪豹2.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-three">
        <img src="../../assets/img/雪豹3.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-four">
        <img src="../../assets/img/雪豹4.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-five">
        <img src="../../assets/img/雪豹5.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-six">
        <img src="../../assets/img/雪豹6.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-seven">
        <img src="../../assets/img/雪豹7.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-eight">
        <div class="item-eight-bg">
          <img
            src="../../assets/img/滚动/图层 0.png"
            alt="Background Image"
            class="responsive-img"
          />
          <div class="sweeper">
            <div class="sweeper-content">
              <div class="sweeper-item">
                <img src="../../assets/img/滚动/11.png" alt="Image 1" class="responsive-img" />
              </div>

              <div class="sweeper-item">
                <img src="../../assets/img/滚动/11.png" alt="Image 1" class="responsive-img" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="item-nine">
        <img src="../../assets/img/雪豹9.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
      <div class="item-ten">
        <img src="../../assets/img/雪豹10.jpg" alt="Navigation Image" class="responsive-img" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isDropdownVisible = ref(false)

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}
const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(`.${sectionId}`)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    isDropdownVisible.value = false
  }
}
</script>
<style scoped>
.responsive-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.top {
  display: flex;
  align-items: center;
  background-color: #fff8ee;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.btns {
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex: 1;
}

.logo {
  flex: 0 0 auto;
  margin-left: 9%;
}

.responsive-img-logo {
  display: block;
  max-height: 100%; /* Ensure the image fits within its container */
  height: auto;
  width: auto;
}
.more {
  display: none;
}

@media (max-width: 1200px) {
  .logo img {
    width: 80%; /* Adjust the logo size for medium screens */
  }
  .btns img {
    width: 80%; /* Adjust button images size for medium screens */
  }
  .top {
    height: 127px;
  }
  .more {
    display: none;
  }
}

@media (max-width: 768px) {
  .logo img {
    width: 80%; /* Adjust the logo size for smaller screens */
  }
  .btns img {
    width: 80%; /* Adjust button images size for smaller screens */
  }
  .top {
    height: 107px;
    justify-content: space-between;
  }
  .btns {
    display: none;
  }
  .more {
    display: block;
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
}

@media (max-width: 480px) {
  .logo img {
    width: 50%; /* Adjust the logo size for very small screens */
  }
  .btns img {
    width: 50%; /* Adjust button images size for very small screens */
  }
  .top {
    height: 78px;
    justify-content: space-between;
  }
  .more {
    display: block;
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
}

.item-eight {
  position: relative;
  overflow: hidden; /* Hide overflow content */
}

.item-eight-bg {
  position: relative;
  width: 100%; /* Full width */
}

.sweeper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  overflow: hidden; /* Hide overflow content */
}

.sweeper-content {
  display: flex;
  width: 200%;
  animation: scroll 16s linear infinite;
}

.sweeper-item {
  flex: 1 0 16.66%; /* Adjust based on the number of items */
  /* Ensure the image fills the container */
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Scroll by half of the total width */
  }
}

.svg-container {
  position: relative;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: none; /* Initially hidden */
  border-radius: 3px;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.svg-container .dropdown-menu {
  display: block;
}
</style>
