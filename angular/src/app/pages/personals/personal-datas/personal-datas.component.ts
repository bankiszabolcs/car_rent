import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-personal-datas',
  templateUrl: './personal-datas.component.html',
  styleUrls: ['./personal-datas.component.scss'],
})
export class PersonalDatasComponent {
  @Input() user: User = new User();
}
