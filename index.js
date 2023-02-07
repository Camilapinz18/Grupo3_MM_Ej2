const app = Vue.createApp({
  data () {
    return {
      inventario: [
        { bodega: 1, cantidad: 100000 },
        { bodega: 2, cantidad: 230000 }
      ],
      cantidadIngresada: null,
      bodegaSeleccionada: null,
      unidadSeleccionada: null,
      unidadesMedida: {},
      isBienvenida: false,
      isCompra: false
    }
  },

  methods: {
    alCargarPagina () {
      localStorage.setItem('inventario', JSON.stringify(this.inventario))
      this.isBienvenida = true
    },
    irAComprar () {
      ;(this.isBienvenida = false), (this.isCompra = true)
    },
    actualizarLocalStorage (actualizacion) {
      let inventarioActualizar = JSON.parse(localStorage.getItem('inventario'))
      console.log('cantidad', actualizacion.cantidad)
      console.log('bodega', actualizacion.bodega)

      inventarioActualizar = inventarioActualizar.map(item => {
        if (actualizacion.bodega === 1) {
          if (item.bodega === 1) {
            item.cantidad = actualizacion.cantidad
          }

          return item
        } else if (actualizacion.bodega === 2) {
          if (item.bodega === 2) {
            item.cantidad = actualizacion.cantidad
          }

          return item
        }
      })

      localStorage.setItem('inventario', JSON.stringify(inventarioActualizar))
    },
    convertirCantidad () {
      if (this.unidadSeleccionada == 'kg') {
      } else if (this.unidadSeleccionada == 'lb') {
        this.cantidadIngresada = this.cantidadIngresada / 2
        console.log(this.cantidadIngresada, 'CONVERSION LIBRAS')
      } else if (this.unidadSeleccionada == 'g') {
        this.cantidadIngresada = this.cantidadIngresada / 1000
        console.log(this.cantidadIngresada, 'CONVERSION GRAMOS')
      }
    },
    realizarCompra () {
      if (this.cantidadIngresada === '' || this.cantidadIngresada <= 0) {
        alert('Datos invalidos. No puede ser un menor menor o igual a 0')
        this.cantidadIngresada = ''
      } else {
        if (this.bodegaSeleccionada === '1') {
          console.log('b1:', this.bodegaSeleccionada)
          const inventarioModificar = this.inventario.find(
            bodega => bodega.bodega == this.bodegaSeleccionada
          )
          this.convertirCantidad()
          const objetoInventarioModificar = {
            bodega: inventarioModificar.bodega,
            cantidad: (inventarioModificar.cantidad =
              inventarioModificar.cantidad - this.cantidadIngresada)
          }
          this.actualizarLocalStorage(inventarioModificar)
          console.log('inventarioModificarPostVenta', inventarioModificar)
          Object.assign(inventarioModificar, objetoInventarioModificar)
          alert('Compra realizada con exito!')
          this.cantidadIngresada = ''
        } else if (this.bodegaSeleccionada === '2') {
          console.log('b2:', this.bodegaSeleccionada)
          const inventarioModificar = this.inventario.find(
            bodega => bodega.bodega == this.bodegaSeleccionada
          )
          this.convertirCantidad()
          inventarioModificar.cantidad =
            inventarioModificar.cantidad - this.cantidadIngresada
          this.actualizarLocalStorage(inventarioModificar)
          console.log(
            'inventarioModificarPostVenta',
            inventarioModificar.cantidad
          )
          alert('Compra realizada con exito!')
          this.cantidadIngresada = ''
        }
      }
    }
  },
  created: function () {
    this.alCargarPagina()
  }
})

app.mount('#app')
