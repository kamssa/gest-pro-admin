import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Manager} from "../../models/Manager";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {Router} from "@angular/router";
import {ManagerService} from "../../service/manager.service";
import {UpdateEntreComponent} from "../update-entre/update-entre.component";
import {AddEntrepriseComponent} from "../add-entreprise/add-entreprise.component";

@Component({
  selector: 'app-list-entreprise',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.scss']
})
export class ListEntrepriseComponent implements OnInit {
  displayedColumns: string[] = ['entreprise', 'representant', 'telephone', 'suspendre', 'update', 'delete'];
  dataSource: MatTableDataSource<Manager>;
  managers: Manager[] ;
  manager: Manager ;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  @ViewChild(MatSort) sort : MatSort ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private managerServive: ManagerService,
              public dialog: MatDialog,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router) {
  }
  ngOnInit(): void {
    this.managerServive.getAllManager().subscribe(data => {
      this.managers = data.body;
      console.log('managers', this.managers);
      this.managers.forEach(value => {
        let opp : Manager = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Manager>(this.receptacle);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
    });
  }
  applyFilter($event: KeyboardEvent) {

  }

  redirectToUpdate(id: any) {
    console.log(id);

    const dialogRef = this.dialog.open(UpdateEntreComponent,{
      data: {
        manager: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
        this.receptacle.unshift(this.manager);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Manager>(this.receptacle);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      } else {
        console.log('données non disponibles');
      }

    });


  }
 /* redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous supprimer le manager ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.managerServive.supprimer(id).subscribe(data => {
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: 'top',

          });
        });

      }
    });


    this.router.navigate(['manager']);

  }*/
  redirectToFormation(id: number) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEntrepriseComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.manager = result;
    });
  }
  redirectToDelete(id: any) {

  }


}
