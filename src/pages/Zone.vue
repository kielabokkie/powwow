<template>
  <div class="page-wrapper" id="zone-wrapper" v-if="zone">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>{{ zone.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ zone.name }}</h1>

    <template v-if="records">
      <el-table
        :data="records"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ttl"
          label="TTL"
          width="100">
        </el-table-column>
        <el-table-column
          prop="content"
          label="Content">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="Operations"
          width="120">
          <span>
            <el-button @click="handleDelete(row)" size="small" type="danger">Delete</el-button>
          </span>
        </el-table-column>
      </el-table>
    </template>

    <record-form :zone="zone.id" @updateRecords="onUpdateRecords"></record-form>

    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>

<script>
import RecordForm from './../components/RecordForm'

export default {
  name: 'zone',

  components: {
    RecordForm
  },

  data () {
    return {
      zone: null,
      records: []
    }
  },

  created () {
    this.fetchRecords()
  },

  methods: {
    fetchRecords: function () {
      this.$http.get(process.env.API_URL + '/zones/' + this.$route.params.id)
        .then(response => {
          this.records = []

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
    },
    onUpdateRecords: function () {
      // Refresh records
      this.fetchRecords()
    },
    handleDelete: function (row) {
      this.$confirm('Are you sure you want to delete this record?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
        // type: 'warning'
      }).then(() => {
        let record = {
          name: row.name,
          type: row.type,
          changetype: 'DELETE'
        }

        let data = {rrsets: [record]}

        this.$http.patch(process.env.API_URL + '/zones/' + this.zone.id, data)
          .then(response => {
            // Fetch the updated records
            this.fetchRecords()

            // Notify user of successful update
            this.$message({
              type: 'success',
              message: 'Record deleted successfully'
            })
          })
      }).catch(() => {
        // Don't do a thing
      })
    }
  }
}
</script>

<style scoped></style>
