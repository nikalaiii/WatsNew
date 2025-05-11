<script setup>
import { ref, TransitionGroup, watch } from "vue";
import { getDataApi } from "@/api/getDataApi";

const exp = {
  coord: { lon: 30.5167, lat: 50.4333 },
  weather: [
    { id: 803, main: "Rain", description: "broken clouds", icon: "04n" },
  ],
  base: "stations",
  main: {
    temp: 9.29,
    feels_like: 9.29,
    temp_min: 9.29,
    temp_max: 9.29,
    pressure: 1015,
    humidity: 51,
    sea_level: 1015,
    grnd_level: 999,
  },
  visibility: 10000,
  wind: { speed: 0.45, deg: 318, gust: 2.24 },
  clouds: { all: 66 },
  dt: 1746812308,
  sys: {
    type: 2,
    id: 2003742,
    country: "UA",
    sunrise: 1746757164,
    sunset: 1746811763,
  },
  timezone: 10800,
  id: 703448,
  name: "Kyiv",
  cod: 200,
};

function generateWeatherReport(data) {
  if (!data) return "No weather data available.";

  const { name, weather, main, wind, clouds, sys, visibility } = data;

  const condition = weather?.[0]?.description || "unknown conditions";
  const temp = Math.round(main.temp);
  const feels = Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const cloudiness = clouds.all;
  const visKm = visibility / 1000;

  const sunrise = new Date(
    (sys.sunrise + data.timezone) * 1000
  ).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const sunset = new Date(
    (sys.sunset + data.timezone) * 1000
  ).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const resultAnalize = `The current weather in ${name} is described as ${condition} with a temperature of ${temp}°C (feels like ${feels}°C). 
Humidity is at ${humidity}%, and the wind is blowing at ${windSpeed} m/s. 
Cloud coverage is around ${cloudiness}%, and visibility is approximately ${visKm} km.
The sun rose at ${sunrise} and will set at ${sunset}.`;

  return resultAnalize;
}

const inputValue = ref("");
const loading = ref(false);
const error = ref(null);
const weatherInfo = ref("");
const info = ref(null);

async function handleSubmit() {
  if (inputValue.value.trim().length < 3) {
    return false;
  }

  try {
    loading.value = true;
    error.value = null;

    const urlBuild = `https://api.openweathermap.org/data/2.5/weather?q=db98d9e09b3aae9554d3c2687fad11b3&units=metric&appid=db98d9e09b3aae9554d3c2687fad11b3`;

    const data = await getDataApi(urlBuild);

    if (!data) {
      error.value =
        "problem with searching for the city name, maybe you entered the city name incorrectly?";
        info.value = null;
      return;
    }

    info.value = data;
    weatherInfo.value = generateWeatherReport(info.value);
  } catch (err) {
    console.error(err);
    error.value = `unexpected error, please try later`;
  } finally {
    loading.value = false;
  }
}

const getLocalTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function findImage() {
  if (!info.value) {
    error.value = 'error';
    return;
  }

  switch (info.value.weather[0].main) {
    case 'Clear':
      return "images/sun.png";
    case 'Clouds':
      return 'images/sun-cloud.png';
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      return 'images/rain.png'

    default:
      return 'images/sun.png';
  }
}

watch(error, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      error.value = null;
    }, 5000);
  }
});

const handleClose = () => {
  error.value = null;
}
</script>

<template>
  <section class="weather">
    <div class="weather__content">
      <form class="weather__form" @submit.prevent="handleSubmit">
        <h2 class="weather__title">Check weather in your region</h2>
        <label
          ><h3 class="weather__formTitle">Select your city</h3>
          <p style="color: gray">*Please, write your city name on English</p>
          <input class="weather__input" placeholder="example: Kyiv, New York, London" v-model="inputValue" type="text"
        /></label>

        <button class="weather__formButton" type="submit">Submit</button>
      </form>

      <div v-if="loading" class="loading">loading, pleace wait</div>
      <Transition name="fade-message">
      <div v-if="error" class="error">{{ error }} <button class="error__button" @click="handleClose">X</button></div>
      </Transition>

      <Transition name="fade-message">
        <div v-if="info && !error" class="weather__info" :key="info.dt">
        <div class="weather__info__block">
          <img
            :src="findImage()"
            :alt="findImage()"
            class="weather__image"
          />
          <div class="wrapper">
            <h1 class="weather__title">Weather in {{ info.name }}</h1>
            <h2 class="weather__title">{{ info.main.temp }}*C</h2>
            <h2 class="weather__title">
              {{ getLocalTime(info.dt, info.timezone) }}
            </h2>
            <h2 class="weather__title">{{ info.weather[0].description }}</h2>
          </div>
        </div>
        <div class="weather__description">
          <p class="weather__description__text">
            {{ weatherInfo }}
          </p>
        </div>
      </div>
      </Transition>
    </div>
  </section>
</template>

<style lang="scss">

.fade-message-enter-from,
.fade-message-leave-to {
  opacity: 0;
  transform: translateY(20px);
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
}

.fade-message-enter-active,
.fade-message-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, margin 0.4s ease;
  max-height: 1000px;
  margin-top: 2rem;
  overflow: hidden;
}


h2,
h3,
p {
  color: black;

  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

label {
  width: 50%;

   @media (max-width: 768px) {
    width: 100%;
    }
}

.error {
  position: fixed;
  top: 5%;
  left: 5%;
  width: 50%;

  background-color: rgb(255, 50, 50);
  border-radius: 10px;
  text-align: center;
  color: white;

  &__button {
    background: none;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    border: 1px solid white;
    border-radius: 50%;
  }
}

.weather {
  width: 100vw;
  min-height: 100vh;

  background-image: url("../../public/images/weather.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: visible;

  &__content {
    width: 100%;
    min-height: 100vh;
    max-width: 1280px;
    margin-inline: auto;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

     @media (max-width: 768px) {
    padding: 0;
    }
  }

  &__title {
    margin-right: auto;
  }

  &__info {
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    width: 85%;
    height: 100%;
    margin-top: 20px;
    padding: 1.3rem;
    border-radius: 15px;
    display: flex;
    gap: 1.2rem;

    @media (max-width: 768px) {
    flex-direction: column;
    }

    &__block {
      border-right: 1px solid black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      width: 20%;
      min-width: 200px;
      max-height: 420px;

       @media (max-width: 768px) {
       border-right: none;
       border-bottom: 1px solid black;
       padding-bottom: 20px;
    }
    }
  }

  &__form {
    height: 50%;
    width: 75%;
    padding: 1.2rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
  }

  &__input {
    background: none;
    border: 3px solid white;
    border-radius: 5px;
    min-width: 100%;
    height: 40px;

    &:focus {
      border: none;
    }
  }

  &__formButton {
    cursor: pointer;
    width: 50%;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border: 2px solid white;
    border-radius: 10px;
    font-size: 20px;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    &:hover {
      font-size: 23px;
      background: none;
      transform: scale(1.1);
    }
  }

  &__description {
    width: 100%;
    margin-inline: auto;

    &__text {
      font-size: 24px;
    }
  }
}
</style>
