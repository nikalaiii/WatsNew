<script setup>
import { getDataApi } from "@/api/getDataApi";
import { ref, onMounted } from "vue";
import NewsBlock from "./NewsBlock.vue";

const newsData = ref(null);
const error = ref(null);
const loading = ref(false);
const carouselRef = ref(null);

onMounted(async () => {
  if (newsData.value) {
    newsData.value = null;
  }

  try {
    console.log("START REQUEST");
    error.value = null;
    loading.value = true;
    const newData = await getDataApi(
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&apiKey=6b53b2feb7634deda362aaee48c5cd6e"
    );

    if (!newData) {
      error.value = "Problem with getting data";
      console.error("error");
      return;
    }

    newsData.value = newData.articles;
    console.log("END REQUEST");
    console.log(newsData.value.length);
  } catch (err) {
    console.error(err);
    error.value = "problem with getting data";
  } finally {
    loading.value = false;
  }
});

const scrollCarousel = (direction = "right") => {
  const container = carouselRef.value;
  if (!container) return;

  const scrollAmount = container.offsetWidth * 0.3; // 40% ширини

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};
</script>

<template>
  <section class="news">
    <div class="news__content">
      <h1 class="news__title">What's new today?</h1>
      <div class="loader" v-if="loading">Loading, please wait</div>
      <div class="error" v-if="error">{{ error }}</div>
      <div class="news__buttons">
        <button
          class="news__button news__button--right"
          @click="scrollCarousel('left')"
        >
          <
        </button>
        <button
          class="news__button news__button--left"
          @click="scrollCarousel('right')"
        >
          >
        </button>
      </div>
      <div ref="carouselRef" class="news__carousel" v-if="newsData">
        <NewsBlock
          v-for="(element, index) in newsData"
          :key="element.url || index"
          :info="element"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.news {
  min-height: 100vh;
  width: 100vw;

  &__content {
    width: 100%;
    max-width: 1280px;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    margin-inline: auto;

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  &__title {
    font-family: "Quicksand", sans-serif;
    font-size: 48px;
    font-weight: 800;
  }

  &__carousel {
    min-height: 70vh;
    display: flex;
    margin-bottom: 20px;
    gap: 1.5rem;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    margin-inline: 30px;

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  &__buttons {
    width: 20%;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 768px) {
      width: 40%;
    }
  }

  &__button {
    background: none;
    text-align: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    margin-bottom: 20px;
    font-family: "Quicksand", sans-serif;
    font-size: 20px;
    transition: all 0.1s ease;

    &:hover {
      font-size: 25px;
      border-width: 2px;
    }
  }
}
</style>
