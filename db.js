import { createPool } from "mysql2/promise"

export const pool =  createPool({
    host:'radionortechico.com',
    port:3306,
    user:'wlqgsapm_reimer',
    password:'kovenant16',
    database:'wlqgsapm_prueba'
})
