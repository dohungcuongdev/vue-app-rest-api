/**  Mixins are a flexible way to distribute reusable functionalities for Vue components. 
A mixin object can contain any component options. When a component uses a mixin, 
all options in the mixin will be “mixed” into the component’s own options.*/

export const mymixin = {
    methods: {
      testMyMixin: function () {
        console.log('testMyMixin')
      },
      conflicting: function () {
        console.log('from mixin')
      }
    }
  }