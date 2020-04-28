<template>
  <v-container>
    <v-card>
      <v-card-title>
        Multiple Instance
      </v-card-title>
      <v-list>
        <v-list-item v-if="!isVisible">
          <v-list-item-title>
            visible first
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-title>
            visible second
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn @click="switchListItem">switch</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'MultipleInstanceWarningTest',
  data: () => ({
    isVisible: false
  }),
  methods: {
    switchListItem: function () {
      this.isVisible = !this.isVisible
    }
  }
}
</script>>