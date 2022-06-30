import { ApiError } from '@supabase/gotrue-js/src/lib/types';

export interface ILogoutResponse {
  error: ApiError | null
}
