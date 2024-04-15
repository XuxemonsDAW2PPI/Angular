import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí


interface User {
  id: string;
  name: string;
  friendRequests: string[];
  friends: string[];
}

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  searchId: string = '';
  newUserId: string = ''; // Añade esta propiedad
  newUserName: string = ''; // Añade esta propiedad

  constructor() {
    this.currentUser = { id: 'yo#1001', name: 'Yo', friendRequests: [], friends: [] }; // Ejemplo de usuario actual
    this.loadUsers();
  }

  ngOnInit(): void {
    this.initializeSampleData();
  }

  initializeSampleData() {
    if (!localStorage.getItem('users')) {
      const sampleUsers: User[] = [
        { id: 'alice#1234', name: 'Alice', friendRequests: ['bob#5678'], friends: ['carol#9101'] },
        { id: 'bob#5678', name: 'Bob', friendRequests: [], friends: ['alice#1234', 'dave#1112'] },
        { id: 'carol#9101', name: 'Carol', friendRequests: ['dave#1112'], friends: ['alice#1234'] },
        { id: 'dave#1112', name: 'Dave', friendRequests: [], friends: ['bob#5678'] }
      ];
      localStorage.setItem('users', JSON.stringify(sampleUsers));
      this.loadUsers();  // Asegúrate de que este método actualice los datos en el componente
    }
  }

  loadUsers() {
    const usersData = localStorage.getItem('users');
    this.users = usersData ? JSON.parse(usersData) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  sendFriendRequest(toId: string) {
    const user = this.findUserById(toId);
    if (user) {
      user.friendRequests.push(this.currentUser.id);
      this.saveUsers();
    }
  }

  respondToRequest(requesterId: string, accept: boolean) {
    const index = this.currentUser.friendRequests.indexOf(requesterId);
    if (index > -1) {
      if (accept) {
        this.currentUser.friends.push(requesterId);
      }
      this.currentUser.friendRequests.splice(index, 1);
      this.saveUsers();
    }
  }

  addUser(id: string, name: string) {
    const newUser: User = { id, name, friendRequests: [], friends: [] };
    this.users.push(newUser);
    this.saveUsers();
  }
}
