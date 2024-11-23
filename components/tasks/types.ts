// setting a type to shape task data
export type Task = {
  id: number;
  text: string;
  done: boolean;
  assignee: string; // should be user id
  doneReason: string;
  assigner: string; // should be another user id
  dueDate: string;
  isUpcoming: boolean;
};
