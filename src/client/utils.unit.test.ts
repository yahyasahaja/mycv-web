import {
  generateImageUrlById,
  generateImageUrlByUrl,
  convertDashedToReadable,
} from './utils';

describe('Test helper functions', () => {
  it('generateImageUrlById shpuld give correct return value', () => {
    const id = 10;
    expect(generateImageUrlById(id)).toEqual(
      `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    );
  });

  it('generateImageUrlByUrl should give the correct return value', () => {
    const url = 'https://someurl/blabla/yay/2/';
    const result = generateImageUrlByUrl(url);
    expect(result).toContain('/2.png');
  });

  it('generateImageUrlByUrl correct return value with another url signature', () => {
    const url = 'https://someurl/blabla/yay/2';
    const result = generateImageUrlByUrl(url);
    expect(result).toContain('/2.png');
  });

  it('convertDashedToReadable should give the correct return value', () => {
    const dashedString = 'yahya-asti';
    const result = convertDashedToReadable(dashedString);
    expect(result).toContain('yahya asti');
  });

  it('convertDashedToReadable with 3 words', () => {
    const dashedString = 'yahya-asti-lol';
    const result = convertDashedToReadable(dashedString);
    expect(result).toContain('yahya asti lol');
  });
});
