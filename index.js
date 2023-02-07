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
      isCompra: false,
      costoKilo: 5200,
      ventas: [null, null],
      habilitarBotones: false
    }
  },

  methods: {
    alCargarPagina () {
      if (localStorage.getItem('inventario') === null) {
        localStorage.setItem('inventario', JSON.stringify(this.inventario))
        localStorage.setItem('ventas', JSON.stringify(this.ventas))
      } else {
        localStorage.setItem('inventario', localStorage.getItem('inventario'))
        this.inventario = JSON.parse(localStorage.getItem('inventario'))

        localStorage.setItem('ventas', localStorage.getItem('ventas'))
        this.ventas = JSON.parse(localStorage.getItem('ventas'))
      }

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
            console.log('cantidad acutalizada ' + actualizacion.cantidad)
            
            console.log('cantidad actualizada ', item.cantidad)
            if( actualizacion.cantidad === 0) {
              alert("Bodega en cero")
            }
            if ( actualizacion.cantidad === 50000 ){
              alert("El inventario va por la mitad de la bodega 1")
            }
            if ( actualizacion.cantidad <= 10000 && actualizacion.cantidad > 0) {
              alert('El inventario de la bodega 1 está próximo a agotarse');
            }  
          }

          return item
        } else if (actualizacion.bodega === 2) {
          if (item.bodega === 2) {
            item.cantidad = actualizacion.cantidad
            console.log('cantidad acutalizada ' + actualizacion.cantidad)
            
            if( actualizacion.cantidad === 0) {
              alert("Bodega 2 tiene el inventario en cero")
            }
            if ( actualizacion.cantidad === 115000 ){
              alert("El inventario va por la mitad de la bodega 2")
            }
            if ( actualizacion.cantidad <= 23000 && actualizacion.cantidad > 0) {
              alert('El inventario de la bodega 2 está próximo a agotarse');
            } 
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
          
        
          
          if (inventarioModificar.cantidad - this.cantidadIngresada < 0) {
            alert('No hay suficiente en bodega')
          } else {
            const objetoInventarioModificar = {
              bodega: inventarioModificar.bodega,
              cantidad: (inventarioModificar.cantidad =
                inventarioModificar.cantidad - this.cantidadIngresada)
            }
            this.actualizarLocalStorage(inventarioModificar)
            console.log('inventarioModificarPostVenta', inventarioModificar)
            Object.assign(inventarioModificar, objetoInventarioModificar)
            alert('Compra realizada con exito!')
            const valorVendido = this.cantidadIngresada * this.costoKilo

            this.ventas[0] = this.ventas[0] + valorVendido
            console.log('ventas1', this.ventas)
            localStorage.setItem('ventas', JSON.stringify(this.ventas))
           


            this.cantidadIngresada = ''
            this.habilitarBotones = true
          }
        } else if (this.bodegaSeleccionada === '2') {
          console.log('b2:', this.bodegaSeleccionada)
          const inventarioModificar = this.inventario.find(
            bodega => bodega.bodega == this.bodegaSeleccionada
          )
          this.convertirCantidad()
          if (inventarioModificar.cantidad - this.cantidadIngresada < 0) {
            alert('No hay suficiente en bodega')
          } else {
            inventarioModificar.cantidad =
              inventarioModificar.cantidad - this.cantidadIngresada
            this.actualizarLocalStorage(inventarioModificar)
            console.log(
              'inventarioModificarPostVenta',
              inventarioModificar.cantidad
            )
            alert('Compra realizada con exito!')
            const valorVendido = this.cantidadIngresada * this.costoKilo

            this.ventas[1] = this.ventas[1] + valorVendido
            localStorage.setItem('ventas', JSON.stringify(this.ventas))
            console.log('venta2s', this.ventas)
            this.cantidadIngresada = ''
          }
        }
      }
    },
    nuevaCompra () {
      this.habilitarBotones = false
    },
    regresarInicio () {
      this.habilitarBotones = false
      this.isCompra = false
      this.isBienvenida = true
    }
  },
  created: function () {
    this.alCargarPagina()
  }
})

app.mount('#app')
