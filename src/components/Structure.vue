<template>
  <div v-if="type === 'menu'" class="structure--menu">
    <span
      v-html="getIcon(getStructure.icon)"
      class="structure__icon--menu"
    ></span>
    <span class="structure__name--menu">{{
      getStructure?.structure_name
    }}</span>
    <div v-html="displayCost" class="structure__cost--menu"></div>
    <button
      class="structure__action-btn--menu"
      @click="$emit('buy', getStructure)"
    >
      BUY
    </button>
  </div>
  <div v-else class="structure">
    <span v-html="getIcon(getStructure.icon)" class="structure__icon"></span>
    <span class="structure__name">{{ getStructure?.structure_name }}</span>
    <button
      class="structure__action-btn"
      @click="$emit('add', { res: getStructure?.resource_name, amount: 1 })"
    >
      Generate {{ getStructure?.resource_name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { StructureObject } from "@/helpers/types";
import { getIcon } from "@/helpers/globalMethods";
import { STRUCTURES } from "@/helpers/constants";

export default defineComponent({
  name: "StructureComponent",
  props: {
    type: { type: String, default: null },
    structureId: String,
  },
  computed: {
    getStructure(): StructureObject {
      const structureList = STRUCTURES;
      for (const i in structureList) {
        if (structureList[i].id === this.structureId) return structureList[i];
      }
      return structureList[0];
    },
    displayCost(): string {
      const cost = this.getStructure?.build_cost;
      if (!cost) return "";
      let result = "";
      for (const k in cost) {
        result += `<p>${getIcon(k)} ${cost[k]}</p>`;
      }
      return result;
    },
  },
  methods: {
    getIcon(icon: string) {
      return getIcon(icon);
    },
  },
});
</script>

<style>
.structure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;

  border: 1px solid black;
}

.structure .structure__icon {
  margin-top: auto;
  font-size: 2rem;
}

.structure .structure__name {
  font-size: 1.4rem;
}

.structure__action-btn {
  margin-top: auto;
}

.structure--menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;

  border: 1px solid black;
}

.structure--menu .structure__icon--menu {
  margin-top: auto;
  font-size: 1.8rem;
}

.structure--menu .structure__name--menu {
  font-size: 1.6rem;
}

.structure--menu .structure__cost--menu {
  margin-top: 10px;
}

.structure--menu .structure__cost--menu p {
  font-size: 1.2rem;
}

.structure--menu .structure__action-btn--menu {
  margin-top: auto;
}
</style>
