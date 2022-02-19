import { Student } from '../app/interface/student';
import { Levels } from '../app/enum/levels.enum';
import { CustomResponse } from '../app/interface/custom-response';
import { CustomResponseAGGrid } from '../app/interface/custom-response-aggrid';

export const isPreplyOptions =  [{ value: true, viewValue: 'yes' }, { value: false, viewValue: 'no' }];
export const sessionName = 'studentsSession';

export const mockupStudent: Student = {
  name: 'nameStudent',
  isPreply: true,
  level: Levels.A1,
  progressInfo: 'progress mockup',
  objectivesInfo: 'objectives mockup',
  nextClassInfo: 'nextClass mockup',
  hobbiesInfo: 'hobbies mockup',
  numPaidClasses: 3
};

export const mockupResponseStudents: CustomResponse = {
  timeStamp: new Date(),
  statusCode: 0,
  status: 'status',
  reason: 'reason',
  message: 'message',
  developerMessage: 'developerMessage',
  data: { students: [{
      hobbiesInfo: 'hobbiesInfo_mockup',
      id: 22,
      isPreply: true,
      level: Levels.B2,
      name: 'name_mockup',
      nextClassInfo: 'nextClassInfo_mockup',
      numPaidClasses: 0,
      objectivesInfo: 'objectivesInfo_mockup',
      progressInfo: 'progressInfo_mockup',
    }] }
};
export const mockupResponseAGGrid: CustomResponseAGGrid = {
  timeStamp: new Date(),
  statusCode: 0,
  status: 'status',
  reason: 'reason',
  message: 'message',
  developerMessage: 'developerMessage',
  data: { agGrid: { columns: '[{"name":"isPreply","width":115},{"name":"name","width":350},{"name":"level","width":95},{"name":"nextClassInfo","width":200},{"name":"progressInfo","width":200},{"name":"hobbiesInfo","width":200},{"name":"objectivesInfo","width":356},{"name":"numPaidClasses","width":387}]' } }
};
