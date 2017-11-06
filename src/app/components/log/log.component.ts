import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {


  list: Array<any> = [];
  flag_show: boolean = true;

  constructor() {
  }



  getDetail(log){

    this.flag_show=false;
    let db = openDatabase('LOG03', '1.0', 'Test DB', 2 * 1024 * 1024);
    log.list_detail =[];
    var self = this;


    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM LOG_DATA WHERE log_id = ?', [log.id],  function(tx, results){
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
          log.list_detail.push(results.rows.item(i))
        }
      });
    });

    setTimeout(() => {
      this.flag_show=true;
  }, 100);



  }

  ngOnInit() {
    var self = this;

    let db = openDatabase('LOG03', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM LOG order by id desc', [], (tx, results) =>{
        var len = results.rows.length, i;

        for (i = 0; i < len; i++){
          self.list.push(results.rows.item(i))
        }

      });
    });
    setTimeout(() => {
      this.flag_show=true;
  }, 100);

  }

}
