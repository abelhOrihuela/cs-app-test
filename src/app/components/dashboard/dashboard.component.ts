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
  sql: string = '';
  id_log: number = 0;
  search: any = {
    keyword: '',
    limit: 10,
    type: 'mixed'
  };

  constructor(private http: HttpClient) { }

  sendForm(){
    let self = this;
    let db = openDatabase('LOG03', '1.0', 'Test DB', 2 * 1024 * 1024);

    this.id_log = (new Date().getTime())

    db.transaction((tx) => {
      tx.executeSql('INSERT INTO LOG (id, l_keyword, l_limit, l_type) VALUES (' + self.id_log + ', "'+self.search.keyword+'", '+ self.search.limit  +', "' + self.search.type + '")');
    });

    this.list = [];

    this.http.get('http://localhost:3000/search_tweets/'+ this.search.keyword + "/" + this.search.limit +"/"+ this.search.type).subscribe(data => {
      if(data.statuses){
        this.list = data;

        this.sql="INSERT INTO LOG_DATA (log_id, ld_text, ld_favorite_count, ld_date) VALUES ";

        for (let _i = 0; _i < this.list.statuses.length; _i++) {
          self.sql += '(' + self.id_log + ', "'+ this.list.statuses[_i].text.substring(1,20) +'",' + this.list.statuses[_i].favorite_count +', "' + this.list.statuses[_i].created_at +'")';
          if(_i!=this.list.statuses.length-1){
            self.sql += ', ';
          }
        }

        db.transaction((tx) => {
          console.log(self.sql);
          tx.executeSql(self.sql);
        });

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
