<template>
  <img :src="iconSrc" :width="size" :height="size" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IconComponent",
  props: {
    iconName: String,
    iconSize: String,
  },
  computed: {
    size(): number {
      switch (this.iconSize) {
        case "tiny":
          return 16;
        case "small":
          return 18;
        default:
          return 26;
      }
    },
    iconSrc(): string {
      switch (this.iconName) {
        // resources
        case "wood":
          return new URL(
            "@/assets/icons/resources/icons8-wood.png",
            import.meta.url
          ).href;
        case "stone":
          return new URL(
            "@/assets/icons/resources/icons8-stone.png",
            import.meta.url
          ).href;
        case "clay":
          return new URL(
            "@/assets/icons/resources/icons8-pottery.png",
            import.meta.url
          ).href;
        case "iron":
          return new URL(
            "@/assets/icons/resources/icons8-iron.png",
            import.meta.url
          ).href;
        // other
        case "tree":
          return new URL(
            "@/assets/icons/other/icons8-tree.png",
            import.meta.url
          ).href;
        case "star":
          return new URL(
            "@/assets/icons/other/icons8-star.png",
            import.meta.url
          ).href;

        default:
          return "";
      }
    },
  },
});
</script>
