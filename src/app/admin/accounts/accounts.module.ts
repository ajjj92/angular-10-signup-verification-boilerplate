import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AccountsRoutingModule } from './accounts-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountsRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent,
    ]
})
export class AccountsModule { }