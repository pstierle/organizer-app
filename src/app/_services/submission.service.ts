import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';
import { ISubmission } from '../_models/ISubmission';
import { IUser } from '../_models/IUser';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService extends BaseService<ISubmission> {
  constructor(private authService: AuthService) {
    super('submissions');
  }

  getFilePath(userId: string, submission: ISubmission) {
    return 'private/' + userId + '-' + submission.id;
  }

  fetchUserSubmissions() {
    return this.find('id, type, fileType, exercise_sheet_id', [
      ['user_id', 'eq', this.authService.authUser?.id],
    ]);
  }

  fetchPublicSheetSubmissions(sheetId: string) {
    return this.find('id, type, fileType, exercise_sheet_id', [
      ['exercise_sheet_id', 'eq', sheetId],
    ]);
  }

  addSubmission(data: Partial<ISubmission>) {
    return this.create(this.authService.injectUserId(data));
  }

  uploadFile(submission: ISubmission, file: File) {
    this.supabase.storage
      .from('submissions')
      .upload(
        this.getFilePath(this.authService.authUser?.id ?? '', submission),
        file
      );
  }

  deleteFile(submission: ISubmission) {
    this.supabase.storage
      .from('submissions')
      .remove([
        this.getFilePath(this.authService.authUser?.id ?? '', submission),
      ]);
  }

  deleteSubmission(id: string) {
    return this.delete(id);
  }

  async getFileBySubmission(userId: string, submission: ISubmission) {
    const { data } = await this.supabase.storage
      .from('submissions')
      .download(this.getFilePath(userId, submission));

    return data;
  }
}
