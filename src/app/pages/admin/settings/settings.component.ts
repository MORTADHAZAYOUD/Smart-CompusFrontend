import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

interface SystemSettings {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  academicYear: string;
  maxStudentsPerClass: number;
  attendanceThreshold: number;
  gradeScale: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maintenanceMode: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule, 
    DatePipe
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  loading = false;
  saving = false;
  activeTab = 'general';
  currentDate = new Date();

  tabs = [
    { id: 'general', label: 'Général', icon: '⚙️' },
    { id: 'academic', label: 'Académique', icon: '🎓' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'system', label: 'Système', icon: '💻' }
  ];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.settingsForm = this.fb.group({
      schoolName: ['SmartCompus', Validators.required],
      schoolAddress: ['123 Rue de l\'Université, 75001 Paris', Validators.required],
      schoolPhone: ['01 23 45 67 89', Validators.required],
      schoolEmail: ['contact@smartcompus.fr', [Validators.required, Validators.email]],
      academicYear: ['2023-2024', Validators.required],
      maxStudentsPerClass: [30, [Validators.required, Validators.min(1), Validators.max(100)]],
      attendanceThreshold: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
      gradeScale: ['20', Validators.required],
      emailNotifications: [true],
      smsNotifications: [false],
      maintenanceMode: [false]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    
    // Simulate API call
    setTimeout(() => {
      // Settings would be loaded from the API
      this.loading = false;
    }, 500);
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.saving = true;
      const settings = this.settingsForm.value;
      
      console.log('Saving settings:', settings);
      
      // Simulate API call
      setTimeout(() => {
        this.saving = false;
        alert('Paramètres sauvegardés avec succès !');
      }, 1000);
    }
  }

  resetSettings(): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      this.settingsForm.reset();
      this.loadSettings();
    }
  }

  exportSettings(): void {
    const settings = this.settingsForm.value;
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'smartcompus-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importSettings(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const settings = JSON.parse(e.target.result);
          this.settingsForm.patchValue(settings);
          alert('Paramètres importés avec succès !');
        } catch (error) {
          alert('Erreur lors de l\'importation du fichier.');
        }
      };
      reader.readAsText(file);
    }
  }

  testEmailNotification(): void {
    alert('Email de test envoyé !');
  }

  testSMSNotification(): void {
    alert('SMS de test envoyé !');
  }
}