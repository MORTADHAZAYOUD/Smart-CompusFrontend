import { Component, OnInit } from '@angular/core';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  date: Date;
  childName?: string;
  read: boolean;
  category: 'academic' | 'attendance' | 'behavior' | 'system' | 'events';
}

@Component({
  selector: 'app-parent-notifications',
  templateUrl: './parent-notifications.component.html',
  styleUrls: ['./parent-notifications.component.scss']
})
export class ParentNotificationsComponent implements OnInit {

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle note disponible',
      message: 'Emma a reçu une nouvelle note en Mathématiques: 17/20. Excellente performance!',
      type: 'success',
      date: new Date('2024-01-15T14:30:00'),
      childName: 'Emma Dupont',
      read: false,
      category: 'academic'
    },
    {
      id: 2,
      title: 'Absence signalée',
      message: 'Lucas était absent le 14/01/2024 en cours de Sport. Veuillez justifier cette absence.',
      type: 'warning',
      date: new Date('2024-01-14T16:00:00'),
      childName: 'Lucas Dupont',
      read: false,
      category: 'attendance'
    },
    {
      id: 3,
      title: 'Examen à venir',
      message: 'Contrôle de Sciences prévu le 25/01/2024 à 10h00 pour Emma.',
      type: 'info',
      date: new Date('2024-01-13T09:00:00'),
      childName: 'Emma Dupont',
      read: true,
      category: 'academic'
    },
    {
      id: 4,
      title: 'Réunion parents-professeurs',
      message: 'Réunion prévue le 30/01/2024 à 18h00. Présence souhaitée.',
      type: 'info',
      date: new Date('2024-01-12T10:00:00'),
      read: true,
      category: 'events'
    },
    {
      id: 5,
      title: 'Comportement exemplaire',
      message: 'Emma a été félicitée par Mme Dubois pour son attitude en classe.',
      type: 'success',
      date: new Date('2024-01-11T15:30:00'),
      childName: 'Emma Dupont',
      read: true,
      category: 'behavior'
    },
    {
      id: 6,
      title: 'Mise à jour du système',
      message: 'Le système sera en maintenance le 20/01/2024 de 22h00 à 02h00.',
      type: 'info',
      date: new Date('2024-01-10T12:00:00'),
      read: true,
      category: 'system'
    },
    {
      id: 7,
      title: 'Note en baisse',
      message: 'Lucas a reçu une note de 8/20 en Mathématiques. Un accompagnement pourrait être nécessaire.',
      type: 'warning',
      date: new Date('2024-01-09T11:00:00'),
      childName: 'Lucas Dupont',
      read: true,
      category: 'academic'
    },
    {
      id: 8,
      title: 'Sortie scolaire',
      message: 'Autorisation requise pour la sortie au musée le 05/02/2024.',
      type: 'info',
      date: new Date('2024-01-08T14:00:00'),
      childName: 'Emma Dupont',
      read: true,
      category: 'events'
    }
  ];

  selectedCategory: string = 'all';
  selectedChild: string = 'all';
  searchQuery: string = '';
  showOnlyUnread: boolean = false;

  categories = [
    { value: 'all', label: 'Toutes les catégories', icon: '📋' },
    { value: 'academic', label: 'Académique', icon: '📚' },
    { value: 'attendance', label: 'Assiduité', icon: '📅' },
    { value: 'behavior', label: 'Comportement', icon: '⭐' },
    { value: 'events', label: 'Événements', icon: '🎉' },
    { value: 'system', label: 'Système', icon: '⚙️' }
  ];

  children = ['all', 'Emma Dupont', 'Lucas Dupont'];

  constructor() { }

  ngOnInit(): void {
    // Load notifications
  }

  get filteredNotifications(): Notification[] {
    return this.notifications.filter(notification => {
      // Filter by category
      if (this.selectedCategory !== 'all' && notification.category !== this.selectedCategory) {
        return false;
      }

      // Filter by child
      if (this.selectedChild !== 'all' && notification.childName !== this.selectedChild) {
        return false;
      }

      // Filter by read status
      if (this.showOnlyUnread && notification.read) {
        return false;
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return notification.title.toLowerCase().includes(query) ||
               notification.message.toLowerCase().includes(query) ||
               (notification.childName && notification.childName.toLowerCase().includes(query));
      }

      return true;
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'urgent': return '🚨';
      default: return '📢';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'academic': return '📚';
      case 'attendance': return '📅';
      case 'behavior': return '⭐';
      case 'events': return '🎉';
      case 'system': return '⚙️';
      default: return '📋';
    }
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  markAsUnread(notification: Notification): void {
    notification.read = false;
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  deleteNotification(notification: Notification): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
      this.notifications = this.notifications.filter(n => n.id !== notification.id);
    }
  }

  clearAllRead(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les notifications lues ?')) {
      this.notifications = this.notifications.filter(n => !n.read);
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} à ${this.formatTime(date)}`;
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'à l\'instant';
    }
  }
}