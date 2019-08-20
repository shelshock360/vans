import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afa: AngularFireAuth) { }

  login(usuario: Usuario) {

    return this.afa.auth.signInWithEmailAndPassword(usuario.email, usuario.password);

  }

  register(usuario: Usuario) {
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth(){

    return this.afa.auth;
  }

 
}