import { ApiError, Session, User } from '@supabase/gotrue-js/src/lib/types';

export interface IRegisterResponse {
  user: User | null
  session: Session | null
  error: ApiError | null
}
