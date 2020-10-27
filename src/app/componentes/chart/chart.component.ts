import { ElasticService } from './../../servicios/elastic.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // elasticService = new ElasticService();
  indexes: any;

  constructor() { }

  @Input() title: string;

  @Input() public chartType = 'line';

  @Input() public datasets: any;
  public chartDatasets: Array<any> = [];

  @Input() public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  @Input() public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(60, 137, 132, .2)',
      borderColor: 'rgba(20, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 10, .2)',
      borderColor: 'rgba(0, 10, 5, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit(): void {
    this.readDatasets();
  }

  readDatasets() {
    if (this.datasets !== '') {
      const data = [];
      const labels = Object.keys(this.datasets);

      for (let l in labels) {
        if (labels[l] !== 'timestamp') {
          data.push({
            data: this.datasets[labels[l]],
            label: labels[l]
          });
        }
      }
      this.chartDatasets = data;
      this.chartLabels = this.datasets.timestamp;
    }
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getIndexes() {
    // console.info(this.elasticService.getIndexes());
  }
}
