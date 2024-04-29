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
    { id: 16, name: 'Pepe#1016', tag: 'Pepe#1016', isFriend: false },
    { id: 17, name: 'Pepa#1017', tag: 'Pepa#1017', isFriend: false },
    { id: 18, name: 'Pepe#1018', tag: 'Pepe#1018', isFriend: false },
    { id: 19, name: 'Pepa#1019', tag: 'Pepa#1019', isFriend: false },
    { id: 20, name: 'Pepe#1020', tag: 'Pepe#1020', isFriend: false },
    { id: 21, name: 'Pepe#1021', tag: 'Pepe#1021', isFriend: false },
    { id: 22, name: 'Pepa#1022', tag: 'Pepa#1022', isFriend: false },
    { id: 23, name: 'Pepe#1023', tag: 'Pepe#1023', isFriend: false },
    { id: 24, name: 'Pepa#1024', tag: 'Pepa#1024', isFriend: false },
    { id: 25, name: 'Pepe#1025', tag: 'Pepe#1025', isFriend: false },



  ];
  friendRequests: User[] = [];
  sentRequests: User[] = [];
  searchTag: string = '';
  searchResult: User | null = null;
  selectedUser: User | null = null;
  filteredUsers: User[] = [];


  ngOnInit(): void {
    // Simular la recepción de algunas solicitudes de amistad al cargar el componente
    this.friendRequests = [
      { id: 1, name: 'Alice#0001', tag: 'Alice#0001', isFriend: false, status: 'pending' },
      { id: 2, name: 'Bob#0002', tag: 'Bob#0002', isFriend: false, status: 'pending' },
      { id: 3, name: 'Charlie#0003', tag: 'Charlie#0003', isFriend: false, status: 'pending' },
      { id: 4, name: 'Diana#0004', tag: 'Diana#0004', isFriend: false, status: 'pending' },
      { id: 5, name: 'Eve#0005', tag: 'Eve#0005', isFriend: false, status: 'pending' },
      { id: 6, name: 'Alice#0001', tag: 'Alice#0001', isFriend: false, status: 'pending' },
      { id: 7, name: 'Bob#0002', tag: 'Bob#0002', isFriend: false, status: 'pending' },
      { id: 8, name: 'Charlie#0003', tag: 'Charlie#0003', isFriend: false, status: 'pending' },
      { id: 9, name: 'Diana#0004', tag: 'Diana#0004', isFriend: false, status: 'pending' },
      { id: 10, name: 'Eve#0005', tag: 'Eve#0005', isFriend: false, status: 'pending' },
      { id: 11, name: 'Alice#0001', tag: 'Alice#0001', isFriend: false, status: 'pending' },
      { id: 12, name: 'Bob#0002', tag: 'Bob#0002', isFriend: false, status: 'pending' },
      { id: 13, name: 'Charlie#0003', tag: 'Charlie#0003', isFriend: false, status: 'pending' },
      { id: 14, name: 'Diana#0004', tag: 'Diana#0004', isFriend: false, status: 'pending' },
      { id: 15, name: 'Eve#0005', tag: 'Eve#0005', isFriend: false, status: 'pending' }
    ];
  }

  searchUser(): void {
    if (!this.searchTag) {
      this.filteredUsers = []; // Reiniciar la lista de usuarios filtrados si no hay ninguna etiqueta de búsqueda
      this.selectedUser = null; // Limpiar el usuario seleccionado
      return;
    }
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(this.searchTag.toLowerCase()));
  }
  

  selectUser(user: User): void {
    this.searchTag = user.name; // Llena el campo de búsqueda con el nombre del usuario seleccionado
    this.searchResult = user; // Actualiza el resultado de la búsqueda con el usuario seleccionado
    this.selectedUser = user; // Actualiza el usuario seleccionado
    this.filteredUsers = []; // Limpia la lista de usuarios filtrados
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
