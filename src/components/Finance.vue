<script setup>
import { ref, watch, onMounted } from "vue";

const timeRange = ref("1D");
const currency = ref("FX:EURUSD");

const renderChart = () => {
  const container = document.getElementById("tradingview_chart");
  if (!container) return;

  container.innerHTML = ""; // очищення перед вставкою

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbol: currency.value,
    width: "100%",
    height: "400",
    locale: "en",
    dateRange: timeRange.value,
    colorTheme: "dark",
    trendLineColor: "#37a6ef",
    underLineColor: "rgba(55, 166, 239, 0.15)",
    isTransparent: false,
    autosize: true,
    largeChartUrl: "",
    chartType: "candlestick", // виправлена помилка тут
  });

  container.appendChild(script);
};

onMounted(() => {
  renderChart(); // початковий рендер
});

// оновлюємо віджет при зміні параметрів
watch([currency, timeRange], renderChart);
</script>

<template>
  <section class="finance">
    <div class="finance__content">
      <h1 class="finance__title">What is happening in the market?</h1>
      <h2 style="margin-left: auto" class="finance__sub-title">
        check the status of the most popular currencies
      </h2>

      <div class="finance__market">
        <form class="form">
          <div class="form__blocks">
            <div class="form__block">
              <h3 class="form__title">Select Currency</h3>
              <select v-model="currency" class="form__select">
                <option value="FX:EURUSD">EUR/USD</option>
                <option value="BINANCE:BTCUSDT">BTS</option>
                <option value="BINANCE:ETHUSDT">Etherium</option>
                <option value="	BINANCE:XRPUSDT">USDT</option>
              </select>
            </div>

            <div class="form__block">
              <h3 class="form__title">Select Time Range</h3>
              <select v-model="timeRange" class="form__select">
                <option value="1W">Week</option>
                <option value="1D">Day</option>
                <option value="1H">Hour</option>
                <option value="1M">Mounth</option>
              </select>
            </div>
          </div>
        </form>

        <div class="tradingview-widget-container">
          <div id="tradingview_chart"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
* {
  transition: all 0.3s ease;
}
.finance {
  background: #590606;
  background: linear-gradient(
    90deg,
    rgba(89, 6, 6, 1) 0%,
    rgba(26, 71, 69, 1) 50%,
    rgba(6, 79, 10, 1) 100%
  );

  width: 100vw;
  min-height: 100vh;

  &__content {
    width: 100%;
    max-width: 1280px;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    margin-inline: auto;
    padding: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.2rem;
  }

  &__market {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
}

.form {
  height: 50%;
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin-inline: auto;

  display: flex;
  gap: 1.3rem;
  flex-wrap: wrap;
  padding: 1.3rem;

  &__blocks {
    width: 100%;
    display: flex;
    gap: 2rem;

    @media (max-width: 550px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 50%;
  }

  &__select {
    background: none;
    border-radius: 5px;
    width: 50%;

    @media (max-width: 768px) {
      width: 75%;
      height: 30px;
    }
  }
}
</style>
