import $ from 'jquery';

export const elems = [1,2].map(el => {
  return $(`<div>
              Lol hey!
              ${el}
            </div>`);
});
