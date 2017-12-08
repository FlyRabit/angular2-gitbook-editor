import {StringUtil} from "./StringUtil";
/**
 * Created by Administrator on 2017/12/8.
 */
describe('StringUtil', () => {
  it('should offset is 0 when text is empty', () => {
    const result = StringUtil.getCharOffset('');
    expect(result).toBe(1);
  });

  it('should space is word', () => {
    const result = StringUtil.isWord(' ', '');
    expect(result).toBe(false);
  });
})
