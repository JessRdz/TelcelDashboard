import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticService {
  API_URL = 'http://10.191.147.47:3000/elastic/';

  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene los índices de elastic.
   */
  public getIndexes(modulo: string): any {
    return this.http.get(this.API_URL + 'indexes/' + modulo);
  }

  public getData(indexP: string, periodP: string, processedP: number): any {
    const json = {
      index: indexP,
      period: periodP,
      processed: processedP
    };
    return this.http.post(this.API_URL + 'last', json);
  }

  public getDataset(indexP, platformP, dateP, hostP, metricP): any {
    const json = {
      index: indexP,
      platform: platformP,
      date: dateP,
      host: hostP,
      metric: metricP,
      processed: 1
    };
    return this.http.post(this.API_URL + 'query', json);
  }
}

