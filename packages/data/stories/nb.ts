import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nam châm siêu dẫn trong máy chụp MRI được quấn bằng dây hợp kim niobi.',
    en: 'The superconducting magnets in MRI scanners are wound from niobium alloy wire.',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Nam châm máy chụp MRI',
        en: 'MRI scanner magnets',
      },
    },
    {
      icon: 'Building2',
      text: {
        vi: 'Thép cường độ cao cho cầu, đường ống',
        en: 'High-strength steel for bridges and pipelines',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên niobi từ đâu mà có?',
        en: 'Where does the name niobium come from?',
      },
      a: {
        vi: 'Từ Niobe, con gái của Tantalus trong thần thoại Hy Lạp, vì niobi giống tantan, nguyên tố mang tên Tantalus, đến mức từng bị nhầm là một.',
        en: 'From Niobe, daughter of Tantalus in Greek myth, because niobium is so like tantalum, named after Tantalus, that they were once mistaken for each other.',
      },
      source: 'https://en.wikipedia.org/wiki/Niobium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi cầm, dùng.',
      en: 'Harmless to handle and use.',
    },
  },
});
