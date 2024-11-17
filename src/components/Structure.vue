<template>
  <div v-if="type === 'menu'" class="structure--menu">
    <span class="structure__icon--menu">&#129704;</span>
    <span class="structure__name--menu">Stone Quarry</span>
    <div class="structure__cost--menu">&#129717; 50</div>
    <button class="structure__action-btn--menu" @click="$emit('buy')">
      BUY
    </button>
  </div>
  <div v-else class="structure">
    <span v-html="$getIcon('tree')" class="structure__icon"></span>
    <span class="structure__name">{{ name }}</span>
    <button class="structure__action-btn" @click="$emit('add')">
      {{ btnText }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "StructureComponent",
  props: {
    type: { type: String, default: null },
    name: { type: String, default: null },
    icon: { type: String, default: null },
    btnText: { type: String, default: null },
  },
};
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
  margin-top: auto;
  font-size: 1.2rem;
}

.structure--menu .structure__action-btn--menu {
  margin-top: auto;
}
</style>
