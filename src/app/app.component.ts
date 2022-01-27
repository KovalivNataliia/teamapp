import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newMemberName: string = '';
  members: string[] = [];
  errorMessage: string = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onAddMemberInput(member: string) {
    this.newMemberName = member;
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = +value;
  }

  addMember() {

    if (this.teams.length > 0) this.teams.length = 0;

    if (!this.newMemberName) {
      this.errorMessage = 'Name can\'t be empty!'
    } else {
      this.errorMessage = '';
      this.members.push(this.newMemberName);
      this.newMemberName = '';
    }

  }

  createTeams() {
    const allMembers = [...this.members];

    if (!this.numberOfTeams || this.numberOfTeams < 1) {
      this.errorMessage = 'Invalid number of teams!';
      return
    }
    
    if (allMembers.length < this.numberOfTeams) {
      this.errorMessage = 'Not enough members!';
      return;
    }

    this.errorMessage = '';

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
      
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }

      }
    }

    this.numberOfTeams = '';
    this.members = [];
  }
}