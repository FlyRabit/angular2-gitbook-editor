import {reverse} from "esrever";
/**
 * Created by Administrator on 2017/12/8.
 */
 const SURROGATE_START = 0xD800;
 const SURROGATE_END = 0xDFFF;
const SPACE_REX = /\s/
const CHAMELEON_REX = /['\u2018\u2019]/
const PUNCTUATION_REX = /[\u0021-\u0023\u0025-\u002A]/
export class StringUtil {
  public static isSurrogate(code: any): boolean {
    return SURROGATE_START <= code && code <= SURROGATE_END;
  }

  public static isWord(char: string, remaining: string) {
    if (SPACE_REX.test(char)) {
      return false;
    }
    if (CHAMELEON_REX.test(char)) {
      let next = remaining.charAt(0);
      const length = StringUtil.getCharLength(next);
      next = remaining.slice(0, length);
      const rest = remaining.slice(length);
      if (StringUtil.isWord(next, rest)) {
        return true;
      }
      return false;
    }
  }

  public static getCharLength(char: string): number {
    return StringUtil.isSurrogate(char.charCodeAt(0)) ? 2 : 1;
  }

  public static  getCharOffset(text: string): number {
    const char = text.charAt(0);
    return StringUtil.getCharLength(char);
  }

  public static getCharOffsetBackward(text, offset): number {
    text = text.slice(0, offset);
    text = reverse(text);
    return StringUtil.getCharOffset(text);
  }

  public static getCharOffsetForward(text, offset): number {
    text = text.slice(offset);
    return StringUtil.getCharOffset(text);
  }

  public static getWordOffset(text: string): number {
    let length = 0;
    let i = 0;
    let started = false;
    let char;

    while (char = text.charAt(i)) {
      const char_length = StringUtil.getCharLength(char);
      char = text.slice(i, i+1);
      const rest = text.slice(i+1);

      if (StringUtil.isWord(char, rest)) {
        started = true;
        length = length + 1;
      } else if (!started) {
        length = length +1
      } else {
        break;
      }
      i = i + 1;
    }
    return length;
  }

  public static getWordOffsetBackward(text: string, offset: number): number {
    text = text.slice(0, offset);
    text = reverse(text);
    return StringUtil.getWordOffset(text);
  }

  public static getWordOffsetForward(text: string, offset: number): number {
    text = text.slice(0, offset);
    text = reverse(text);
    return StringUtil.getWordOffset(text);
  }
}
