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
      ventas: [null,null],
      habilitarBotones: false
    }
  },

  methods: {
    alCargarPagina () {
      if (localStorage.getItem('inventario') === null || localStorage.getItem('ventas')===null ) {
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
      this.isBienvenida = false;
      this.isCompra = true;
    },
    actualizarLocalStorage (actualizacion) {
      let inventarioActualizar = JSON.parse(localStorage.getItem('inventario'))
      inventarioActualizar = inventarioActualizar.map(item => {
        if (actualizacion.bodega === 1) {
          if (item.bodega === 1) {
            item.cantidad = actualizacion.cantidad
            if (actualizacion.cantidad === 0) {
              alert('Bodega en cero')
            }
            if (actualizacion.cantidad === 50000) {
              alert('El inventario va por la mitad de la bodega 1')
            }
            if (actualizacion.cantidad <= 10000 && actualizacion.cantidad > 0) {
              alert('El inventario de la bodega 1 está próximo a agotarse')
            }
          }
          return item
        } else if (actualizacion.bodega === 2) {
          if (item.bodega === 2) {
            item.cantidad = actualizacion.cantidad
            if (actualizacion.cantidad === 0) {
              alert('Bodega 2 tiene el inventario en cero')
            }
            if (actualizacion.cantidad === 115000) {
              alert('El inventario va por la mitad de la bodega 2')
            }
            if (actualizacion.cantidad <= 23000 && actualizacion.cantidad > 0) {
              alert('El inventario de la bodega 2 está próximo a agotarse')
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
      } else if (this.unidadSeleccionada == 'g') {
        this.cantidadIngresada = this.cantidadIngresada / 1000
      }
    },
    realizarCompra () {
      if (this.cantidadIngresada === '' || this.cantidadIngresada <= 0) {
        alert('Datos invalidos. No puede ser un menor menor o igual a 0')
        this.cantidadIngresada = ''
      } else {
        if (this.bodegaSeleccionada === '1') {
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
            Object.assign(inventarioModificar, objetoInventarioModificar)
            alert('Compra realizada con exito!')
            const valorVendido = this.cantidadIngresada * this.costoKilo
            this.ventas[0] = this.ventas[0] + valorVendido
            localStorage.setItem('ventas', JSON.stringify(this.ventas))
            this.cantidadIngresada = ''
            this.habilitarBotones = true
          }
        } else if (this.bodegaSeleccionada === '2') {
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
            alert('Compra realizada con exito!')
            const valorVendido = this.cantidadIngresada * this.costoKilo
            this.ventas[1] = this.ventas[1] + valorVendido
            localStorage.setItem('ventas', JSON.stringify(this.ventas))
            this.cantidadIngresada = ''
            this.habilitarBotones = true
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
