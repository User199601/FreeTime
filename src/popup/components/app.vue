<template>
    <div class="container">
        <el-container>
        <el-header>

        </el-header>
        <el-main>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
         tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>


<style lang="less" scoped>
	.container {
        min-width: 600px;
        min-height: 200px;
    }
</style>