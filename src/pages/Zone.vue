<template>
  <div class="page-wrapper" id="zone-wrapper" v-if="zone">
    <h1>{{ zone.name }}</h1>

    <template>
      <el-table
        :data="records"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type"
          width="80">
        </el-table-column>
        <el-table-column
          prop="ttl"
          label="TTL"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content"
          label="Content"
          width="500">
        </el-table-column>
        <el-table-column
          prop="disabled"
          label="Disabled">
        </el-table-column>
      </el-table>
    </template>

    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>

<script>
export default {
  name: 'zone',

  data () {
    return {
      zone: null,
      records: []
    }
  },

  created () {
    this.$http.get(process.env.API_URL + '/zones/' + this.$route.params.id)
      .then(response => {
        let zone = response.body

        for (var i = zone.rrsets.length - 1; i >= 0; i--) {
          let recordSet = zone.rrsets[i]

          for (var x = recordSet.records.length - 1; x >= 0; x--) {
            let record = recordSet.records[x]

            var object = {
              name: recordSet.name,
              type: recordSet.type,
              ttl: recordSet.ttl,
              content: record.content,
              disabled: record.disabled
            }

            this.records.push(object)
          }
        }
        this.zone = response.body
      })
  }
}
</script>

<style scoped></style>
