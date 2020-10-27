/**
 * Clase para manejar los datos de las notificaciones.
 *
 * @export
 */
export class Notification {
  public states = ['Sin asignar', 'Atendida', 'Pendiente'];
  public newState = this.states[0];

  public id: string;
  public type: string;
  public node: string;
  public message: string;
  public index: string;
  public state: number;

  public date: string;
  public metric: string;

  public Notification(type: string, node: string, message: string, state: number) {
    this.type = type;
    this.node = node;
    this.message = message;
    this.state = state;
  }

  public fromArray(arr: []): void {
    this.id = arr['_id'];
    this.type = arr['tipo'];
    this.node = arr['nodo'];
    this.message = arr['mensaje'];
    //this.index = arr['indice'];
    this.state = arr['estado'];
    this.date = arr['timestamp'];
    this.metric = arr['metrica'];
    this.newState = this.states[this.state];
  }

  public changeState(): void {
    this.state = this.states.indexOf(this.newState);
  }

}
