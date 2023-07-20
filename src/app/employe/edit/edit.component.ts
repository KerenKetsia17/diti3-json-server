import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe,Service } from '../employe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private empService : EmployeService,
    private router : Router,
    private route : ActivatedRoute
    ){}
  

  employe : Employe = {
    id : 0,
    nom : '',
    prenom : '',
    salaire : 0,
    idS:0
  }
  services: Service[] = [];
  employes : Employe[]=[];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'))
      this.getById(id)
    })
      //employes
    this.empService.getAll().subscribe({
      next : (data) => {
        this.employes = data;
      },
      error : (err) => {
        console.log(err);
      }
    })
    
    //services
    this.empService.getServices().subscribe({
      next : (data) => {
        this.services = data;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  

  getById(id : number){
    this.empService.getById(id).subscribe((data) => {
      this.employe = data
    })
  }

  getServiceName(idS:number):string{
    const service=this.services.find(trouve => trouve.id===idS)
    return service?service.nomS:'';
  }

  update(){
    this.employe.idS = Number(this.employe.idS);
    this.empService.update(this.employe).subscribe({
      next : (data) => {
        this.router.navigate(["/employe/list"])
      },
      error : (err) => {
        console.log(err)
      }
    })


  }
  
}

