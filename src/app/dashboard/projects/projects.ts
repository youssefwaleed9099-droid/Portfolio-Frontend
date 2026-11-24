import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../../core/services/projects-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  selectedFile: File | null = null;

  projectForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    technologies: new FormArray([new FormControl('')]),
    liveURL: new FormControl(''),
    GitHubURL: new FormControl(''),
  });

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data) => {
      if (data && data.length > 0) {
        const projectData = data[0];
        this.projectForm.patchValue({
          title: projectData.title,
          description: projectData.description,
          liveURL: projectData.liveURL,
          GitHubURL: projectData.GitHubURL,
        });
      }
    });
  }

  getTechnology() {
    return this.projectForm.get('technologies') as FormArray;
  }

  addTechnology() {
    let technologies = this.projectForm.get('technologies') as FormArray;
    technologies.push(new FormControl(''));
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    const myData = new FormData();

    myData.append('title', this.projectForm.get('title')?.value || '');
    myData.append('description', this.projectForm.get('description')?.value || '');
    myData.append('liveURL', this.projectForm.get('liveURL')?.value || '');
    myData.append('GitHubURL', this.projectForm.get('GitHubURL')?.value || '');

    const technologies = this.getTechnology().value;
    myData.append('technologies', JSON.stringify(technologies));

    if (this.selectedFile) {
      myData.append('image', this.selectedFile);
    }

    this.projectService.addProject(myData as any).subscribe({
      next: (res) => {
        console.log('data added successfully');
        console.log(this.projectForm.value);
        this.projectForm.reset();
        this.getTechnology().clear();
        this.getTechnology().push(new FormControl(''));
      }, 
      error: err => {
        console.error('something went wrong: ', err)
      }
    });
  }
}
