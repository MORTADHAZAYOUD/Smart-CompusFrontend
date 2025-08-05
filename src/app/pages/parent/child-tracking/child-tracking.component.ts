import { Component, OnInit } from '@angular/core';
import { ParentService, Child } from '../../../services/parent.service';

@Component({
  selector: 'app-child-tracking',
  templateUrl: './child-tracking.component.html',
  styleUrls: ['./child-tracking.component.scss']
})
export class ChildTrackingComponent implements OnInit {

  children: Child[] = [];
  selectedChild: any = null;
  showEditForm = false;

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.loadChildren();
  }

  loadChildren(): void {
    this.parentService.getMyChildren().subscribe(children => {
      this.children = children;
    });
  }

  selectChild(child: Child): void {
    this.parentService.getChildProfile(child.id).subscribe(profile => {
      this.selectedChild = profile;
      this.showEditForm = false;
    });
  }

  editChild(): void {
    this.showEditForm = true;
  }

  saveChild(): void {
    // Implement save logic
    this.showEditForm = false;
  }

  cancelEdit(): void {
    this.showEditForm = false;
  }

  getGradeClass(moyenne: number): string {
    if (moyenne >= 16) return 'excellent';
    if (moyenne >= 14) return 'good';
    if (moyenne >= 12) return 'average';
    return 'needs-improvement';
  }
}