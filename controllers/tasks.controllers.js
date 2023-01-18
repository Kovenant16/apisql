import { pool } from "../db.js";

export const getPedidosPendientes = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT idPedido, (select nombreUsuario from usuario where idUsuario=idMotorizado) motorizado, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fecha, horaPedido, montoPedido,  comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, estadoPedido, nombreTienda, coordenadasTienda, direccionUbicacion, coordenadasUbicacion, telefonoUbicacion, referenciaUbicacion FROM pedido p, usuario us, ubicacion ub, tienda t WHERE us.idUsuario=p.idMotorizado AND ub.idUbicacion=p.idUbicacion AND t.idTienda=p.idTienda AND estadoPedido != 'Entregado' ORDER BY fechaPedido, horaPedido LIMIT 20;"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuariosConUbicacion = async (req, res) => {
    try {
        const [result] = await pool.query(
            "select * from usuario u inner join ubicacion w on (u.idUsuario = w.idUsuario) order by u.nombreUsuario"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuarioAuth = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM usuario", [
            req.params.nombreUsuario,
            req.params.contraseñaUsuario
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario o Contraseña no existen" });

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
            "select *, DATE_FORMAT(fechaActualizacionTienda, '%Y-%m-%d') fechaActualizacion FROM tienda ORDER BY nombreTienda"
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
        const [result] = await pool.query("SELECT * FROM producto P LEFT JOIN tienda T ON P.idTienda = T.idTienda WHERE T.nombreTienda = ? ORDER BY nombreProducto", [
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
        const [result] = await pool.query("SELECT p.idTipoProducto, tp.nombreTipoProducto FROM producto p, tipoproducto tp, tienda t WHERE t.nombreTienda = ? AND  tp.idTipoProducto = p.idTipoProducto AND p.idTienda = t.idTienda GROUP BY idTipoProducto ORDER BY nombreTipoProducto", [
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
        const [result] = await pool.query("SELECT * FROM tipousuario ORDER BY nombreTipoUsuario;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tipos de usuario" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorTipo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, u.idUsuario, u.nombreUsuario, contraseñaUsuario FROM usuario u, tipousuario tu WHERE u.idTipoUsuario = tu.idTipoUsuario AND nombreTipoUsuario = ? ORDER BY nombreUsuario ASC;", [
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
            "SELECT * FROM usuario us, ubicacion ub WHERE idTipoUsuario = 5 AND us.idUsuario=ub.idUsuario ORDER BY nombreUsuario;"
        );
        
        if (result.length === 0)
            return res.status(404).json({ message: "Aún no se registran clientes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorTelefono = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM usuario WHERE telefonoUsuario LIKE CONCAT(?, '%') ORDER BY nombreUsuario;", [
                req.params.telefono,
            ]);
        
        if (result.length === 0)
            return res.status(404).json({ message: "No existe usuario con este teléfono" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocalesAbiertosAhora = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT nombreTienda, horaAperturaHorario, horaCierreHorario FROM horario h, tienda t WHERE TIME(now()) < horaCierreHorario AND TIME(now()) > horaAperturaHorario AND (dayofweek(NOW())+5) mod 7 = diaSemanaHorario AND h.idTienda = t.idTienda ORDER BY nombreTienda;");

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
        const [result] = await pool.query("SELECT idUbicacion, ub.idUsuario, telefonoUbicacion, direccionUbicacion, coordenadasUbicacion, referenciaUbicacion, asuntoUbicacion FROM ubicacion ub, usuario us WHERE ub.idUsuario = us.idUsuario AND ub.telefonoUbicacion LIKE CONCAT(?,'%');", [
            req.params.telefonoUbicacion,
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
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, tienda t WHERE estadoPedido = ? AND t.idTienda=p.idTienda ORDER BY fechaPedido, horaPedido LIMIT 50;", [
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
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u, tienda t WHERE idUsuario = idMotorizado AND t.idTienda=p.idTienda AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.motorizado,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Motorizado sin Pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorMotorizadoPorEstado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u, tienda t WHERE idUsuario = idMotorizado AND t.idTienda=p.idTienda AND nombreUsuario = ? AND estadoPedido = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.motorizado,
            req.params.estado
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Motorizado sin Pedidos con este estado" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorCliente = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u, tienda t WHERE idUsuario = idCliente AND t.idTienda=p.idTienda AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
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
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, usuario u, tienda t WHERE t.idTienda=p.idTienda AND generadoPor = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
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
        const [result] = await pool.query("SELECT *, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fechaPedido FROM pedido p, tienda t WHERE ? <= fechaPedido AND fechaPedido <= ? AND t.idTienda=p.idTienda ORDER BY fechaPedido, horaPedido", [
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
        const [result] = await pool.query("SELECT d.idPedido, CONCAT(p.nombreProducto, ' ',v.nombreVariante) descripcion, v.precioVariante, d.cantidadDetalle cantidad, v.precioVariante * d.cantidadDetalle subtotal FROM detallepedido d, producto p, variante_producto v WHERE d.idVariante_producto = v.idVariante_producto AND p.idProducto=v.idProducto AND d.idPedido = ?;", [
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

export const getUsuarioPorNombre = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM usuario WHERE nombreUsuario = ?;", [
            req.params.nombre,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario no existe" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message + ' - Corregir' });
    }
};

export const getPedidoPorId = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT *, idPedido, (select nombreUsuario from usuario where idUsuario=idMotorizado) motorizado, (select nombreUsuario from usuario where idUsuario=idCliente) cliente, DATE_FORMAT(fechaPedido, '%Y-%m-%d') fecha, horaPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, estadoPedido, nombreTienda, asuntoUbicacion, direccionUbicacion, coordenadasUbicacion, telefonoUbicacion, referenciaUbicacion FROM pedido p, usuario us, ubicacion ub, tienda t WHERE us.idUsuario=p.idMotorizado AND ub.idUbicacion=p.idUbicacion AND t.idTienda=p.idTienda AND idPedido = ?;", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Pedido no existe" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message + ' - Corregir' });
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
            return res.status(404).json({ message: "No hay pedidos de este motorizado" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getConsolidadoMotorizados = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT idMotorizado, nombreUsuario, SUM(montoDeliveryPedido) delivery, SUM(comisionVentaPedido) 'comVenta', COUNT(p.idPedido) pedidos FROM pedido p, usuario u WHERE u.idUsuario=p.idMotorizado AND ? < fechaPedido AND fechaPedido < ? GROUP BY idMotorizado ORDER BY delivery DESC;", [
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos registrados" });

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
            return res.status(404).json({ message: "No hay transferencias" });

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
            return res.status(404).json({ message: "No hay pedidos de esta tienda" });

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
        const { idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, coordenadasTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tienda (idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, coordenadasTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [idTipoLocal, nombreTienda, direccionTienda, telefonoTienda, urlBannerTienda, urlPerfilTienda, coordenadasTienda, estadoTienda, tiempoPreparacionTienda, fechaActualizacionTienda]
        );
        res.json({
            id: result.insertId,
            idTipoLocal,
            nombreTienda,
            direccionTienda,
            telefonoTienda,
            urlBannerTienda,
            urlPerfilTienda,
            coordenadasTienda,
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
        const { idTipoUsuario, nombreUsuario, contraseñaUsuario, telefonoUsuario } = req.body;
        const [result] = await pool.query(
            "INSERT INTO usuario (idTipoUsuario, nombreUsuario, contraseñaUsuario, telefonoUsuario) VALUES (?, ?, ?, ?);",
            [idTipoUsuario, nombreUsuario, contraseñaUsuario, telefonoUsuario]
        );
        res.json({
            id: result.insertId,
            idTipoUsuario,
            nombreUsuario,
            contraseñaUsuario,
            telefonoUsuario
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
        const { idUsuario, telefonoUbicacion, direccionUbicacion, coordenadasUbicacion, referenciaUbicacion, asuntoUbicacion } = req.body;
        const [result] = await pool.query(
            "INSERT INTO ubicacion (idUsuario, telefonoUbicacion, direccionUbicacion, coordenadasUbicacion, referenciaUbicacion, asuntoUbicacion) VALUES (?, ?, ?, ?, ?, ?);",
            [idUsuario, telefonoUbicacion, direccionUbicacion, coordenadasUbicacion, referenciaUbicacion, asuntoUbicacion]
        );
        res.json({
            id: result.insertId,
            idUsuario,
            telefonoUbicacion,
            direccionUbicacion,
            coordenadasUbicacion,
            referenciaUbicacion,
            asuntoUbicacion
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPedido = async (req, res) => {
    try {
        const { idDescuento, idCliente, idMotorizado, generadoPor, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido, detalleAdicionalPedido } = req.body;
        const [result] = await pool.query(
            "INSERT INTO pedido (idDescuento, idCliente, idMotorizado, generadoPor, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido, detalleAdicionalPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [idDescuento, idCliente, idMotorizado, generadoPor, idUbicacion, idTienda, fechaPedido, horaPedido, horaGeneradoPedido, montoPedido, comisionVentaPedido, montoDeliveryPedido, horaLlegadaLocalPedido, horaRecojoPedido, horaEntregaPedido, estadoPedido, detalleAdicionalPedido]
        );
        res.json({
            id: result.insertId,
            idDescuento, 
            idCliente, 
            idMotorizado, 
            generadoPor, 
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
            estadoPedido,
            detalleAdicionalPedido
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

export const createVariante_Producto = async (req, res) => {
    try {
        const { idProducto, nombreVariante, caracteristicaVariante, precioVariante } = req.body;
        const [result] = await pool.query(
            "INSERT INTO variante_producto (idProducto, nombreVariante, caracteristicaVariante, precioVariante) VALUES (?, ?, ?, ?);",
            [idProducto, nombreVariante, caracteristicaVariante, precioVariante]
        );
        res.json({
            id: result.insertId,
            idProducto,
            nombreVariante,
            caracteristicaVariante,
            precioVariante
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTipoTransferencia = async (req, res) => {
    try {
        const { nombreTipoTransferencia } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipotransferencia (nombreTipoTransferencia) VALUES (?);",
            [nombreTipoTransferencia]
        );
        res.json({
            id: result.insertId,
            nombreTipoTransferencia
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTransferencia = async (req, res) => {
    try {
        const { idTipoTransferencia, idPedido, montoTransferencia, descripcionTransferencia } = req.body;
        const [result] = await pool.query(
            "INSERT INTO variante_producto (idTipoTransferencia, idPedido, montoTransferencia, descripcionTransferencia) VALUES (?, ?, ?, ?);",
            [idTipoTransferencia, idPedido, montoTransferencia, descripcionTransferencia]
        );
        res.json({
            id: result.insertId,
            idTipoTransferencia,
            idPedido,
            montoTransferencia,
            descripcionTransferencia
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//EDITAR

export const updateTipoLocal = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tipolocal SET ? WHERE idTipoLocal = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTienda = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tienda SET ? WHERE idTienda = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateHorario = async (req, res) => {
    try {
        const result = await pool.query("UPDATE horario SET ? WHERE idHorario = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTipoProducto = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tipoproducto SET ? WHERE idTipoProducto = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const result = await pool.query("UPDATE producto SET ? WHERE idProducto = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTipoUsuario = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tipousuario SET ? WHERE idTipoUsuario = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const result = await pool.query("UPDATE usuario SET ? WHERE idUsuario = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUbicacion = async (req, res) => {
    try {
        const result = await pool.query("UPDATE ubicacion SET ? WHERE idUbicacion = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDescuento = async (req, res) => {
    try {
        const result = await pool.query("UPDATE descuento SET ? WHERE idDescuento = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePedido = async (req, res) => {
    try {
        const result = await pool.query("UPDATE pedido SET ? WHERE idPedido = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDetallePedido = async (req, res) => {
    try {
        const result = await pool.query("UPDATE detallepedido SET ? WHERE idDetallePedido = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateVarianteProducto = async (req, res) => {
    try {
        const result = await pool.query("UPDATE variante_producto SET ? WHERE idVariante_producto = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTipoTransferencia = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tipotransferencia SET ? WHERE idTipoTransferencia = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTransferencia = async (req, res) => {
    try {
        const result = await pool.query("UPDATE transferencia SET ? WHERE idTransferencia = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//ELIMINAR

export const deleteTipoLocal = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tipolocal WHERE idTipoLocal = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Tipo de local no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTienda = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tienda WHERE idTienda = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Tienda no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteHorario = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM horario WHERE idHorario = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Horario no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTipoProducto = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tipoproducto WHERE idTipoProducto = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Tipo de producto no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM producto WHERE idProducto = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Producto no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTipoUsuario = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tipousuario WHERE idTipoUsuario = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Tipo de usuario no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM usuario WHERE idUsuario = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Usuario no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUbicacion = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM ubicacion WHERE idUbicacion = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Ubicación no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteDescuento = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM descuento WHERE idDescuento = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Descuento no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePedido = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM pedido WHERE idPedido = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Pedido no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteDetallePedido = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM detallepedido WHERE idDetallePedido = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Detalle de pedido no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteVarianteProducto = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM variante_producto WHERE idVariante_producto = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Variante de producto no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTipoTransferencia = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tipotransferencia WHERE idTipoTransferencia = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Tipo de transferencia no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTransferencia = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM transferencia WHERE idTransferencia = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Transferencia no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};