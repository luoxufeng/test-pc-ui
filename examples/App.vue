<template>
  <div id="app">
    <YtoTable
      :pager="page"
      :columns="columns"
      :data="tableData"
      slot="body"
      @selection-change="handleTableSelectionChange"
      @sortChange="sortChange"
      @size-change="handleSizePageChange"
      @current-change="handleCurrentPageChange"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        slot="table_deal"
        fixed="right"
        align="center"
        width="100"
        :resizable="false"
        label="操作"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)">编辑</el-link>
        </template>
      </el-table-column>
    </YtoTable>
    <div>
      <el-button @click="openDialog">点击弹窗,测试弹窗组件</el-button>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <YtoModal
      :visible.sync="imgVisible"
      title="我是测试的哦"
      @onSubmit="onSubmit"
    >
      <div slot="content">这是详细内容哦</div>
    </YtoModal>
    <el-form :inline="true" :model="form" ref="form" label-width="145px" class="yt">
      <el-form-item label="所属区域：" prop="region" ref="regionForm">
        <YtoRegionChoose
          @confirm="setDistrictName"
          :defaultRegion="form.region"
          :defaultRegionName="form.regionName"
        />
      </el-form-item>
      <el-form-item label="所属区域2" prop="city">
       <YtoSelectCity :defaultCity="form.city" @confirm="confirmCity"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data () {
    return {
      imgVisible: false,
      form: {
        region: [],
        regionName: [],
        city:[],
        cityName:[]
      },
      columns: [
        { prop: 'code', label: '代码', sort: false },
        { prop: 'name', label: '名称', sort: false },
        {
          prop: 'useRange',
          label: '使用范围',
          sort: false,
          formatter: (row, column, cellValue) => {
            return `<div style="white-space: nowrap;color: #6383B6;">${row.useRange}</div>`;
          },
          method: (row, column) => {
            console.log('click');
          }
        }
      ],
      tableData: [
        { code: 'E001', name: '这是测试1', useRange: '使用中' },
        { code: 'E002', name: '这是测试2', useRange: '待测试' },
        { code: 'E003', name: '这是测试3', useRange: '一上线' },
        { code: 'E004', name: '这是测试4', useRange: '使用中' },
        { code: 'E005', name: '这是测试5', useRange: '使用中' }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    setDistrictName (data) {
      this.form.region = data.region;
      this.form.regionName = data.regionName;
      // 选择区县之后
      console.log('form.region=' + this.form.region)
      console.log('form.regionName=' + this.form.regionName)
    },
    openDialog () {
      this.imgVisible = true;
    },
    handleSizePageChange (val) {
      this.page.limit = val;
      this.getList();
    },
    handleCurrentPageChange (val) {
      this.page.pageNo = val;
      this.getList();
    },
    // 表格多选
    handleTableSelectionChange (val) {
      this.multipleSelection = val;
    },
    sortChange (column) {
      this.page.sortName = column.prop;
      this.page.sortOrder = column.order === 'descending' ? 'desc' : 'asc';
      if (column.prop === 'useRange') {
        this.page.sortName = 'USE_RANGE';
      }
      this.getList();
    },
    handleEdit () {

    },
    getList () {

    },
    onSubmit () {
    },
    confirmCity(obj) {
      if(obj) {
        console.log('obj='+JSON.stringify(obj))
        this.form.city = obj.city;
        this.form.cityName = obj.cityName;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
</style>
