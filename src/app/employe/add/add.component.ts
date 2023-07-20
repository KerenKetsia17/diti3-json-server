import { Component, OnInit } from '@angular/core';
import { Employe,Service} from '../employe';
import { EmployeService } from '../employe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private empService : EmployeService,
    private router : Router
    ){}
  
  employe : Employe = {
    id : 0,
    nom : '',
    prenom : '',
    salaire : 0,
    idS : 0
  }
  services : Service[]=[];
  employes : Employe[]=[];
  ngOnInit(): void {
    this.empService.getServices().subscribe({
      next : (data) => {
        this.services = data;
      },
      error : (err) => {
        console.log(err);
      }
    });
    this.empService.getAll().subscribe({
      next : (data) => {
        this.employes = data;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  add(){
    this.employe.idS = Number(this.employe.idS);//pour forcer la conversion
    this.empService.add(this.employe).subscribe({
      next : (data) => {
        console.log(data);
        this.router.navigate(['/employe/list']);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  getServiceName(idS:number):string{
    const service=this.services.find(trouve => trouve.id===idS)
    return service?service.nomS:'';
  }
  
}
