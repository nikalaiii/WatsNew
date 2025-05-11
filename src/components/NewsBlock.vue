<script setup>
import { defineProps } from "vue";
const props = defineProps(["info"]);

function expireString(string, limit) {
  if (!string) return "";
  if (string.length > limit) {
    return string.slice(0, limit) + "...";
  }
  return string;
}
</script>

<template>
  <article class="article">
    <a class="article__link" :href="props.info.url">
      <img
        class="article__image"
        :src="props.info.urlToImage"
        alt="article image"
      />

      <h3 class="article__title">{{ expireString(props.info.title, 50) }}</h3>
      <div class="article__gap-line"></div>
      <p class="article__decription">
        {{ expireString(props.info.description, 100) }}
      </p>

            <div class="article__gap-line"></div>

      <p class="article__date">published at: {{ props.info.publishedAt }}</p>
    </a>
  </article>
</template>

<style lang="scss">
p,
h3 {
  margin: 0;
  padding: 0;
}

.article {
  min-height: 100%;
  width: 35%;
  min-width: 250px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    min-height: 60vh;
  }

  &__image {
    width: 100%;
    min-height: 40%;
    object-fit: cover;
    object-position: center;
  }

  &__link {
    height: 100%;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  &__gap-line {
    height: 1px;
    width: 100%;
    background-color: black;
  }
}
</style>
