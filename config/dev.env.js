'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   BASE_API: '"https://jiuzheng2.takedata.cn/admin/"'
  // BASE_API: '"http://192.168.10.66:8202"'
  // BASE_API: '"http://10.50.3.26:8202"'
})