import { Component, Input } from '@angular/core';
import { ISkillsAPI } from '../../../core/models/skills.model';

@Component({
  imports: [],
  selector: 'app-skills-default',
  styleUrl: './skills-default.css',
  templateUrl: './skills-default.html',
})
export class SkillsDefault {
  @Input() mySkills!: ISkillsAPI
}
