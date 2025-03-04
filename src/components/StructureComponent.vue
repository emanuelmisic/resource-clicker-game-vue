<template>
  <div v-if="type === 'menu'" class="structure--menu">
    <template v-if="isStructureUnlocked">
      <icon :name="getStructure.icon" class="structure__icon--menu" />
      <span class="structure__name--menu">{{
        getStructure?.structure_name
      }}</span>
      <div v-if="cost" class="structure__cost--menu">
        <span v-for="(n, key) in cost" :key="key">
          <icon :name="`${key}`" size="tiny" />
          {{ n }}
        </span>
      </div>
      <icon v-else name="star" />
      <button
        class="structure__action-btn--menu"
        :disabled="!cost"
        @click="handleActionClick()"
      >
        {{ btnActionDisplay }}
      </button>
    </template>
    <template v-else> LOCKED </template>
  </div>
  <div v-else class="structure">
    <icon :name="getStructure.icon" class="structure__icon" />
    <span class="structure__name">{{ getStructure?.structure_name }}</span>
    <span class="structure__level"> {{ structureLevelDisplay }} </span>
    <button class="structure__action-btn" @click="handleAddClick()">
      +{{ resourceAddAmount }}
      <icon :name="getStructure.resource_name" size="small" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  defineOptions,
  defineEmits,
  defineProps,
  computed,
  ref,
  watch,
} from "vue";
import { useResourcesStore } from "@/stores/resourcesStore";
import { StructureCostType, StructureObject } from "@/helpers/types";
import { STRUCTURES } from "@/helpers/constants";

import Icon from "@/components/IconComponent.vue";

defineOptions({
  name: "StructureComponent",
  components: {
    Icon,
  },
});
const resourcesStore = useResourcesStore();

const emit = defineEmits<{
  build: [structure: StructureObject];
  upgrade: [structure: StructureObject];
}>();

const props = defineProps({
  type: { type: String, default: null },
  structureId: String,
  structureLevel: Number,
  isStructureUnlocked: Boolean,
});

const level = ref(0);

const getStructure = computed<StructureObject>(() => {
  return (
    STRUCTURES.find((structure) => structure.id === props.structureId) ||
    STRUCTURES[0]
  );
});

const cost = computed<StructureCostType>(() => {
  return level.value
    ? getStructure.value.upgrade_costs[level.value - 1]
    : getStructure.value.build_cost;
});

const btnActionDisplay = computed(() => {
  return cost.value ? (level.value ? "UPGRADE" : "BUILD") : "MAX";
});

const resourceAddAmount = computed(() => {
  return getStructure.value.resource_add_amounts[level.value - 1];
});

const structureLevelDisplay = computed(() => {
  return `(level ${level.value})`;
});

watch(
  () => props.structureLevel,
  (v) => {
    level.value = v || 0;
  },
  { immediate: true }
);

function handleActionClick() {
  if (level.value) emit("upgrade", getStructure.value);
  else emit("build", getStructure.value);
}

function handleAddClick() {
  const resName = getStructure.value?.resource_name;
  resourcesStore.addResource(resName, resourceAddAmount.value);
}
</script>

<style>
.structure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;

  background-color: #ffe4c1;

  border: 1px solid #ffb700;
  border-radius: 10%;

  -webkit-box-shadow: 5px 5px 0px 0px #e2a200, 10px 10px 0px 0px #c88f00,
    15px 15px 0px 0px #a27400, 20px 20px 0px 0px #715100,
    25px 25px 0px 0px #4a3500;
  box-shadow: 5px 5px 0px 0px #e2a200, 10px 10px 0px 0px #c88f00,
    15px 15px 0px 0px #a27400, 20px 20px 0px 0px #715100,
    25px 25px 0px 0px #4a3500;
}

.structure .structure__icon {
  margin-top: auto;
  font-size: 2rem;
}

.structure .structure__name {
  font-size: 1.4rem;
}

.structure__action-btn {
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 2px;
  padding: 0 4px 0 4px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a3500;

  border-radius: 6px;

  background: #fffec4;
  background: -moz-linear-gradient(top, #fffec4 0%, #ffdb59 70%, #d2921a 100%);
  background: -webkit-linear-gradient(
    top,
    #fffec4 0%,
    #ffdb59 70%,
    #d2921a 100%
  );
  background: linear-gradient(to bottom, #fffec4 0%, #ffdb59 70%, #d2921a 100%);
}

.structure--menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;

  border: 4px solid #4a3500;
  border-radius: 20%;
}

.structure--menu .structure__icon--menu {
  margin-top: auto;
  font-size: 1.8rem;
}

.structure--menu .structure__name--menu {
  font-size: 1.6rem;
}

.structure--menu .structure__cost--menu {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.structure--menu .structure__cost--menu span {
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
}

.structure--menu .structure__action-btn--menu {
  margin-top: auto;
  margin-bottom: 2px;
}
</style>
