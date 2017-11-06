import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){

    var db = openDatabase('LOG03', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS LOG (id, l_keyword, l_limit, l_type)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS LOG_DATA (log_id INTEGER, ld_text, ld_favorite_count ,ld_date)');
    });
  }
}
