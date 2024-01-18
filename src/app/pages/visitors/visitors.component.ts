import { Component, OnInit } from "@angular/core";
import { VisitorModel } from "app/models/EntityModels/Visitors/VisitorModel";
import { DashboardService } from "app/services/dashboard.service";

@Component({
  selector: "app-visitors",
  templateUrl: "./visitors.component.html",
  styleUrls: ["./visitors.component.scss"],
})
export class VisitorsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  visitors: VisitorModel[];
  count = 0;
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService.getVisitors().subscribe(response => {
      this.visitors = response.data;
      this.visitors.reverse();
      this.count = this.visitors.length;
      console.log(this.visitors)
    });
  }
}
