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

  fetchUserSubmissionsBySheet(sheeetId: string) {
    return this.find('id, type, fileType, exercise_sheet_id', [
      ['user_id', 'eq', this.authService.authUser?.id],
      ['exercise_sheet_id', 'eq', sheeetId],
    ]);
  }

  async addSubmission(submission: Partial<ISubmission>, file: File) {
    const newSubmission = await this.createRaw({
      ...this.authService.injectUserId(submission),
    });

    this.supabase.storage
      .from('submissions')
      .upload(this.getFilePath(newSubmission), file);

    return newSubmission;
  }

  async deleteSubmission(submission: ISubmission) {
    await this.supabase.storage
      .from('submissions')
      .remove([this.getFilePath(submission)]);

    return this.delete(submission.id);
  }

  async getFileBySubmission(submission: ISubmission) {
    const { data } = await this.supabase.storage
      .from('submissions')
      .download(this.getFilePath(submission));

    return data;
  }
}
