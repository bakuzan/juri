import MediaTypesEnum from 'constants/mediaTypes';
import SourceTypesEnum from 'constants/sourceTypes';
import { mapEnumToSelectOption } from 'utils';

export const MANAGE_FORM_DEFAULTS = {
  name: '',
  sourceType: '',
  mediaType: '',
  optionsParser: `function parser({ searchString, page }) {
    return {
        url: "",
    }
}`,
  responseParser: `async function parser(response) {
    // return await response.json();
    // const page = await response.text();
    // return processHtml(".class li", page);
}`,
  itemParser: `function parser(dataItem, { generateUniqueId }) {
    return {
        id: generateUniqueId(),
        href: "",
        title: "",
        image: "",
    };
}`,
  isPaged: false,
  isAdult: false,
  isActive: true
};

export const mediaTypes = mapEnumToSelectOption(MediaTypesEnum);
export const sourceTypes = mapEnumToSelectOption(SourceTypesEnum);
