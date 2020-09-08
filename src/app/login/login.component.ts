import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;

  constructor(
    private router : Router,
    private route:ActivatedRoute,
    private authService : AuthService) { }

  ngOnInit(): void {
  }

  signIn11(credentials){
    
    //console.log("credentials="+credentials);

    let aa = this.authService.login(credentials);
     console.log("aa="+aa);
      /*.subscribe(result => {
        if(result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      }); */

  }

  signIn(credentials){
    
    //console.log("credentials="+credentials);

    this.authService.login(credentials).subscribe(response=>{
      console.log("POST Request is successful ", response.json());
  
      let result = response.json();
      if(result != null && result.jwt){
        localStorage.setItem('jwt',result.jwt);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      }else{
        this.invalidLogin = true;
      }
    });;
     

  }

 
}
