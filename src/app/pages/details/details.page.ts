import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/interfaces/aluno';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/service/aluno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private alunoId: string = null;
  public aluno: Aluno = {};

  loading: any;
  private alunoSubscription: Subscription;

  constructor(
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.alunoId = this.activatedRoute.snapshot.params['id'];

    if (this.alunoId) this.loadAluno();

  }



  ngOnDestroy() {
    if (this.alunoSubscription) this.alunoSubscription.unsubscribe();
  }

  loadAluno() {

    this.alunoSubscription = this.alunoService.getAluno(this.alunoId).subscribe(
      data => {
        this.aluno = data;
      });
  }

  async saveAluno() {
    await this.presentLoading();

    this.aluno.userId = this.authService.getAuth().currentUser.uid;

    if (this.alunoId) {
      try {
        await this.alunoService.updateAluno(this.alunoId, this.aluno);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.aluno.createdAt = new Date().getTime();

      try {
        await this.alunoService.addAluno(this.aluno);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }






  ngOnInit() {

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
