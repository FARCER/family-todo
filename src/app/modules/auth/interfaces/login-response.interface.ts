import { ApiError, Session, User } from '@supabase/gotrue-js/src/lib/types';

export class ILoginResponse {
  session: Session | null;
  user: User | null;
  error: ApiError | null;
}
