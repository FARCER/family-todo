import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';
import { UserBdService } from './user-bd.service';

@Injectable({
  providedIn: 'root'
})
export class DataBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService,
    private userBdService: UserBdService
  ) {
  }

  public getData(table: string, columns: string, filterById: string = 'id') {
    return this.getSupabaseClientService.getSupabaseClient()
      .from(table)
      .select(columns)
      .eq(filterById, this.userBdService.user?.id);
  }


  public updateData(data: any, table: string) {
    return this.getSupabaseClientService.getSupabaseClient().from(table).upsert(data)
  }
}
