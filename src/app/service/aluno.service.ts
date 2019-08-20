import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Aluno } from '../interfaces/aluno';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private alunosCollection : AngularFirestoreCollection<Aluno>;

  constructor(private afs:AngularFirestore) {

    this.alunosCollection =this.afs.collection<Aluno>('Alunos');
   }

  getAlunos() {
    return this.alunosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

   addAluno(aluno:Aluno){

    return this.alunosCollection.add(aluno);
  }

   getAluno(id:string){

    return this.alunosCollection.doc<Aluno>(id).valueChanges(); 
  }

  updateAluno(id:string,aluno:Aluno){

    return this.alunosCollection.doc<Aluno>(id).update(aluno);
  }

  deleteAluno(id:string){

    return this.alunosCollection.doc(id).delete();
  }


}
