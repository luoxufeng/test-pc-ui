<template>
  <div class="s-dialog">
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width">
      <!-- content -->
      <slot name="content"></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'YtoModal',
  props: {
    visible: {
      type: Boolean,
      default: () => { return true; }
    },
    width: {
      type: String,
      default: '500px'
    },
    // 弹窗标题
    title: {
      type: String,
      default: '测试'
    }
  },
  data () {
    return {
      dialogVisible: this.visible
    };
  },
  watch: {
    visible (val) {
      this.dialogVisible = val;
    },
    dialogVisible (val) {
      this.$emit('update:visible', val);
    }
  },
  created () {
    this.dialogVisible = this.visible;
  },
  mounted () {
  },
  methods: {
    submit () {
      this.dialogVisible = false;
      this.$emit('onSubmit')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
