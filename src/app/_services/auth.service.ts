import { Router } from '@angular/router';
import { IUser } from './../_models/IUser';
import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private userSubject = new BehaviorSubject<IUser | null>(null);

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get authUser() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  async getUser() {
    if (this.authUser) {
      const { error, data } = await this.supabase
        .from<IUser>('users')
        .select(`name, id`)
        .eq('id', this.authUser.id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    } else {
      return null;
    }
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signIn(email: string, password: string) {
    const { user, error } = await this.supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      this.handleError(error.message);
      return;
    }
    if (user) {
      const userData = await this.getUser();
      this.userSubject.next(userData);
      this.router.navigate(['dashboard']);
    }
  }

  async signUp(email: string, password: string, name: string) {
    const { user, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      this.handleError(error.message);
      return error;
    }
    if (user) {
      const { data, error } = await this.supabase
        .from<IUser>('users')
        .insert({ id: user.id, name: name })
        .single();
      if (error) {
        this.handleError(error.message);
        return error;
      }
    }
    return null;
  }

  getUser$(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.userSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  async init() {
    const userData = await this.getUser();
    this.userSubject.next(userData);
  }

  updateProfile(profile: User) {
    const update = {
      ...profile,
      id: this.authUser?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal',
    });
  }

  handleError(message: string) {
    this.notificationService.send({
      type: 'error',
      header: 'Auth',
      message,
    });
  }
}
