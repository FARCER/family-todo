import { UserGroupStatusPipe } from './user-group-status.pipe';

describe('UserGroupStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new UserGroupStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
