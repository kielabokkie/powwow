<template>
  <div class="record-form">
    <el-button type="primary" @click="dialogFormVisible = true">Add record</el-button>

    <el-dialog title="New Record" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="Please select a type">
            <el-option label="A" value="A"></el-option>
            <el-option label="MX" value="MX"></el-option>
            <el-option label="CNAME" value="CNAME"></el-option>
            <el-option label="TXT" value="TXT"></el-option>
            <el-option label="AAAA" value="AAAA"></el-option>
            <el-option label="SRV" value="SRV"></el-option>
            <el-option label="NS" value="NS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="TTL" :label-width="formLabelWidth">
          <el-input v-model="form.ttl" placeholder="e.g. 3600" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="form.records[0].content" placeholder="e.g. 198.51.100.0" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm(), dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'record-form',

  props: {
    zone: {
      type: String
    }
  },

  data () {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        name: this.zone,
        type: 'A',
        ttl: null,
        changetype: 'REPLACE',
        records: [
          {
            content: '',
            disabled: false
          }
        ]
      }
    }
  },

  methods: {
    handleConfirm () {
      let data = {rrsets: [this.form]}

      this.$http.patch(process.env.API_URL + '/zones/' + this.zone, data)
        .then(response => {
          // Notify event listeners that records have been updated
          this.$emit('updateRecords')

          // Reset the local form to the defaults
          this.form.name = this.zone
          this.form.type = 'A'
          this.form.records[0].content = ''

          // Notify user of successful update
          this.$message({
            type: 'success',
            message: 'Record added successfully'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .record-form {
    margin-top: 20px;
  }
</style>
