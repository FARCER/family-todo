import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';
import { UserBdService } from './user-bd.service';
import { from, Observable } from 'rxjs';
import { IGetDataRequest } from '../../interfaces/get-data-request.interface';
import { EFilterType } from '../../enum/filter-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DataBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService,
    private userBdService: UserBdService
  ) {
  }

  public getData(request: IGetDataRequest): Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient()
      .from(request.table)
      .select(request.columns)
      .eq(request.filterField, request.filterType === EFilterType.ID ? this.userBdService.user?.id : this.userBdService.user?.email));
  }

  public updateData(data: any, table: string): Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient().from(table).upsert(data))
  }
}
