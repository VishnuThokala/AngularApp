import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor(private _adminService:AdminService) { }
 public data:any;

  title = 'Data Table';
  dtOptions: any = {};
  ngOnInit() {
    setTimeout(() => {
      this._adminService.getData().subscribe((resp) => {
        this.data = resp;
        setTimeout(() => {
          $('#datatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[1, "desc"]],
          });
        }, 1);
      })
     });

   
   

    
  }
  
  

}

// [
//   {
//     extend: 'collection',
//     text: 'Export',
//     buttons: [
    
//       { extend: 'print', className: 'btn-primary' },
//       { extend: 'excel', className: 'btn-primary' }
//     ]
//   }
// ]