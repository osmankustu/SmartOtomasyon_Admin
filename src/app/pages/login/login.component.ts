import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/services/Auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  date = new Date();
  currentYear: Number;
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.currentYear = this.date.getFullYear();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let model = Object.assign(this.loginForm.value);
      this.authService.login(model).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message, "Başarılı !");
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("surename", response.data.surename);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("exp", response.data.expiration.toString());
            this.router.navigate(["admin/dashboard"]);
          } else
            this.toastrService.warning(response.message, "Dikkat !");
        },
        (responseError) => {
          this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
        }
      );
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat");
    }
  }
}
