import Vue from 'vue'
import iIcon from '@/components/i-icon'
import iBtn from '@/components/i-btn'
import iBtnLink from '@/components/i-btn-link'
import pageHeader from '@/components/page-header'
import pageActions from '@/components/page-actions'

export default ({ app, store }) => {
  Vue.component('icon', iIcon)
  Vue.component('i-btn', iBtn)
  Vue.component('i-btn-link', iBtnLink)
  Vue.component('page-header', pageHeader)

  Vue.filter('money', val => {
    let a, s = Number(val).toFixed(2);
    while (a = s.match(/\d(\d{3}[^\d])/)) s = s.replace(a[1], " " + a[1]);
    return s.substr(0,s.length - 3);
  })

  String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
  };
}
