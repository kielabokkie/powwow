<template>
  <div class="page-wrapper" id="dashboard-wrapper">
    <h1>Zones</h1>
    <ul class="zones-list" v-if="zones">
      <li class="list-item" v-for="zone in zones">
        <span>
          <router-link :to="{ name: 'zone', params: { id: zone.id }}" class="title">{{ zone.name }}</router-link>
        </span>
      </li>
    </ul>
    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>

<script>
export default {
  name: 'dashboard',

  data () {
    return {
      zones: null
    }
  },

  created () {
    this.$http.get(process.env.API_URL + '/zones')
      .then(response => {
        this.zones = response.body
      })
  }
}
</script>

<style scoped></style>
