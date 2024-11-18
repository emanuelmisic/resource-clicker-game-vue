<template>
  <div v-if="type === 'menu'" class="structure--menu">
    <span
      v-html="getIcon(getStructure.icon)"
      class="structure__icon--menu"
    ></span>
    <span class="structure__name--menu">{{
      getStructure?.structure_name
    }}</span>
    <div
      v-if="costDisplay !== ''"
      v-html="costDisplay"
      class="structure__cost--menu"
    />
    <div v-else v-html="'<p>&#10003;</p>'" class="structure__cost--menu" />
    <button
      class="structure__action-btn--menu"
      :disabled="costDisplay === ''"
      @click="handleClick()"
    >
      {{ btnActionDisplay }}
    </button>
  </div>
  <div v-else class="structure">
    <span v-html="getIcon(getStructure.icon)" class="structure__icon"></span>
    <span class="structure__name">{{ getStructure?.structure_name }}</span>
    <span class="structure__level"> {{ structureLevelDisplay }} </span>
    <button
      v-html="addBtnActionHtml"
      class="structure__action-btn"
      @click="
        $emit('add', {
          res: getStructure?.resource_name,
          amount: calculatedAddAmount,
        })
      "
    />
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
    structureLevel: Number,
  },
  data() {
    return {
      level: 0,
    };
  },
  computed: {
    getStructure(): StructureObject {
      const structureList = STRUCTURES;
      for (const i in structureList) {
        if (structureList[i].id === this.structureId) return structureList[i];
      }
      return structureList[0];
    },
    costDisplay(): string {
      let result = "";
      const cost = this.level
        ? this.getStructure.upgrade_costs[this.level - 1]
        : this.getStructure?.build_cost;
      if (!cost) return result;
      for (const k in cost) {
        result += `<p>${getIcon(k)} ${cost[k]}</p>`;
      }
      return result;
    },
    btnActionDisplay(): string {
      if (this.costDisplay === "") return "MAX";
      return this.level ? "UPGRADE" : "BUILD";
    },
    addBtnActionHtml(): string {
      return `+${
        this.getStructure.resource_add_amounts[this.level - 1]
      }${getIcon(this.getStructure.resource_name)}`;
    },
    structureLevelDisplay(): string {
      return `(level ${this.level})`;
    },
    calculatedAddAmount(): number {
      return this.getStructure.resource_add_amounts[this.level - 1];
    },
  },
  watch: {
    structureLevel: {
      immediate: true,
      handler(v) {
        this.level = v;
      },
    },
  },
  methods: {
    getIcon(icon: string) {
      return getIcon(icon);
    },
    handleClick() {
      if (this.level) this.$emit("upgrade", this.getStructure);
      else this.$emit("build", this.getStructure);
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
  margin-top: 10px;
}

.structure--menu .structure__cost--menu p {
  font-size: 1.2rem;
  font-weight: bold;
}

.structure--menu .structure__action-btn--menu {
  margin-top: auto;
  margin-bottom: 2px;
}
</style>
