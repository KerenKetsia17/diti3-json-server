import { Component, OnInit } from '@angular/core';
import { Employe } from '../employe';
import { EmployeService } from '../employe.service';
import { Service } from '../employe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  searchtext : any;
  constructor(private empService : EmployeService){}
  employes : Employe[] = [];
  services : Service[] = [];

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
  getfilteredEmployes() {
    if (this.searchtext) {
      const lowerCaseSearchText = this.searchtext.toLowerCase();
      return this.employes.filter(
        e =>
          e.prenom.toLowerCase().includes(lowerCaseSearchText) ||
          e.nom.toLowerCase().includes(lowerCaseSearchText) ||
          e.salaire.toString().includes(this.searchtext) ||
          this.getServiceName(e.idS).toLowerCase().includes(lowerCaseSearchText)
      );
    } else {
      return this.employes;
    }
  }
  getServiceName(idS:number){
    const service=this.services.find(trouve => trouve.id===idS)
    return service?service.nomS:'';
  }

  delete(id : number){
    let conf = confirm("Voulez-vous supprimer cet employe d'ID : " + id);
    if(conf){
      this.empService.delete(id).subscribe({
        next : (data) => {
          this.employes = this.employes.filter(e => e.id != id)
        }
      });
    }
  }
  
}
