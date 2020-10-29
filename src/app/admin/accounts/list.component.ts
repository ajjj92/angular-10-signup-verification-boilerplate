import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({ templateUrl: 'list.component.html',styleUrls:['list.component.css'] })
export class ListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'email', 'role','action'];
    accounts: any[];
    dataSource: MatTableDataSource<Account>;
    maxlength: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {this.dataSource = new MatTableDataSource(accounts);
                                    this.dataSource.paginator = this.paginator;
                                    this.maxlength = accounts.length;});
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
}
