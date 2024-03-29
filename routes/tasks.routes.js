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
  getUsuarioPorTelefono,
  getUsuarioPorNombre,
  getPedidoPorId,
  deleteTipoLocal,
  deleteTienda,
  deleteHorario,
  deleteTipoProducto,
  deleteTipoUsuario,
  deleteUsuario,
  deleteUbicacion,
  deleteDescuento,
  deletePedido,
  deleteVarianteProducto,
  deleteTipoTransferencia,
  deleteTransferencia,
  getUsuariosConUbicacion,
  getUsuarioAuth,
  getUsuarioPorId
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/pedidosPendientes", getPedidosPendientes);

router.get("/usuariosConUbicacion", getUsuariosConUbicacion);

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

router.get("/usuarioPorNombre/:nombre", getUsuarioPorNombre);

router.get("/usuarioPorID/:id", getUsuarioPorId);

router.get("/pedidoPorId/:id", getPedidoPorId);

router.get("/cantidadTiendas", getCountTiendas);

router.get("/cantidadTipoProducto", getCountTipoProducto);

router.get("/countUsuarioPorTipo/:nombreTipoUsuario", getCountUsuarioPorTipo);

router.get("/countPedidosPorTienda/:nombreTienda/:fechaIni/:fechaFin", getCountPedidosPorTienda);

router.get("/countPedidosPorMotorizado/:nombreMotorizado/:fechaIni/:fechaFin", getCountPedidosPorMotorizado);

router.get("/consolidadoMotorizados/:fechaIni/:fechaFin", getConsolidadoMotorizados);

router.get("/consolidadoTransferencias/:fechaIni/:fechaFin", getConsolidadoTransferencias);

router.get("/consolidadoLocales/:fechaIni/:fechaFin", getConsolidadoLocales);

router.get("/usuarioAuth/:nombreUsuario/:contraseñaUsuario", getUsuarioAuth);


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




router.delete("/borrarTipoLocal/:id", deleteTipoLocal);

router.delete("/borrarTienda/:id", deleteTienda);

router.delete("/borrarHorario/:id", deleteHorario);

router.delete("/borrarTipoProducto/:id", deleteTipoProducto);

router.delete("/borrarProducto/:id", deleteProducto);

router.delete("/borrarTipoUsuario/:id", deleteTipoUsuario);

router.delete("/borrarUsuario/:id", deleteUsuario);

router.delete("/borrarUbicacion/:id", deleteUbicacion);

router.delete("/borrarDescuento/:id", deleteDescuento);

router.delete("/borrarPedido/:id", deletePedido);

router.delete("/borrarDetallePedido/:id", deleteDetallePedido);

router.delete("/borrarVarianteProducto/:id", deleteVarianteProducto);

router.delete("/borrarTipoTransferencia/:id", deleteTipoTransferencia);

router.delete("/borrarTransferencia/:id", deleteTransferencia);

export default router;