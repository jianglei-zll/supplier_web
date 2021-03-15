<template> 
  <product-prop-detail :is-edit='true'></product-prop-detail>
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
