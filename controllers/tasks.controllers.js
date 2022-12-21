import { pool } from "../db.js";

export const getPedidosPendientes = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT idPedido, (select nombreUsuario from usuario where idUsuario=idMotorizado) motorizado, (select nombreUsuario from usuario where idUsuario=idGenerado) 'generado por', DATE_FORMAT(fechaPedido, '%Y-%m-%d') fecha, horaPedido, montoPedido,  comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, estadoPedido, nombreTienda, latTienda, longTienda, direccionUbicacion, latUbicacion, longUbicacion, telefonoUbicacion, referenciaUbicacion FROM pedido p, usuario us, ubicacion ub, tienda t WHERE us.idUsuario=p.idMotorizado AND ub.idUbicacion=p.idUbicacion AND t.idTienda=p.idTienda AND estadoPedido != 'Entregado' ORDER BY fechaPedido, horaPedido LIMIT 20;"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductos = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM producto"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocales = async (req, res) => {
    try {
        const [result] = await pool.query(
            "select *, DATE_FORMAT(fechaActualizacionTienda, '%Y-%m-%d') fechaActualizacion from  tienda"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocal = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT *, DATE_FORMAT(fechaActualizacionTienda, '%Y-%m-%d') fechaActualizacion FROM tienda WHERE nombreTienda=?;", [
            req.params.nombreTienda
        ]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM producto P LEFT JOIN tienda T ON P.idTienda = T.idTienda WHERE T.nombreTienda = ?", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Tienda sin productos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCategoriesPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT p.idTipoProducto, tp.nombreTipoProducto FROM producto p, tipoproducto tp, tienda t WHERE t.nombreTienda = ? AND  tp.idTipoProducto = p.idTipoProducto AND p.idTienda = t.idTienda GROUP BY idTipoProducto", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Tipos de producto no existentes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getVariantesPorProducto = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM variante_producto WHERE idProducto = ?;", [
            req.params.idProducto,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Producto sin Variantes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getHorariosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT  diaSemanaHorario, horaAperturaHorario, horaCierreHorario FROM horario h LEFT JOIN tienda t ON h.idTienda = t.idTienda WHERE nombreTienda=? ORDER BY diaSemanaHorario;", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Horario inexistente" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTipoUsuario = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM tipoUsuario;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tipos de usuario" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorTipo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT u.idUsuario, u.nombreUsuario FROM usuario u, tipousuario tu WHERE u.idTipoUsuario = tu.idTipoUsuario AND nombreTipoUsuario = ?;", [
            req.params.nombreTipoUsuario,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuarios inexistentes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getClientes = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM usuario us, ubicacion ub WHERE idTipoUsuario = 5 AND us.idUsuario=ub.idUsuario;"
        );
        
        if (result.length === 0)
            return res.status(404).json({ message: "Aún no se registran clientes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocalesAbiertosAhora = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT nombreTienda, horaAperturaHorario, horaCierreHorario FROM horario h, tienda t WHERE TIME(now()) < horaCierreHorario AND TIME(now()) > horaAperturaHorario AND (dayofweek(NOW())+5) mod 7 = diaSemanaHorario AND h.idTienda = t.idTienda;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ninguna tienda abierta" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDescuentos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaCreacionDescuento, '%Y-%m-%d') fechaCreacion, DATE_FORMAT(fechaInicioDescuento, '%Y-%m-%d') fechaInicio, DATE_FORMAT(fechaFinDescuento, '%Y-%m-%d') fechaFin, montoDescuento FROM descuento;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ningún descuento creado" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDescuentosVigentes = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT codigoDescuento, DATE_FORMAT(fechaCreacionDescuento, '%Y-%m-%d') fechaCreacion, DATE_FORMAT(fechaInicioDescuento, '%Y-%m-%d') fechaInicio, DATE_FORMAT(fechaFinDescuento, '%Y-%m-%d') fechaFin, montoDescuento, descripcionDescuento FROM descuento WHERE DATE(NOW()) > fechaInicioDescuento AND DATE(NOW()) < fechaFinDescuento;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ningún descuento vigente" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUbicacionPorUsuario = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT idUbicacion, ub.idUsuario, telefonoUbicacion, direccionUbicacion, latUbicacion, longUbicacion, referenciaUbicacion, asuntoUbicacion FROM ubicacion ub, usuario us WHERE ub.idUsuario = us.idUsuario AND ub.telefonoUbicacion like '?%'", [
            req.params.nombreUsuario,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario sin ubicación" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorEstado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido WHERE estadoPedido = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.estado,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos con este estado" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorMotorizado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u WHERE idUsuario = idMotorizado AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.motorizado,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Motorizado sin Pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorCliente = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u WHERE idUsuario = idCliente AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.cliente,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Cliente sin Pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Quién generó el pedido
export const getPedidosPorGenerado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u WHERE idUsuario = idGenerado AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.usuario,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario aún no genera pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorFecha = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido WHERE ? <= fechaPedido AND fechaPedido <= ?", [
            req.params.fechaIni,
            req.params.fechaFin,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos entre estas fechas" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDetallePedido = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT d.idPedido, CONCAT(p.nombreProducto, ' ',V.nombreVariante) descripcion, v.precioVariante, d.cantidadDetalle cantidad, v.precioVariante * d.cantidadDetalle subtotal FROM detallepedido d, producto p, variante_producto v WHERE d.idVariante_producto = v.idVariante_producto AND p.idProducto=v.idProducto AND d.idPedido = ?;", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Pedido sin productos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message + 'asdasd' });
    }
};


// CONTADORES:

export const getCountTiendas = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM tienda;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tiendas" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountTipoProducto = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM tipoProducto;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tipos de producto" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountUsuarioPorTipo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM usuario u, tipousuario t WHERE u.idTipoUsuario = t.idTipoUsuario AND t.nombreTipoUsuario=?;", [
            req.params.nombreTipoUsuario
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay usuarios de este tipo" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountPedidosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM pedido p, tienda t WHERE t.idTienda=p.idTienda AND t.nombreTienda='Pizza Bruno' AND '20221024' <= fechaPedido AND fechaPedido <= '20221225';", [
            req.params.nombreTienda,
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de esta tienda" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountPedidosPorMotorizado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM pedido p, usuario u WHERE u.idUsuario=p.idMotorizado AND u.nombreUsuario=? AND ? <= fechaPedido AND fechaPedido <= ?;", [
            req.params.nombreMotorizado,
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de esta tienda" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getConsolidadoMotorizados = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT idMotorizado, nombreUsuario, SUM(montoDeliveryPedido) delivery, SUM(comisionVentaPedido) 'comisión venta', COUNT(p.idPedido) pedidos FROM pedido p, usuario u WHERE u.idUsuario=p.idMotorizado AND ? < fechaPedido AND fechaPedido < ? GROUP BY idMotorizado ORDER BY delivery DESC;", [
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de este mes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getConsolidadoTransferencias = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT idMotorizado, nombreUsuario, COUNT(DISTINCT(p.idPedido)) pedidos, COUNT(DISTINCT(t.idTransferencia)) transferencias, SUM(montoTransferencia) total FROM pedido p, usuario u, transferencia t WHERE u.idUsuario=p.idMotorizado AND p.idPedido=t.idPedido AND ? < fechaPedido AND fechaPedido < ? GROUP BY idMotorizado;", [
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de este mes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getConsolidadoLocales = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT nombreTienda, SUM(montoDeliveryPedido) delivery, SUM(comisionVentaPedido) 'comisión venta', COUNT(montoDeliveryPedido) pedidos FROM pedido p, tienda t WHERE t.idTienda=p.idTienda AND ? < fechaPedido AND fechaPedido < ? GROUP BY p.idTienda ORDER BY delivery DESC;", [
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de este mes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// POSTS:

export const createTipoLocal = async (req, res) => {
    try {
        const { nombre, description } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipoLocal (nombreTipoLocal, descripcionTipoLocal) VALUES (?, ?)",
            [nombre, description]
        );
        res.json({
            id: result.insertId,
            nombre,
            description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTienda = async (req, res) => {
    try {
        const { idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, latTienda, longTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tienda (idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, latTienda, longTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, latTienda, longTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda]
        );
        res.json({
            id: result.insertId,
            idTipoLocal,
            nombreTienda,
            direccionTienda,
            telefonoTienda,
            urlBannerTienda,
            urlPerfilTienda,
            latTienda,
            longTienda,
            estadoTienda,
            tiempoPreparacionTienda,
            fechaActualizacionTienda
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createHorario = async (req, res) => {
    try {
        const { idTienda, diaSemanaHorario, horaAperturaHorario, horaCierreHorario } = req.body;
        const [result] = await pool.query(
            "INSERT INTO horario (idTienda, diaSemanaHorario, horaAperturaHorario, horaCierreHorario) VALUES (?, ?, ?, ?);",
            [idTienda, diaSemanaHorario, horaAperturaHorario, horaCierreHorario]
        );
        res.json({
            id: result.insertId,
            idTienda,
            diaSemanaHorario,
            horaAperturaHorario,
            horaCierreHorario
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTipoProducto = async (req, res) => {
    try {
        const { nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipoproducto (nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto) VALUES (?, ?, ?);",
            [nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto]
        );
        res.json({
            id: result.insertId,
            nombreTipoProducto,
            descripcionTipoProducto,
            urlImagenTipoProducto
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProducto = async (req, res) => {
    try {
        const { idTienda, idTipoProducto, nombreProducto, descripcionProducto, urlImagenProducto } = req.body;
        const [result] = await pool.query(
            "INSERT INTO producto (idTienda, idTipoProducto, nombreProducto, descripcionProducto, urlImagenProducto) VALUES (?, ?, ?, ?, ?);",
            [idTienda, idTipoProducto, nombreProducto, descripcionProducto, urlImagenProducto]
        );
        res.json({
            id: result.insertId,
            idTienda, 
            idTipoProducto, 
            nombreProducto, 
            descripcionProducto, 
            urlImagenProducto
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTipoUsuario = async (req, res) => {
    try {
        const { nombreTipoUsuario, descripcionTipoUsuario } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipousuario (nombreTipoUsuario, descripcionTipoUsuario) VALUES (?, ?);",
            [nombreTipoUsuario, descripcionTipoUsuario]
        );
        res.json({
            id: result.insertId,
            nombreTipoUsuario,
            descripcionTipoUsuario
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { idTipoUsuario, nombreUsuario, contraseñaUsuario } = req.body;
        const [result] = await pool.query(
            "INSERT INTO usuario (idTipoUsuario, nombreUsuario, contraseñaUsuario) VALUES (?, ?, ?);",
            [idTipoUsuario, nombreUsuario, contraseñaUsuario]
        );
        res.json({
            id: result.insertId,
            idTipoUsuario,
            nombreUsuario,
            contraseñaUsuario
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createDescuento = async (req, res) => {
    try {
        const { codigoDescuento, fechaCreacionDescuento, fechaInicioDescuento, fechaFinDescuento, montoDescuento, descripcionDescuento } = req.body;
        const [result] = await pool.query(
            "INSERT INTO descuento (codigoDescuento, fechaCreacionDescuento, fechaInicioDescuento, fechaFinDescuento, montoDescuento, descripcionDescuento) VALUES (?, ?, ?, ?, ?, ?);",
            [codigoDescuento, fechaCreacionDescuento, fechaInicioDescuento, fechaFinDescuento, montoDescuento, descripcionDescuento]
        );
        res.json({
            id: result.insertId,
            codigoDescuento,
            fechaCreacionDescuento,
            fechaInicioDescuento,
            fechaFinDescuento,
            montoDescuento,
            descripcionDescuento
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUbicacion = async (req, res) => {
    try {
        const { idUsuario, telefonoUbicacion, direccionUbicacion, latUbicacion, longUbicacion, referenciaUbicacion, asuntoUbicacion } = req.body;
        const [result] = await pool.query(
            "INSERT INTO ubicacion (idUsuario, telefonoUbicacion, direccionUbicacion, latUbicacion, longUbicacion, referenciaUbicacion, asuntoUbicacion) VALUES (?, ?, ?, ?, ?, ?, ?);",
            [idUsuario, telefonoUbicacion, direccionUbicacion, latUbicacion, longUbicacion, referenciaUbicacion, asuntoUbicacion]
        );
        res.json({
            id: result.insertId,
            idUsuario,
            telefonoUbicacion,
            direccionUbicacion,
            latUbicacion,
            longUbicacion,
            referenciaUbicacion,
            asuntoUbicacion
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPedido = async (req, res) => {
    try {
        const { idDescuento, idCliente, idMotorizado, idGenerado, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido } = req.body;
        const [result] = await pool.query(
            "INSERT INTO pedido (idDescuento, idCliente, idMotorizado, idGenerado, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [idDescuento, idCliente, idMotorizado, idGenerado, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido]
        );
        res.json({
            id: result.insertId,
            idDescuento, 
            idCliente, 
            idMotorizado, 
            idGenerado, 
            idUbicacion,
            idTienda,
            fechaPedido, 
            horaPedido, 
            horaGeneradoPedido, 
            montoPedido, 
            comisionVentaPedido,
            montoDeliveryPedido, 
            horaLlegadaLocalPedido, 
            horaRecojoPedido, 
            horaEntregaPedido, 
            estadoPedido
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createDetallePedido = async (req, res) => {
    try {
        const { idPedido, cantidadDetalle, idVariante_producto } = req.body;
        const [result] = await pool.query(
            "INSERT INTO detallepedido (idPedido, cantidadDetalle, idVariante_producto) VALUES (?, ?, ?);",
            [idPedido, cantidadDetalle, idVariante_producto]
        );
        res.json({
            id: result.insertId,
            idPedido,
            cantidadDetalle,
            idVariante_producto
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};









export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
