import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodosService {
  API_URL = 'http://10.191.147.47:3000';

  constructor(private http: HttpClient) { }

  public getNodos(module: string) {
    return this.http.get(this.API_URL + '/nodos/' + module);
  }

  public getNotificaciones(json) {
    return this.http.post(this.API_URL + '/notificaciones', json);
  }

  public checkNotificaction(query, values) {
    const json = {
      'query': query,
      'values': values
    };
    return this.http.put(this.API_URL + '/notificaciones', json);
  }
}
