new Vue({
    el: '#app',
    data() {
      return {
        bodega1: 100000,
        bodega2: 230000,
        ventasBodega1: 0,
        ventasBodega2: 0,
        unidad: '',
        cantidad: '',
        bodegaSeleccionada: '',
        mensaje: '',
        tabla: false
      }
    },
    methods: {
      vender() {
        localStorage.setItem("cantidad",this.cantidad)
        if (this.cantidad > this.bodega1 && this.bodegaSeleccionada === 'bodega1') {
          this.mensaje = 'No se pueden realizar ventas de la bodega 1, el inventario ha llegado a cero o su cantidad supera al inventario';
          return;
        }
        if (this.cantidad > this.bodega2  && this.bodegaSeleccionada === 'bodega2') {
          this.mensaje = 'No se pueden realizar ventas de la bodega 2, el inventario ha llegado a cero o su cantidad supera al inventario';
          return;
        }
        
        let totalVendido = 0;
        if (this.unidad === 'kilos') {
          totalVendido = this.cantidad;
        } else if (this.unidad === 'libras') {
          totalVendido = this.cantidad / 2.20462;
        } else if (this.unidad === 'gramos') {
          totalVendido = this.cantidad / 1000;
        }
  
        if (this.bodegaSeleccionada === 'bodega1') {
          this.bodega1 -= totalVendido;
          this.ventasBodega1 += totalVendido;
          localStorage.setItem("totalVendidoB1",this.ventasBodega1)
          if (this.bodega1 <= 100000 / 2) {
            this.mensaje = 'El inventario de la bodega 1 ha llegado a la mitad';
          }
          if (this.bodega1 <= 100000 / 10) {
            this.mensaje = 'El inventario de la bodega 1 está próximo a agotarse';
          }
          
        } else if (this.bodegaSeleccionada === 'bodega2') {
          this.bodega2 -= totalVendido;
          this.ventasBodega2 += totalVendido;
          localStorage.setItem("totalVendidoB2",this.ventasBodega1)
          if (this.bodega2 <= 230000 / 2) {
            this.mensaje = 'El inventario de la bodega 2 ha llegado a la mitad';
          }
          if (this.bodega2 <= 230000 / 10) {
            this.mensaje = 'El inventario de la bodega 2 está próximo a agotarse';
          }
        }
        
      }
    }
  });