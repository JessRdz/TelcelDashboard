import { Http2ServerRequest } from "http2";


http = new Http2ServerRequest();

export class Clientes {
  nombre = 'Sonia "la enojona"';
  dinero = 1000;

  constructor () {}

  constructor (nombre) {
    this.nombre = nombre;
  }

  pagar (costo) {
    dinero -= costo;
  }

  tarjetas = {
    credito: 1000,
    debito: 2000,
    movimientos: [
      { tipo: 'abono', monto: 500},
      { tipo: 'retiro', monto: 200}
    ]
  };
}

cliente = new Clientes('Sonia');

cliente.pagar(500);
console.warn(cliente.dinero);

console.log(cliente.tarjetas['debito']);
console.log(cliente.tarjetas.movimientos[0]);

json = {
  nombre: cliente.nombre,
  tarjetas: cliente.tarjetas
}

json = http.get('url');

cliente.nombre = json['nombre'];
cliente.tarjetas = json['tarjetas'];

