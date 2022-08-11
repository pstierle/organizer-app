export interface INotification{
  header?: string;
  message: string;
  type: "error" | "success" | "warning"
}
