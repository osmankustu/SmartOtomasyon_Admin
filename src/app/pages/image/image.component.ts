import { Component, OnInit } from "@angular/core";
import { ImageModel } from "app/models/EntityModels/Image/ImageModel";
import { AuthService } from "app/services/Auth/auth.service";
import { ImageService } from "app/services/image.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  count: number = 0;
  imageModel: ImageModel[] = [];
  constructor(
    private imageService: ImageService,
    private toastrService: ToastrService,private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.imageService.GetAll().subscribe((response) => {
      this.imageModel = response.data;
      this.count = this.imageModel.length;
      this.auth.stateChecker();
    });
  }

  delete(command: any) {
    this.imageService.Delete(command).subscribe(
      (response) => {
        this.toastrService.show(response.message, "Başarılı !");
        this.getAll();
      },
      (responseError) => {
        this.toastrService.error(responseError.message, "BAŞARISIZ");
      }
    );
  }
}
