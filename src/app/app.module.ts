import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/student/dashboard/dashboard.component';
import { ProfilComponent } from './pages/student/profil/profil.component';
import { MyPresencesComponent } from './pages/student/my-presences/my-presences.component';
// ... autres imports ...

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    DashboardComponent,
    MyPresencesComponent
    // ... autres composants ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ... autres modules ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }