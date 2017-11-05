import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  list: Array<any> = [];
  person: any = {};
  search: any = {
    keyword: '',
    limit: 10,
    type: 'mixed'
  };

  constructor(private http: HttpClient) { }


  sendForm(){

    this.list = [];

    this.http.get('http://localhost:3000/search_tweets/'+ this.search.keyword + "/" + this.search.limit +"/"+ this.search.type).subscribe(data => {
    if(data.statuses && data.statuses.length>0){
      this.list = data;

    }

    });
  }

  cleanForm(){
    this.list = [];
    this.search= {
      keyword: '',
      limit: 10,
      type: 'mixed'
    };
  }

  ngOnInit() {





  }

}
