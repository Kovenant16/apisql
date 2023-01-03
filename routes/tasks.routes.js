import { Router } from "express";
import {
  getProductos,
  getLocales,
  getCategoriesPorTienda,
  createTipoLocal,
  getHorariosPorTienda,
  getTipoUsuario,
  getUsuarioPorTipo,
  getLocalesAbiertosAhora,
  getDescuentos,
  getDescuentosVigentes,
  getUbicacionPorUsuario,
  getPedidosPorEstado,
  getPedidosPorMotorizado,
  getPedidosPorCliente,
  getPedidosPorGenerado,
  getPedidosPorFecha,
  getDetallePedido,
  getLocal,
  getCountTipoProducto,
  getCountUsuarioPorTipo,
  getCountPedidosPorTienda,
  getCountPedidosPorMotorizado,
  getCountTiendas,
  createTienda,
  createHorario,
  getVariantesPorProducto,
  createTipoProducto,
  createProducto,
  createTipoUsuario,
  createUsuario,
  createDescuento,
  createUbicacion,
  createPedido,
  createDetallePedido,
  getPedidosPendientes,
  getConsolidadoMotorizados,
  getConsolidadoLocales,
  getConsolidadoTransferencias,
  getClientes,
  getProductosPorTienda,
  createVariante_Producto,
  createTipoTransferencia,
  createTransferencia,
  updateTipoLocal,
  updateTienda,
  updateHorario,
  updateProducto,
  updateTipoProducto,
  updateTipoUsuario,
  updateUsuario,
  updateUbicacion,
  updateDescuento,
  updatePedido,
  updateDetallePedido,
  updateVarianteProducto,
  updateTipoTransferencia,
  updateTransferencia,
  deleteProducto,
  deleteDetallePedido,
  getPedidosPorMotorizadoPorEstado,
  getUsuarioPorTelefono
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/pedidosPendientes", getPedidosPendientes);

router.get("/productos", getProductos);

router.get("/locales", getLocales);

router.get("/local/:nombreTienda", getLocal);

router.get('/productos/:nombreTienda', getProductosPorTienda);

router.get("/categorias/:nombreTienda", getCategoriesPorTienda);

router.get("/variantes/:idProducto", getVariantesPorProducto);

router.get("/horarios/:nombreTienda", getHorariosPorTienda);

router.get("/tiposUsuario", getTipoUsuario);

router.get("/usuarioPorTipo/:nombreTipoUsuario", getUsuarioPorTipo);

router.get("/clientes", getClientes);

router.get("/usuarioPorTelefono/:telefono", getUsuarioPorTelefono);

router.get("/tiendasAbiertas", getLocalesAbiertosAhora);

router.get("/descuentos", getDescuentos);

router.get("/descuentosVigentes", getDescuentosVigentes);

router.get("/ubicacionUsuario/:telefonoUbicacion", getUbicacionPorUsuario);

router.get("/pedidosPorEstado/:estado", getPedidosPorEstado);

router.get("/pedidosPorMotorizado/:motorizado", getPedidosPorMotorizado);

router.get("/pedidosPorMotorizadoPorEstado/:motorizado/:estado", getPedidosPorMotorizadoPorEstado);

router.get("/pedidosPorCliente/:cliente", getPedidosPorCliente);

router.get("/pedidosPorUsuario/:usuario", getPedidosPorGenerado);

router.get("/pedidosPorFecha/:fechaIni/:fechaFin", getPedidosPorFecha);

router.get("/detallePedido/:id", getDetallePedido);

router.get("/cantidadTiendas", getCountTiendas);

router.get("/cantidadTipoProducto", getCountTipoProducto);

router.get("/countUsuarioPorTipo/:nombreTipoUsuario", getCountUsuarioPorTipo);

router.get("/countPedidosPorTienda/:nombreTienda/:fechaIni/:fechaFin", getCountPedidosPorTienda);

router.get("/countPedidosPorMotorizado/:nombreMotorizado/:fechaIni/:fechaFin", getCountPedidosPorMotorizado);

router.get("/consolidadoMotorizados/:fechaIni/:fechaFin", getConsolidadoMotorizados);

router.get("/consolidadoTransferencias/:fechaIni/:fechaFin", getConsolidadoTransferencias);

router.get("/consolidadoLocales/:fechaIni/:fechaFin", getConsolidadoLocales);


router.post("/crearTipoLocal", createTipoLocal);

router.post("/crearLocal", createTienda);

router.post("/crearHorario", createHorario);

router.post("/crearTipoProducto", createTipoProducto);

router.post("/crearProducto", createProducto);

router.post("/crearTipoUsuario", createTipoUsuario);

router.post("/crearUsuario", createUsuario);

router.post("/crearDescuento", createDescuento);

router.post("/crearUbicacion", createUbicacion);

router.post("/crearPedido", createPedido);

router.post("/crearDetallePedido", createDetallePedido);

router.post("/crearVarianteProducto", createVariante_Producto);

router.post("/crearTipoTransferencia", createTipoTransferencia);

router.post("/crearTransferencia", createTransferencia);


router.put("/actualizarTipoLocal/:id", updateTipoLocal);

router.put("/actualizarTienda/:id", updateTienda);

router.put("/actualizarHorario/:id", updateHorario);

router.put("/actualizarTipoProducto/:id", updateTipoProducto);

router.put("/actualizarProducto/:id", updateProducto);

router.put("/actualizarTipoUsuario/:id", updateTipoUsuario);

router.put("/actualizarUsuario/:id", updateUsuario);

router.put("/actualizarUbicacion/:id", updateUbicacion);

router.put("/actualizarDescuento/:id", updateDescuento);

router.put("/actualizarPedido/:id", updatePedido);

router.put("/actualizarDetallePedido/:id", updateDetallePedido);

router.put("/actualizarVarianteProducto/:id", updateVarianteProducto);

router.put("/actualizarTipoTransferencia/:id", updateTipoTransferencia);

router.put("/actualizarTransferencia/:id", updateTransferencia);


router.delete("/borrarProducto/:id", deleteProducto);

router.delete("/borrarDetallePedido/:id", deleteDetallePedido);

export default router;