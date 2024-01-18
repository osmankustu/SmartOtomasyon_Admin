import { Component, OnInit } from "@angular/core";
import { DashboardData } from "app/models/EntityModels/Dashboard/DashboardData";
import { AuthService } from "app/services/Auth/auth.service";
import { DashboardService } from "app/services/dashboard.service";
import { Chart } from "chart.js/auto";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private dashboardService: DashboardService
  ) {}

  chart: any;
  chartInfo: any;
  labeldata: any[] = [];
  data: DashboardData;
  dashdata: DashboardData;

  ngOnInit() {
    this.getDataone();
    this.getData();
    this.auth.stateChecker();
    this.createChart();

  }

  getDataone(){
    this.dashboardService.getDashboardData().subscribe((response) => {
      this.dashdata = response.data;
      this.dashdata.lastLogin.reverse();
      this.dashdata.lastVisit.reverse();
    })
  }

  getData() {
    var data = {
      labels: [],
      series: [],
    };
    this.dashboardService.getDashboardData().subscribe((response) => {
      this.data = response.data;
      this.data.yearlVisit.forEach((element) => {
        data.labels.push(element.ay);
        data.series.push(element.count);
      });
    });
    return data;
  }

  createChart() {
    var data = this.TDataParser(this.getData());

    this.chart = new Chart("salesChart", {
      type: "line", //this denotes tha type of chart
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Ziyartçi Sayısı",
            borderColor: "blue",
            data: data.count[0],
            backgroundColor: "blue",
            hidden: true  ,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        font: {
          size: 20,
          lineHeight: 20,
          weight: "bold",
        },
      },
    });
  }

  TDataParser(datas:any) {
    var data = {
      labels: datas.labels,
      count: [datas.series],
    };
    return data;
  }
}
