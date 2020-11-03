<template>
  <div class="region">
    <el-input
      v-model="inputValue"
      placeholder="请选择省市区"
      size="small"
      class="region-input"
      readonly
      @focus.stop="showOrigin"
      ref="input"
    ></el-input>
    <div class="region_content" v-show="showFlag">
      <el-tabs :tab-position="tabPosition" v-model="name">
        <el-tab-pane label="热门" name="hotCity">
          <div class="region_content_area">
            <span
              v-for="item in newHotCityList"
              :key="item.code"
              :title="item.name"
              @click.stop="selCity(item, true)"
              :class="{ sel: item.sel }"
              >{{ item.name }}
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="省份" name="province">
          <div class="region_content_area">
            <span
              v-for="item in newDistrictOptions"
              :key="item.code"
              :title="item.name"
              @click.stop="selProvince(item)"
              :class="{ sel: item.sel }"
              >{{ item.name }}
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="城市" name="city">
          <div class="region_content_area" v-if="cityList.length">
            <span
              v-for="item in cityList"
              :key="item.code"
              :title="item.name"
              @click.stop="selCity(item, false)"
              :class="{ sel: item.sel }"
              >{{ item.name }}</span
            >
          </div>
          <p v-else class="nodata">请选择所属城市</p>
        </el-tab-pane>
        <el-tab-pane label="区县" name="district">
          <div class="region_content_area" v-if="districtList.length">
            <span
              v-for="item in districtList"
              :key="item.code"
              :title="item.name"
              :class="{ sel: item.sel }"
              @click.stop="selDistrict(item, true)"
              >{{ item.name }}</span
            >
          </div>
          <p v-else class="nodata">请选择所属城市</p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import city from './regin.js'
export default {
  name: 'YtoRegionChoose',
  props: {
    defaultRegion: {
      default: () => [],
      type: Array
    },
    defaultRegionName: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    defaultRegionName: {
      handler (val) {
        if (val && val.length && val[0] !== undefined) {
          this.inputValue = val.join('-');
        }
      },
      immediate: true
    },
    region: {
      handler (val) {
        this.newHotCityList.forEach((item) => {
          this.$set(item, 'sel', false);
        });
        this.newHotCityList.forEach((item, index) => {
          if (val.includes(item.code)) {
            this.$set(item, 'sel', true);
          }
        });
      },
      immediate: true,
      deep: true
    },

    showFlag (val) {
      if (!val) {
        document.body.removeEventListener('click', this.hide, false);
      } else {
        document.body.addEventListener('click', this.hide, false);
      }
    }
  },
  computed: {
    newDistrictOptions () {
      return JSON.parse(JSON.stringify(this.districtOptions));
    },
    newHotCityList () {
      return JSON.parse(JSON.stringify(this.hotCityList));
    }
  },
  data () {
    return {
      tabPosition: 'top',
      regionName: [],
      inputValue: '',
      showFlag: false,
      name: 'hotCity',
      cityList: [],
      region: [], // code列表
      districtList: [],
      hotCityList: [], // 热门城市列表
      districtOptions: [] //省市区列表
    };
  },
  // inject: ['districtOptions', 'hotCityList'],
  mounted () {
    console.log('hotCityList=' + city.hotCityList)
    this.hotCityList = city.hotCityList;
    this.districtOptions = city.districtOptions;
  },
  methods: {
    hide (e) {
      console.log(this);
      if (
        e.target.offsetParent &&
        e.target.offsetParent.className.indexOf('region-input') < 0 &&
        e.target.className.indexOf('el-tabs__item') < 0
      ) {
        this.showFlag = false;
      }
      // this.showFlag = false
    },
    showOrigin () {
      if (this.defaultRegion.length && this.defaultRegion[0]) {
        this.selProvince({
          code: this.defaultRegion[0],
          name: this.defaultRegionName[0]
        });
      }
      if (this.defaultRegion.length && this.defaultRegion[1]) {
        this.selCity({
          code: this.defaultRegion[1],
          name: this.defaultRegionName[1]
        });
      }
      if (this.defaultRegion.length && this.defaultRegion[2]) {
        this.selDistrict({
          code: this.defaultRegion[2],
          name: this.defaultRegionName[2]
        });
      }
      this.showFlag = true;
    },
    selProvince (item) {
      this.cityList = [];
      this.districtList = [];
      let provinceItem = {};
      provinceItem = this.newDistrictOptions.find(
        (ele) => ele.code === item.code
      );
      if (provinceItem.child) {
        this.cityList = provinceItem.child;
      }
      this.newDistrictOptions.forEach((item) => {
        this.$set(item, 'sel', false);
      });
      this.$set(provinceItem, 'sel', true);
      this.name = 'city';
      this.region = [item.code];
      this.regionName = [item.name];
    },
    selCity (item, hotFlag) {
      let cityItem = {};
      this.cityList.length &&
        this.cityList.forEach((item) => {
          this.$set(item, 'sel', false);
        });
      // 热门城市
      if (hotFlag) {
        this.newHotCityList.forEach((item) => {
          this.$set(item, 'sel', false);
        });
        let province = this.newDistrictOptions.find(
          (ele) => ele.code === item.parentCode
        );
        // 是否有对应省份
        if (province && province.child) {
          this.cityList = this.newDistrictOptions.find(
            (ele) => ele.code === item.parentCode
          ).child;
          cityItem = this.cityList.find((ele) => ele.code === item.code);
          this.newDistrictOptions.forEach((item) => {
            this.$set(item, 'sel', false);
          });
          this.$set(province, 'sel', true);
          this.$set(cityItem, 'sel', true);
          this.region = [];
          this.region = [province.code, cityItem.code];
          this.regionName = [province.name, cityItem.name];
        } else {
          this.cityList = [];
        }
      } else {
        this.$set(this.region, 1, item.code);
        this.$set(this.regionName, 1, item.name);
      }
      // 选中城市
      this.districtList = [];
      cityItem = this.cityList.find((ele) => ele.code === item.code);
      if (cityItem && cityItem.child) {
        this.districtList = cityItem.child;
      }
      this.$set(cityItem, 'sel', true);
      this.name = 'district';
    },
    selDistrict (item, confirmFlag) {
      this.districtList.forEach((item) => {
        this.$set(item, 'sel', false);
      });
      let districtItem = {};
      districtItem = this.districtList.find((ele) => ele.code === item.code);
      if (districtItem) {
        this.$set(districtItem, 'sel', true);
        this.$set(this.region, 2, item.code);
        this.$set(this.regionName, 2, item.name);
      }

      if (confirmFlag) {
        this.inputValue = this.regionName.join('-');
        this.showFlag = false;
        this.$refs.input.blur();
        this.$emit('confirm', {
          regionName: this.regionName,
          region: this.region
        });
      }
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.region {
  position: relative;
  width: 592px;
  &_content {
    position: absolute;
    z-index: 100;
    top: 35px;
    left: 0;
    width: 512px;
    background: #fff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    .nodata {
      text-align: center;
    }
    &_area {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      span {
        padding: 0 18px;
        height: 22px;
        line-height: 22px;
        // background: #f2f1ff;
        text-align: center;
        // margin-right: 7px;
        margin-bottom: 10px;
        border-radius: 2px;
        color: #000;
        width: 25%;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .sel {
        color: #fff;
        background: #401268;
      }
    }
    /deep/ .el-tabs__nav-scroll {
      background: #e3e4f8;
      box-sizing: border-box;
    }
    /deep/ .el-tabs__nav-scroll {
      padding-left: 20px;
    }
    /deep/ .el-tabs__content {
      min-height: 100%;
    }
    /deep/ .el-tabs__item {
      font-weight: bold;
    }
  }
}
</style>
