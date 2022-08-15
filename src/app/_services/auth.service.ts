import { Router } from '@angular/router';
import { IUser } from './../_models/IUser';
import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
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
  private profileImageSubject = new BehaviorSubject<Blob | null>(null);

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
        .select(
          `name, id, university_id, course_id, course:course_id(id, name, course_area:course_area_id(id, name))`
        )
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
      await this.setUser();
      await this.setProfileImage();
      this.router.navigate(['dashboard']);
    }
  }

  async signUp(
    email: string,
    password: string,
    name: string,
    university_id: number | null,
    course_id: number | null
  ) {
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
        .insert({
          id: user.id,
          name: name,
          university_id: university_id,
          course_id: course_id,
        })
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

  getProfileImage$(): Observable<Blob | null> {
    return this.profileImageSubject.asObservable();
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.userSubject.next(null);
    this.profileImageSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  async init() {
    await this.setUser();
    await this.setProfileImage();
  }

  async updateProfile(profile: IUser) {
    const { error, data } = await this.supabase.from('users').upsert(profile);

    if (error) {
      this.handleError(error.message);
      return;
    }
    if (data) {
      await this.setUser();
    }
  }

  get profileImageName() {
    return `private/${this.authUser?.id}`;
  }

  async updateProfileImage(file: File) {
    await this.supabase.storage
      .from('profile-images')
      .remove([this.profileImageName]);

    const { data, error } = await this.supabase.storage
      .from('profile-images')
      .upload(this.profileImageName, file);

    if (error) {
      this.handleError(error.message);
      return;
    }

    await this.setProfileImage();
  }

  async setProfileImage() {
    const { data } = await this.supabase.storage
      .from('profile-images')
      .download(this.profileImageName);
    console.log(data);
    this.profileImageSubject.next(data);
  }

  async setUser() {
    const userData = await this.getUser();
    this.userSubject.next(userData);
  }

  handleError(message: string) {
    this.notificationService.send({
      type: 'error',
      header: 'Auth',
      message,
    });
  }
}
