import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsDefault } from './skills-default';

describe('SkillsDefault', () => {
  let component: SkillsDefault;
  let fixture: ComponentFixture<SkillsDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsDefault],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsDefault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
