import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatConfirmDialogComponent} from "../service/shared/dialogs/mat-confirm-dialog-component/mat-confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor(private  dialog: MatDialog) { }

  openConfirmDialog(msg: any){
   return   this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
