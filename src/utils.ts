interface IObject {
  [key: string]: any;
}

export const convertNumericToPixel = (object: IObject, property: string) => {
  if (typeof object[property] === 'number') {
    object[property] = `${object[property]}px`;
  }
};
