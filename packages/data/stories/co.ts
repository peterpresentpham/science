import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Màu xanh lam thẫm trên gốm sứ men lam và kính màu là nhờ coban.',
    en: 'The deep blue of blue-and-white porcelain and stained glass comes from cobalt.',
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Pin điện thoại, xe điện',
        en: 'Phone and electric car batteries',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Màu xanh của men gốm, kính',
        en: 'Blue in pottery glazes and glass',
      },
    },
    {
      icon: 'Pill',
      text: {
        vi: 'Vitamin B12',
        en: 'Vitamin B12',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vitamin B12 có kim loại à?',
        en: 'Is there a metal in vitamin B12?',
      },
      a: {
        vi: 'Có: mỗi phân tử vitamin B12 có một nguyên tử coban ở trung tâm. Đây là vitamin duy nhất chứa một nguyên tố kim loại.',
        en: 'Yes: every vitamin B12 molecule has a cobalt atom at its centre. It is the only vitamin that contains a metal element.',
      },
      source: 'https://en.wikipedia.org/wiki/Vitamin_B12',
    },
    {
      q: {
        vi: 'Tên coban nghĩa là gì?',
        en: 'What does the name cobalt mean?',
      },
      a: {
        vi: 'Từ "kobold", yêu tinh trong truyện dân gian Đức. Thợ mỏ xưa tin yêu tinh làm hỏng quặng, vì quặng coban toả khói độc chứa asen khi nung mà không cho ra kim loại có ích.',
        en: 'From "kobold", a goblin of German folklore. Old miners blamed goblins for ore that gave off poisonous arsenic fumes when smelted and yielded no useful metal.',
      },
      source: 'https://en.wikipedia.org/wiki/Cobalt',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Đồ vật chứa coban vô hại khi cầm. Bụi và nhiều hợp chất coban có hại khi hít hoặc nuốt.',
      en: 'Objects containing cobalt are safe to handle. Cobalt dust and many compounds are harmful if inhaled or swallowed.',
    },
  },
});
