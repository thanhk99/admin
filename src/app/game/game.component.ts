import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-game',
  imports: [[CommonModule, NgFor, NgIf]],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

activeGame: string | null = null;
history: any[] = [];
totalScore: number = 0;

constructor(private http: HttpClient,
            private adminservice: AdminService) {}

ngOnInit() {
  this.getHistory();
}

getHistory() {
  this.adminservice.getTaiXiuHistory().subscribe((data: any[]) => {
    let isFirst = true;
    data.forEach((element: any) => {
      let numbers = element.result.split(',').map(Number);
      let sum: number = numbers.reduce((a: number, b: number) => a + b, 0);

      if (isFirst) {
        this.totalScore = sum;
        isFirst = false;
      }

      this.addToHistory(sum > 10 ? 'tai' : 'xiu');
    });

    this.history = this.history.slice().reverse();
  });
}

addToHistory(betType: string): void {
  const result = betType === 'tai' ? 'tài' : 'xỉu';
  this.history.push(result);

  if (this.history.length > 10) {
    this.history.shift();
  }
}

forceResult(code: number): void {
  this.adminservice.forceTaiXiuResult(code).subscribe({
    next: (res) => {
      console.log("Phản hồi đầy đủ từ backend:", res);
      console.log("Nội dung phản hồi:", res.body); 
      alert(res.body); 
    },
    error: (err) => {
      console.error("Lỗi khi gọi forceTaiXiuResult:", err);
    }
  });
}



openGame(gameName: string) {
  this.activeGame = gameName;
}

goBack() {
  this.activeGame = null;
}

}
