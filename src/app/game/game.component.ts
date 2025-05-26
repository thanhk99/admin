import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { AdminService } from '../service/admin.service';
import { SocketService } from '../service/socket.service';

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
urlSocket='ws://127.0.0.1:8082/game/cl?id=admin'
private messageSubscription!: Subscription;
constructor(
  private http: HttpClient,
  private adminservice: AdminService,
  private socketService:SocketService,
  ) {}

ngOnInit() {
  this.socketService.connect(this.urlSocket);
  this.messageSubscription=this.socketService.getMessages().subscribe(
    (messageData: any) =>{
      let msg;
      msg=JSON.parse(messageData.message)
      if(msg.type ==="end"){
        this.getHistory()
        console.log(msg)
      }
    }
  )
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
    let data = {
      type: 'changeRs',
      code:code
    };
    let jsonData = JSON.stringify(data);
  this.socketService.sendMessage(this.urlSocket,jsonData)
}



openGame(gameName: string) {
  this.activeGame = gameName;
}

goBack() {
  this.activeGame = null;
}

}
