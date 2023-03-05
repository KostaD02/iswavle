import { Component, ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDisplayColumn } from '../../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() isFilterAllowed: boolean = true;
  @Input() filterLabel: string = "ფილტრაცია";
  @Input() filterPlaceHolder: string = "მაგალითისთვის ...";

  @Input() isPaginateAllowed: boolean = true;
  @Input() paginatorLabel: string = "ელემენტი თითოეული გვერდისთვის";
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  @Input() data!: any;
  @Input() columnsData: TableDisplayColumn[] = [];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columnsData.map(e => e.name);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = this.paginatorLabel;
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
