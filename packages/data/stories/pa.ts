import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Hiếm đến mức năm 1961, sau khi xử lý 60 tấn chất thải hạt nhân, cả nước Anh chỉ thu được khoảng 125 gam.',
    en: 'So rare that in 1961, after processing 60 tonnes of nuclear waste, Britain obtained only about 125 grams.',
  },
  uses: [
    {
      icon: 'FlaskConical',
      text: {
        vi: 'Chỉ dùng trong nghiên cứu khoa học',
        en: 'Used only in scientific research',
      },
    },
  ],
  facts: [],
});
