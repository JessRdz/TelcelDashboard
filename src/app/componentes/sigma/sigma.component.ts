import { ElasticService } from './../../servicios/elastic.service';
import { Component, OnInit } from '@angular/core';
import { NodosService } from '../../servicios/nodos.service';
import sigma from 'sigma';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Notification } from '../../clases/notificaciones';


/**
 * Componente para controlar el grafo y la visualización de notificaciones.
 *
 * @export
 * @class SigmaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css']
})
export class SigmaComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.getNodos('tienda');
    // this.getNotificaciones();
    setInterval(SigmaComponent.getNot, 3000, this);
   }


  private sigma = new sigma();
  private nodosService = new NodosService(this.http);
  private elasticService = new ElasticService(this.http);

  // información del nodo seleccionado
  public nodo: string;
  public host: string;
  public currentNode = new Node();

  // lista de nodos
  public nodos: any;

  // notificaciones
  public globalNotifications: any;
  public currentNodeNotifications = [];
  public currentNotification = new Notification();
  public dataset: any;

  public actualize() {
    this.getNodos('tienda');
    this.getNotificaciones();
  }

  public static getNot(sc: SigmaComponent) {
    sc.getNotificaciones();
  }

  /**
   * Obtiene los nodos y los muestra en pantalla con sigma js.
   *
   * @param module Módulo del que se mostrarán los nodos
   */
  getNodos(module: string): void {
    this.sigma.graph.clear();
    this.nodosService.getNodos(module).subscribe(
      (data) => {
        this.nodos = data['result'];
        // console.info(this.nodos);

        this.sigma = new sigma(
          {
            renderer: {
              container: document.getElementById('sigma-container'),
              type: 'canvas'
            },
            settings: {
              defaultEdgeType: 'arrow',
              defaultNodeColor: '#4d4dff',
              minArrowSize: 5
            }
          }
        );
        this.sigma.graph.read(this.nodos);
        this.sigma.bind('clickNode', function(e){
          this.nodo = e.data.node.label;
          this.host = e.data.node.host;
          $('#btnModal').click();
          $('#modalHead').text(this.nodo);
          $('#hostText').text(this.host);
          $('#loadNodeNotifications').click();
        });
        this.sigma.refresh();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Obtiene las notificaciones pendientes.
   */
  getNotificaciones(): void {
    this.nodosService.getNotificaciones({ 'estado': 0 }).subscribe(
      (data) => {
        this.globalNotifications = data['result'];
        this.pintarNotificaciones();
        this.sigma.refresh();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Muestra las notificaciones en el grafo.
   */
  pintarNotificaciones(): void {
    const nodosNot = this.sigma.graph.nodes();
    for (let n in this.globalNotifications) {
      for (let i in nodosNot) {
        if (this.globalNotifications[n]['nodo'].includes(nodosNot[i].host.toUpperCase()) && nodosNot[i].host) {
          nodosNot[i].color = '#D32F0C';
        }
      }
    }
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
        this.actualize();
        this.currentNodeNotifications.splice(this.currentNodeNotifications.indexOf(notification));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Obtiene las notificaciones del nodo seleccionado.
   */
  loadNodeNotifications(): void {
    this.currentNodeNotifications = [];
    this.currentNode.host = $('#hostText').text();
    this.currentNode.name = $('#modalHead').text();
    for (let i in this.globalNotifications){
      let notification = this.globalNotifications[i];
      if (notification['nodo'].includes(this.currentNode.host.toUpperCase())) {
        this.currentNodeNotifications.push(notification);
      }
    }
  }

  /**
   * Marca como leídas las notificaciones del nodo seleccionado.
   */
  dismissCurrentNotifications(): void {

  }

  /**
   * Muestra los detalles de la notificación seleccionada.
   *
   * @param parentFrame Modal que se abrirá al cerrarse éste.
   * @param notification Notificación seleccionada.
   */
  showNotificationDetails(parentFrame: any, notification: any): void {
    parentFrame.hide();
    $('#modalNotificationBtn').click();
    this.currentNotification.fromArray(notification);
  }

  /**
   * Se ejecuta al crearse el componente
   */
  ngOnInit(): void {
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
      let k;
      const neighbors = {};
      const index = this.allNeighborsIndex[nodeId] || {};

      for (k in index) {
        neighbors[k] = this.nodesIndex[k];
      }

      return neighbors;
    });


  }

  getNotificationData(): any {
    this.elasticService.getDataset(
      this.currentNotification.index,
      "TIENDA_EN_LINEA",
      this.currentNotification.date,
      this.currentNotification.node,
      this.currentNotification.metric).subscribe(
      (data) => {
        this.dataset = data['result'][this.currentNotification.node]['metrics'][this.currentNotification.metric];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDataset() {
    return this.dataset;
  }

}

/**
 * Clase para manejar los datos de los nodos.
 *
 * @export
 */
export class Node {
  public host: string;
  public name: string;
}

