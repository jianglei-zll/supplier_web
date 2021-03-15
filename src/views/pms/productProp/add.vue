<template> 
  <product-prop-detail :is-edit='false'></product-prop-detail>
</template>
<script>
  import ProductPropDetail from './components/productPropDetail'
  export default {
    name: 'addProductProp',
    components: { ProductPropDetail }
  }
</script>
<style>
</style>
