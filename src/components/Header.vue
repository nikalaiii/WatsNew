<template>
      <nav class="hero__nav">
        <h1 class="hero__logo">What New?</h1>
      </nav>

  <header class="hero">
     <video
    class="hero__video"
    autoplay
    muted
    loop
    playsinline
  >
    <source src="../../public/video/header_video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
    <div class="hero__overlay">

      <section class="hero__content">
        <TransitionGroup name="fade" tag="div" class="hero__columns">
          <a
            v-for="(block, i) in blocks"
            :key="i"
            class="hero__column"
            href="/hello"
            :style="{ animationDelay: `${i * 200}ms` }"
          >
            <h2>{{ block.title }}</h2>
            <p>{{ block.desc }}</p>
          </a>
        </TransitionGroup>
      </section>
    </div>
  </header>
</template>

<script setup>
const blocks = [
  {
    title: "📰 News",
    desc: "Stay updated with the latest headlines in politics, technology, and culture — all in one place.",
  },
  {
    title: "☁️ Weather",
    desc: "Check accurate and up-to-date weather forecasts for your city and worldwide locations.",
  },
  {
    title: "💱 Currency Rates",
    desc: "Track real-time exchange rates and market trends with ease and clarity.",
  },
];
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  font-family: "Quicksand", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

    &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px) brightness(0.7);
    z-index: -1;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__nav {
    position: sticky;
    top: 0;
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
          background: rgba(255, 255, 255, 0.6);

    .hero__logo {
        font-family: "Quicksand", sans-serif;
      font-size: 2rem;
      font-weight: 600;
      color: #00796b;
    }
  }

  &__content {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    padding: 2rem 0;

    .hero__column {
      text-decoration: none;
      background: rgba(255, 255, 255, 0.6);
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
      flex: 1 1 250px;
      max-width: 300px;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.hero__columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

p {
  color: black;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active {
  transition: all 0.6s ease;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
