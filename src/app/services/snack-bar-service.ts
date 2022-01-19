import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  addError(message: string) {
    return this.snackBar.open(message, undefined, {duration: 3000,panelClass: ['snackbar-error']});
  }

  addSuccess(message: string) {
    return this.snackBar.open(message, undefined, {duration: 3000,panelClass: ['snackbar-success']});
  }

  addInfo(message: string) {
    return this.snackBar.open(message, undefined, {duration: 3000,panelClass: ['snackbar-info']});
  }


/*   public addError(message: string, action: string) {
    this.snackBar.open(message, action,{duration:3000,})
  }

  public addSuccess(message: string, action: string) {
    this.snackBar.open(message, action,{duration:3000,})
  } */
}
