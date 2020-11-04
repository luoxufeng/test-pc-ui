import YtoModal from './YtoModal';
import YtoTable from './YtoTable';
import YtoRegionChoose from './YtoRegionChoose';
import YtoSelectCity from './YtoSelectCity';
const components = [
  YtoModal,
  YtoTable,
  YtoRegionChoose,
  YtoSelectCity
];
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  YtoModal,
  YtoTable,
  YtoRegionChoose,
  YtoSelectCity
};
