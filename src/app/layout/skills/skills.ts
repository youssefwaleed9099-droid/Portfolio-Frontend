import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillsDefault } from './skills-default/skills-default';
import { ISkillsAPI } from '../../core/models/skills.model';
import { SkillsService } from '../../core/services/skills-service';

@Component({
  imports: [SkillsDefault],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {
  groupedSkills: { category: string; skills: string[] }[] = [];

  constructor(
    private _skillsService: SkillsService,
    private _cdr: ChangeDetectorRef,
  ) {}

  // 2. دالة ngOnInit
  ngOnInit(): void {
    this._skillsService.getAllSkills().subscribe((data) => {
      console.log(data);
      this.groupSkills(data);
      this._cdr.detectChanges();
    });
  }

  groupSkills(data: ISkillsAPI[]) {
    const groupedMap = new Map<string, string[]>();

    data.forEach((item) => {
      if (!groupedMap.has(item.category)) {
        groupedMap.set(item.category, []);
      }
      groupedMap.get(item.category)?.push(item.skill);
    });

    // تحويل الـ Map لـ Array
    this.groupedSkills = Array.from(groupedMap, ([category, skills]) => ({
      category: category,
      skills: skills,
    }));
  }
}
