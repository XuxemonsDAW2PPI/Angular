import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  tag: string;
  isFriend: boolean;
  status?: 'pending' | 'accepted' | 'denied';
}

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit {
  friends: User[] = [];  // Lista de amigos
  users: User[] = [      // Lista de usuarios potenciales para amistad
    { id: 6, name: 'UserSix#1006', tag: 'UserSix#1006', isFriend: false },
    { id: 7, name: 'UserSeven#1007', tag: 'UserSeven#1007', isFriend: false },
    { id: 8, name: 'UserEight#1008', tag: 'UserEight#1008', isFriend: false },
    { id: 9, name: 'UserNine#1009', tag: 'UserNine#1009', isFriend: false },
    { id: 10, name: 'UserTen#1010', tag: 'UserTen#1010', isFriend: false }
  ];
  friendRequests: User[] = [];
  sentRequests: User[] = [];
  searchTag: string = '';
  searchResult: User | null = null;

  ngOnInit(): void {
    // Simular la recepción de algunas solicitudes de amistad al cargar el componente
    this.friendRequests = [
      { id: 1, name: 'Alice#0001', tag: 'Alice#0001', isFriend: false, status: 'pending' },
      { id: 2, name: 'Bob#0002', tag: 'Bob#0002', isFriend: false, status: 'pending' },
      { id: 3, name: 'Charlie#0003', tag: 'Charlie#0003', isFriend: false, status: 'pending' },
      { id: 4, name: 'Diana#0004', tag: 'Diana#0004', isFriend: false, status: 'pending' },
      { id: 5, name: 'Eve#0005', tag: 'Eve#0005', isFriend: false, status: 'pending' }
    ];
  }

  searchUser(): void {
    this.searchResult = this.users.find(user => user.tag === this.searchTag) || null;
    if (!this.searchResult) {
      alert('No se encontró el usuario con ese tag.');
    }
  }

  sendFriendRequest(user: User): void {
    if (this.sentRequests.some(req => req.id === user.id)) {
      alert('Ya has enviado una solicitud a este usuario.');
      return;
    }
    user.status = 'pending';
    this.sentRequests.push(user);
    alert(`Solicitud de amistad enviada a ${user.name}`);
    this.searchResult = null;
  }

  acceptRequest(request: User): void {
    request.isFriend = true;
    request.status = 'accepted';
    this.friends.push(request);
    // Eliminar de la lista de solicitudes recibidas
    this.friendRequests = this.friendRequests.filter(req => req.id !== request.id);
    alert(`Solicitud de amistad aceptada con ${request.name}`);
  }

  denyRequest(request: User): void {
    request.status = 'denied';
    // Eliminar de la lista de solicitudes recibidas
    this.friendRequests = this.friendRequests.filter(req => req.id !== request.id);
    alert(`Solicitud de amistad denegada con ${request.name}`);
  }
}
