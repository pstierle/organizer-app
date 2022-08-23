import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BaseService } from './supabase.service';
import { ISubmission } from '../_models/ISubmission';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService extends BaseService<ISubmission> {
  constructor(private authService: AuthService) {
    super('submissions');
  }

  getFilePath(submission: ISubmission) {
    return 'private/' + this.authService.authUser?.id + '-' + submission.id;
  }

  fetchUserSubmissions() {
    return this.find('id, type, fileType, exercise_sheet_id', [
      ['user_id', 'eq', this.authService.authUser?.id],
    ]);
  }

  addSubmission(data: Partial<ISubmission>) {
    return this.create(this.authService.injectUserId(data));
  }

  uploadFile(submission: ISubmission, file: File) {
    this.supabase.storage
      .from('submissions')
      .upload(this.getFilePath(submission), file);
  }

  deleteFile(submission: ISubmission) {
    this.supabase.storage
      .from('submissions')
      .remove([this.getFilePath(submission)]);
  }

  deleteSubmission(id: string) {
    return this.delete(id);
  }

  async getFileBySubmission(submission: ISubmission) {
    const { data } = await this.supabase.storage
      .from('submissions')
      .download(this.getFilePath(submission));

    return data;
  }
}
