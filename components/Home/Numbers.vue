<template>
  <section class="sm:py-16 lg:-mt-28 pt-8 relative z-20 bg-white dark:bg-fpDark1 w-5/6 mx-auto rounded-3xl" id="main-count-items">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:space-x-6">
        <div class="text-center border-2 border-fp1 rounded-2xl lg:me-6">
          <div>
            <Icon class="text-5xl text-fp1" name="ph:graduation-cap-fill" />
          </div>
          <b class="text-4xl text-fp2"><span data-number="3252" class="count-number">0</span><span class="text-3xl lg:text-6xl">+</span></b>
          <p class="text-4xl sm:my-2 lg:mb-8 lg:mt-2 font-medium text-fp1">{{ $t("subscriber") }}</p>
        </div>
        <div class="text-center sm:mt-16 border-2 border-fp1 rounded-2xl sm:w-full">
          <div>
            <Icon class="text-5xl text-fp1" name="ic:baseline-access-alarm" />
          </div>
          <b class="text-4xl text-fp2"><span data-number="3100" class="count-number">0</span><span class="text-3xl lg:text-6xl">+</span></b>
          <p class="text-4xl sm:my-2 lg:mb-8 lg:mt-2 font-medium text-fp1">{{ $t("training_hour") }}</p>
        </div>
        <div class="text-center sm:mt-16 border-2 border-fp1 rounded-2xl sm:w-full">
          <div>
            <Icon class="text-5xl text-fp1" name="mdi:book-open-page-variant-outline" />
          </div>
          <b class="text-4xl text-fp2"><span data-number="248" class="count-number">0</span><span class="text-3xl lg:text-6xl">+</span></b>
          <p class="text-4xl sm:my-2 lg:mb-8 lg:mt-2 font-medium text-fp1">{{ $t("binding_assembly") }}</p>
        </div>
        <div class="text-center sm:mt-16 border-2 border-fp1 rounded-2xl sm:w-full">
          <div>
            <Icon class="text-5xl text-fp1" name="ic:outline-ondemand-video" />
          </div>
          <b class="text-4xl text-fp2"><span data-number="192" class="count-number">0</span><span class="text-3xl lg:text-6xl">+</span></b>
          <p class="text-4xl sm:my-2 lg:mb-8 lg:mt-2 font-medium text-fp1">{{ $t("video") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const incressNumber = () => {
  let nums = document.querySelectorAll(".count-number");
  let section = document.getElementById("main-count-items");
  let started = false; // Function Started ? No
  if (!started) {
    nums.forEach(num => startCount(num));
  }
  started = true;
  /* window.onscroll = function () {
    if (window.scrollY >= section.offsetTop - 700) {
      if (!started) {
        nums.forEach(num => startCount(num));
      }
      started = true;
    }
  }; */

  function startCount(el) {
    let number = el.dataset.number;
    let count = setInterval(() => {
      el.textContent++;
      if (el.textContent == number) {
        clearInterval(count);
      }
    }, 2000 / number);
  }
};
onMounted(() => {
  incressNumber();
});
</script>
