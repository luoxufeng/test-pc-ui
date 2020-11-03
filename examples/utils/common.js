
export default {
  install: function (Vue) {
    Vue.mixin({
      data () {
        return {
          page: {
            pageNo: 1,
            limit: 10,
            sizes: [10, 50, 100],
            total: 0,
            sortName: '',
            sortOrder: ''
          },
          wordLen: {
            short: 10,
            normal: 15,
            long: 20,
            big: 30,
            large: 50,
            super: 128
          }
        };
      },
      methods: {
        resetForm (formName = 'form') {
          if (typeof this.$refs[formName].resetFields === 'undefined') {
            if (
              typeof this.$refs[formName].$refs['form'].resetFields ===
              'undefined'
            ) {
              throw new Error('ref不正确，请确定form是否存在!');
            } else {
              this.$refs[formName].$refs['form'].resetFields();
            }
          } else {
            this.$refs[formName].resetFields();
          }
        },
        confirmFn (fn, obj) {
          let objData = {
            ...{
              title: '提示',
              message: '此操作将永久删除, 是否继续?',
              sureText: '确定',
              cancelText: '取消',
              type: 'warning'
            },
            ...obj
          };
          this.$confirm(objData.message, objData.title, {
            confirmButtonText: objData.sureText,
            cancelButtonText: objData.cancelText,
            type: objData.type,
            closeOnClickModal: false
          }).then(() => {
            fn();
          });
        }
      }
    });

    // 添加的内容写在这个函数里面
    Vue.prototype.delSuccess = function () {
      this.$message({
        message: '删除成功!',
        type: 'success',
        duration: 2000
      });
    };
    Vue.prototype.delFail = function (obj) {
      if (obj != null) {
        this.$message(
          ...{
            message: '删除失败!',
            type: 'warning',
            duration: 2000
          },
          ...obj
        );
      } else {
        this.$message({
          message: '删除失败!',
          type: 'warning',
          duration: 2000
        });
      }
    };

    // 添加的内容写在这个函数里面
    Vue.prototype.saveSuccess = function (obj) {
      if (obj != null) {
        this.$message(
          ...{
            message: '保存成功!',
            type: 'success',
            duration: 2000
          },
          ...obj
        );
      } else {
        this.$message({
          message: '保存成功!',
          type: 'success',
          duration: 2000
        });
      }
    };
    Vue.prototype.saveFail = function (obj) {
      if (obj != null) {
        this.$message(
          ...{
            message: '保存失败!',
            type: 'warning',
            duration: 2000
          },
          ...obj
        );
      } else {
        this.$message({
          message: '保存失败!',
          type: 'warning',
          duration: 2000
        });
      }
    };

    Vue.prototype.hint = function (obj) {
      if (obj != null) {
        this.$message(
          ...{
            message: '保存失败!',
            type: 'warning',
            duration: 2000
          },
          ...obj
        );
      } else {
        this.$message({
          message: '保存失败!',
          type: 'warning',
          duration: 2000
        });
      }
    };

    Vue.prototype.hint = function (title, type = 'warning') {
      this.$message({
        message: title,
        type: type,
        duration: 2000
      });
    };
  }
};
