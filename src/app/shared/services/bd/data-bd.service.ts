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

  private getDataAsPromise(request: IGetDataRequest) {
    return this.getSupabaseClientService.getSupabaseClient()
      .from(request.table)
      .select(request.columns)
      .eq(request.filterField, this.getFilterField(request))
  }


  private getOneDataAsPromise(request: IGetDataRequest) {
    return this.getDataAsPromise(request).single()
  }

  public getData(request: IGetDataRequest): Observable<any> {
    return from(this.getDataAsPromise(request))
  }

  public getOneData(request: IGetDataRequest): Observable<any> {
    return from(this.getOneDataAsPromise(request));
  }

  private getFilterField(request: IGetDataRequest): string {
    if (request.customFilterField) {
      return request.customFilterField;
    }
    return (request.filterType === EFilterType.ID ? this.userBdService.user?.id : this.userBdService.user?.email) || '';
  }

  public updateData(data: any, table: string): Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient().from(table).upsert(data).single())
  }

  public createData(data: any, table: string): Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient().from(table).insert(data))
  }

  public deleteData(id: any, table: string): Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient().from(table).delete().match({ id }))
  }
}
