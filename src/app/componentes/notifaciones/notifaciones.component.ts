import { Component, OnInit } from '@angular/core';
import { Notification } from '../../clases/notificaciones';
import { HttpClient } from '@angular/common/http';
import { NodosService } from '../../servicios/nodos.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-notifaciones',
  templateUrl: './notifaciones.component.html',
  styleUrls: ['./notifaciones.component.css']
})
export class NotifacionesComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.getNotificaciones({});
  }

  private nodosService = new NodosService(this.http);

  // Notificaciones
  public notifications = [];
  public notigicationKeys = ['Tipo', 'Nodo', 'Mensaje', 'Estado'];
  public currentNotification = new Notification();

  ngOnInit(): void {
  }

  /**
   * Obtiene las notificaciones.
   * @query Query json para filtrar las notificaciones.
   */
  getNotificaciones(query): void {
    this.notifications = [];
    this.nodosService.getNotificaciones(query).subscribe(
      (data) => {
        const result = data['result'];
        for (let i in result) {
          let n = new Notification();
          n.fromArray(result[i]);
          this.notifications.push(n);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /** Muestra la información de la notificación y las opciones para marcarla.
   * @notification Notificación de la que se mostrará la información.
   */
  showNotificationDetails(notification: Notification): void {
    this.currentNotification = notification;
    $('#modalNotificationBtn').click();
  }

  /**
   * Marca notificaciones con los diferentes estados.
   * @param notification Notificación a marcar
   */
  checkNotification(notification: Notification): void {
    const query = { '_id': notification.id };
    const values = { 'estado': notification.state};
    this.nodosService.checkNotificaction(query, values).subscribe(
      (data) => {
        console.info(data['message']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
