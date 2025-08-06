import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 


interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'parent' | 'teacher' | 'admin';
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'teacher' | 'admin';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterLink,     RouterModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  conversations: Conversation[] = [
    {
      id: '1',
      participantName: 'Mme. Martin',
      participantRole: 'teacher',
      lastMessage: 'Merci pour votre message. Je vous tiendrai informé.',
      lastMessageTime: new Date('2024-01-15T14:30:00'),
      unreadCount: 0,
      messages: [
        {
          id: '1',
          senderId: 'parent1',
          senderName: 'Vous',
          senderRole: 'parent',
          content: 'Bonjour Mme. Martin, j\'aimerais avoir des nouvelles sur les progrès de Marie en mathématiques.',
          timestamp: new Date('2024-01-15T10:00:00'),
          isRead: true
        },
        {
          id: '2',
          senderId: 'teacher1',
          senderName: 'Mme. Martin',
          senderRole: 'teacher',
          content: 'Bonjour, Marie fait de très bons progrès. Elle participe activement en classe et ses dernières évaluations sont excellentes.',
          timestamp: new Date('2024-01-15T14:30:00'),
          isRead: true
        },
        {
          id: '3',
          senderId: 'teacher1',
          senderName: 'Mme. Martin',
          senderRole: 'teacher',
          content: 'Merci pour votre message. Je vous tiendrai informé.',
          timestamp: new Date('2024-01-15T14:30:00'),
          isRead: true
        }
      ]
    },
    {
      id: '2',
      participantName: 'Administration',
      participantRole: 'admin',
      lastMessage: 'N\'oubliez pas la réunion parent-professeur demain.',
      lastMessageTime: new Date('2024-01-14T16:00:00'),
      unreadCount: 2,
      messages: [
        {
          id: '4',
          senderId: 'admin1',
          senderName: 'Administration',
          senderRole: 'admin',
          content: 'Rappel: Réunion parent-professeur le 16 janvier à 18h00 en salle 12.',
          timestamp: new Date('2024-01-14T16:00:00'),
          isRead: false
        },
        {
          id: '5',
          senderId: 'admin1',
          senderName: 'Administration',
          senderRole: 'admin',
          content: 'N\'oubliez pas la réunion parent-professeur demain.',
          timestamp: new Date('2024-01-14T16:00:00'),
          isRead: false
        }
      ]
    }
  ];

  selectedConversation: Conversation | null = null;
  newMessage = '';
  currentUser = {
    id: 'parent1',
    name: 'Parent User',
    role: 'parent' as const
  };

  constructor() {}

  ngOnInit(): void {
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    // Mark messages as read
    conversation.messages.forEach(message => {
      if (message.senderId !== this.currentUser.id) {
        message.isRead = true;
      }
    });
    conversation.unreadCount = 0;
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: this.currentUser.id,
      senderName: 'Vous',
      senderRole: this.currentUser.role,
      content: this.newMessage.trim(),
      timestamp: new Date(),
      isRead: true
    };

    this.selectedConversation.messages.push(message);
    this.selectedConversation.lastMessage = message.content;
    this.selectedConversation.lastMessageTime = message.timestamp;
    
    this.newMessage = '';
    this.scrollToBottom();

    // Simulate response after 2 seconds
    setTimeout(() => {
      this.simulateResponse();
    }, 2000);
  }

  simulateResponse(): void {
    if (!this.selectedConversation) return;

    const responses = [
      'Merci pour votre message. Je vous réponds dès que possible.',
      'Message bien reçu. Je vais examiner votre demande.',
      'Je vous remercie pour cette information.',
      'Nous prenons note de votre message.'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const responseMessage: Message = {
      id: Date.now().toString(),
      senderId: this.selectedConversation.id === '1' ? 'teacher1' : 'admin1',
      senderName: this.selectedConversation.participantName,
      senderRole: this.selectedConversation.participantRole,
      content: randomResponse,
      timestamp: new Date(),
      isRead: true
    };

    this.selectedConversation.messages.push(responseMessage);
    this.selectedConversation.lastMessage = responseMessage.content;
    this.selectedConversation.lastMessageTime = responseMessage.timestamp;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDate(date: Date): string {
    const now = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === now.toDateString()) {
      return this.formatTime(messageDate);
    } else {
      return messageDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short'
      });
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'teacher': return '👩‍🏫';
      case 'admin': return '👨‍💼';
      case 'parent': return '👤';
      default: return '👤';
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}