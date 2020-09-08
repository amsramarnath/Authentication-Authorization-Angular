import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { contentHeaders } from '../helpers/http-config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data;
  constructor(private http:Http,
    //private http:AuthHttp
    ) { }

  ngOnInit(): void {
   
    //let headers = new Headers();
    let jwt = localStorage.getItem('jwt');
    contentHeaders.append('Authorization','Bearer '+jwt);
    
    let options = new RequestOptions({headers : contentHeaders});

     this.http.get('http://localhost:8080/getInfo',options).subscribe(response=>{
      console.log("GET Response = "+response.json());
      this.data =  response.json().data;
    });
    
  }
  
}
