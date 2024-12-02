// setting a type to shape task data
export type Task = {
  id: string;
  text: string;
  done: boolean;
  assignee: string; 
  assigneeID: string;// should be user id
  doneReason: string;
  assigner: string; // should be another user id
  dueDate: string;
  points: number;
  isUpcoming: boolean;
};
