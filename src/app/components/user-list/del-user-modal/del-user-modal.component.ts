import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-user-modal',
  templateUrl: './del-user-modal.component.html',
  styleUrls: ['./del-user-modal.component.sass']
})
export class DelUserModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DelUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  { }

  public close(): void {
    this.dialogRef.close(true);
  };

  public cancel(): void {
    this.dialogRef.close(false);
  };

}
