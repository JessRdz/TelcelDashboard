import { ElasticService } from './../../servicios/elastic.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-node-chart',
  templateUrl: './node-chart.component.html',
  styleUrls: ['./node-chart.component.css']
})
export class NodeChartComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.getIndexes();
  }

  elasticService = new ElasticService(this.http);
  indexes = [];
  selectedIndex = '';

  data: any;
  hosts = [];
  selectedHost = '';
  metrics = [];
  metriclist = [];
  selectedMetric = '';

  ngOnInit(): void {
  }

  getIndexes() {
    this.elasticService.getIndexes('tiendalinea').subscribe(
      (data) => {
        this.indexes = data.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getData(index: string, period = '5m') {
    this.data = [];
    this.hosts = [];
    this.metrics = [];

    this.elasticService.getData(index, period, 1).subscribe(
      (data) => {
        this.data = data.result;
        this.hosts = this.data.hostslist.sort();
        this.metrics = this.data.metricslist;
        console.info(this.metrics);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDatasets(host, metric) {
    let result;
    if (Object.keys(this.data[host]['metrics']).includes(metric)) {
      result = this.data[host]['metrics'][metric];
    } else {
      result = '';
    }
    return result;
  }

  async update() {
    this.metriclist = this.metrics;
    this.metrics = [];
    await new Promise(r => setTimeout(r, 1000));
    this.metrics = this.metriclist;
  }

}
