import { Producto } from './product';
import { Plazo } from './plazo';

export interface Cotizacion {
    id_cotizacion?: number;
    producto?:      Producto;
    plazo?:         Plazo;
    abono_normal?:  number;
    abono_puntual?: number;
}
