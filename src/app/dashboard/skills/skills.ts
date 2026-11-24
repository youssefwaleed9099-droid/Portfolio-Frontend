import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISkillsAPI } from '../../core/models/skills.model';
import { SkillsService } from '../../core/services/skills-service';
import { ISkillPayload } from '../../core/services/skills-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {
  skillsList: ISkillsAPI[] = [];

  editSkillById: string | null = null;

  skillForm: FormGroup = new FormGroup({
    skill: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private skillService: SkillsService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadSkill();
  }

  loadSkill() {
    this.skillService.getAllSkills().subscribe((data) => {
      this.skillsList = data;
      this._cdr.detectChanges();
    });
  }

  onSubmit() {
    if (this.skillForm.invalid) return;

    const formData = this.skillForm.value as ISkillPayload;

    if (this.editSkillById) {
      this.skillService.updateSkills(this.editSkillById, formData).subscribe({
        next: () => {
          this.loadSkill();
          this.cancelEdit();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.skillService.addSkill(formData).subscribe({
        next: () => {
          (this.loadSkill, this.skillForm.reset());
        },
        error: (err) => console.error(err),
      });
    }
  }

  onEdit(skill: ISkillsAPI) {
    this.editSkillById = skill._id;
    this.skillForm.patchValue({
      skill: skill.skill,
      category: skill.category,
    });
  }

  cancelEdit() {
    this.editSkillById = null;
    this.skillForm.reset();
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this skill')) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => {
          console.log('skill deleted successfully');
          this.loadSkill();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
