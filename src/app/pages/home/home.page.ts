import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Aluno } from 'src/app/interfaces/aluno';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public alunos = new Array<Aluno>();
  private alunosSubscription: Subscription;

  constructor( 
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alunoService: AlunoService,
    private toastCtrl: ToastController
  ) { 

    this.alunosSubscription = this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data;
    });
  }

  ngOnInit() {
  }



  ngOnDestroy() {
    this.alunosSubscription.unsubscribe();
  }
  

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteAluno(id:string){
    try{

      await this.alunoService.deleteAluno(id);

    }catch(error){
      this.presentToast('erro ao salvar')
    }
    
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
