import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ThrowStmt } from '@angular/compiler';


@Component({ templateUrl: 'list.component.html',styleUrls:['list.component.css'] })
export class ListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'email', 'role','action'];
    accounts: any[];
    dataSource: MatTableDataSource<Account>;
    maxlength: number;
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        // We need to set paginator and sort in subscribe() since getAll is async.
        // If we set them in gAfterViewInit() the async call might not yet be finished and causes unpredictable behaviour
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {this.dataSource = new MatTableDataSource(accounts);
                                    this.maxlength = accounts.length;
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort; });
    }


    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id) 
            });
    }
    applyFilter(event:Event){
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}