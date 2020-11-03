<template>
  <div class="t-box">
    <el-table
      :data="data"
      :border="isBorder"
      ref="customTable"
      :columns="columns"
      :show-summary="showSummary"
      :summary-method="getSummar"
      :span-method="spanMethod"
      :default-sort="defaultSort"
      tooltip-effect="light"
      @selection-change="selectChange"
      :cell-class-name="cellHandle"
      header-row-class-name="gray"
      style="margin-top: 12px"
      @sort-change="sortChange"
      :row-class-name="tableRowClassName"
    >
      <slot></slot>
      <el-table-column
        v-if="isShowOrHidden"
        prop
        type="index"
        width="60"
        align="center"
        label="序号"
        :resizable="false"
      >
        <template slot-scope="scope">{{
          pager ? pager.limit * (pager.pageNo - 1) + scope.$index + 1 : ""
        }}</template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        :sortable="obj.sort === false ? false : 'custom'"
        :align="obj.align ? obj.align : 'center'"
        v-for="(obj, index) in columns"
        :key="index"
        :show-overflow-tooltip="obj.tooltip"
        :min-width="obj.minWidth"
        :width="obj.width"
        :prop="obj.prop"
        :label="obj.label"
      >
        <template slot-scope="scope">
          <template v-if="obj.tooltipComponent">
            <span v-if="obj.tooltipComponent(scope.row.checkFlag, obj) == 1">
              <div>
                <el-tooltip
                  style="margin: 0 auto; width: fit-content"
                  class="item"
                  effect="dark"
                  placement="right"
                >
                  <div slot="content" style="width: 250px !important">
                    {{
                      obj.checkInfo(scope.row, obj)
                        ? obj.checkInfo(scope.row, obj)
                        : "未注明原因"
                    }}
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #ecaa10;
                    "
                  >
                    <span>待复核</span>
                    <icon
                      name="questionMark"
                      width="18"
                      height="18"
                      style="margin-left: 5px"
                    ></icon>
                  </div>
                </el-tooltip>
              </div>
            </span>
            <span v-else-if="obj.tooltipComponent(scope.row.status, obj) == 0"
              >已生成</span
            >
            <span v-else-if="obj.tooltipComponent(scope.row.status, obj) == 1"
              >已发送业务员</span
            >
          </template>
          <template v-else-if="obj.formatter">
            <span
              v-html="obj.formatter(scope.row, obj)"
              @click="obj.method ? obj.method(scope.row, obj) : ''"
            ></span>
          </template>
          <template v-else-if="obj.input">
            <el-input
              v-model.trim="scope.row[obj.prop]"
              placeholder
              @input="update(scope, index, obj.prop)"
            ></el-input>
          </template>
          <template v-else>
            <span>{{ scope.row[obj.prop] }}</span>
          </template>
        </template>
      </el-table-column>
      <slot name="table_deal" />
    </el-table>
    <el-pagination
      v-if="isShowPage"
      v-bind="$attrs"
      v-on="$listeners"
      style="text-align: center; margin: 20px 0"
      :current-page="pager.pageNo"
      :page-sizes="pager.sizes"
      :page-size="pager.limit"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'YtoTable',
  props: {
    columns: Array,
    data: Array,
    pager: Object,
    defaultSort: Object,
    getSummar: Function,
    spanMethod: Function,
    maxHeight: {
      type: Number,
      default: 475
    },
    isShowOrHidden: {
      type: Boolean,
      default: () => { return true; }
    },
    isBorder: {
      type: Boolean,
      default: () => { return true; }
    },
    showSummary: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    isShowPage: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data () {
    return {
      selectData: [],
      selectRow: []
    };
  },
  mounted () {
  },
  methods: {
    selectChange (val) {
      this.$emit('selection-change', val);
      this.selectData = val;
    },
    sortChange (column) {
      this.$emit('sortChange', column);
    },
    // 多选高亮选中行
    cellHandle ({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        return 'selectbg';
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'gray-row';
      }
      return '';
    },
    // 表格 表单 嵌套 更新父组件的table 数据
    update (scope, index, prop) {
      let row = JSON.parse(JSON.stringify(scope.row));
      let obj = {
        row: row,
        index: index
      };
      this.$emit('updateDate', obj);
    }
  },
  watch: {
    selectData (data) {
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach(item => {
          this.selectRow.push(this.data.indexOf(item));
        });
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
.t-box /deep/ {
  // .selectbg {
  //   background-color: #f2edf5 !important;
  // }
  .gray-row {
    background: #f8f8f9;
  }
  .gray th {
    background: #f5f7fa;
  }
}
</style>
