<template>
  <div class="page-wrapper" id="dashboard-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Zones</h1>

    <template v-if="zones">
      <el-table
        :data="zones"
        border
        style="width: 300px"
        @row-click="handleRowClick">
        <el-table-column
          prop="name"
          label="Name"
          width="200">
        </el-table-column>
        <el-table-column
          prop="kind"
          label="Type"
          width="100">
        </el-table-column>
      </el-table>
    </template>

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
  },

  methods: {
    handleRowClick (row) {
      this.$router.push({name: 'zone', params: { id: row.id }})
    }
  }
}
</script>

<style scoped></style>
