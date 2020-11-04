<template>
  <div>
    <el-cascader
      ref="sendAddress"
      class="item-city-style"
      v-model="selectedOptions"
      :options="options"
      :props="sendProps"
      @active-item-change="handleChange"
      @change="sourceProChange"
    ></el-cascader>
  </div>
</template>
<script>
import API from '../../utils/api'
export default {
  name: 'YtoSelectCity',
  props: {
    defaultCity: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      selectedOptions: this.defaultCity,
      options: [],
      sendProps: {
        label: 'name',
        value: 'code',
        children: 'datas'
      },
    }
  },
  created () {
    this.getDistrict('', this.options, () => {
      if (this.selectedOptions && this.selectedOptions.length > 0) {
        this.setDistrict(this.options, this.selectedOptions, 0)
      }
    });
  },
  methods: {
    getDistrict (parentCode, collection, callback) {
      API.getCity({ parentCode: parentCode }).then(({ datas }) => {
        datas.forEach(item => {
          // 后端加完去除
          // item.datas = [];
          // 澳门特别行政区
          if (item.code === '00853') {
            item.datas = undefined;
            item.leaf = true;
          }
          collection.push(item);
        });
        callback && callback();
      });
    },
    handleChange (val) {
      console.log('handleChange')
      let limit = 3;
      if (val[0] === '00853') {
        limit = 1;
      } else if (val[0] === '886001') {
        limit = 2;
      }
      this.selectDistrict(this.options, val, limit);
    },
    sourceProChange (val) {
      let cityList = this.$refs.sendAddress.getCheckedNodes()[0].pathLabels;
      this.$emit('confirm', {
        cityName: cityList,
        city: val
      })
    },
    // 选取上级，获取下级
    selectDistrict (collection, val, limit = 3) {
      let l = val.length;
      API.getCity({ parentCode: val[l - 1] }).then(res => {
        if (res.datas && res.datas.length > 0) {
          if (val.length + 1 === limit) {
            for (let i = 0, l = res.datas.length; i < l; i++) {
              res.datas[i].datas = undefined;
            }
          }
          this.insertOption(collection, val, 0, res.datas);
        } else {
          this.insertOption(collection, val, 0, undefined);
        }
      });
    },

    setDistrict (collection, value, index, limit = 3) {
      API.getCity({ parentCode: value[index] }).then(({ datas }) => {
        if (index + 2 === value.length) {
          for (let i = 0, l = datas.length; i < l; i++) {
            datas[i].datas = undefined;
          }
        }
        for (let i = 0, l = collection.length; i < l; i++) {
          if (value[index] === collection[i].code) {
            collection[i].datas = datas;
            if (index + 2 < value.length) {
              this.setDistrict(datas, value, ++index, limit);
            }
          }
        }
      });
    },

    insertOption (list, valList, index, fillList) {
      let value = valList[index];
      for (let i = 0, l = list.length; i < l; i++) {
        if (value === list[i].code) {
          if (index + 1 === valList.length) {
            list[i].datas = fillList;
          } else {
            this.insertOption(list[i].datas, valList, index + 1, fillList);
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>