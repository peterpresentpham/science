import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố phản ứng mạnh nhất, ăn mòn cả thuỷ tinh, vậy mà hợp chất của nó lại giúp răng bạn chắc khoẻ.',
    en: 'The most reactive element, able to attack glass, yet its compounds help keep your teeth strong.',
  },
  uses: [
    {
      icon: 'Smile',
      text: {
        vi: 'Kem đánh răng chống sâu răng',
        en: 'Toothpaste that fights decay',
      },
    },
    {
      icon: 'CookingPot',
      text: {
        vi: 'Lớp chống dính trên chảo',
        en: 'Non-stick pan coatings',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Florua giúp răng chắc thế nào?',
        en: 'How does fluoride strengthen teeth?',
      },
      a: {
        vi: 'Men răng làm từ một khoáng chất chứa canxi. Florua thay vào một phần khoáng chất đó, tạo lớp men cứng hơn và khó bị axit do vi khuẩn tạo ra làm mòn.',
        en: 'Tooth enamel is made of a calcium mineral. Fluoride replaces part of it, forming a harder enamel that resists the acid made by bacteria.',
      },
      source: 'https://en.wikipedia.org/wiki/Fluoride_therapy',
    },
    {
      q: {
        vi: 'Chảo chống dính có flo à?',
        en: 'Is there fluorine in non-stick pans?',
      },
      a: {
        vi: 'Có. Lớp chống dính Teflon là PTFE, một chất dẻo gồm cacbon và flo. Liên kết cacbon–flo rất bền nên hầu như không gì bám được vào nó.',
        en: 'Yes. Teflon non-stick coating is PTFE, a plastic made of carbon and fluorine. Carbon–fluorine bonds are so strong that almost nothing sticks to it.',
      },
      source: 'https://en.wikipedia.org/wiki/Polytetrafluoroethylene',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Khí flo cực độc và ăn mòn. Lượng florua trong kem đánh răng thì an toàn, nhưng trẻ nhỏ không nên nuốt kem.',
      en: 'Fluorine gas is extremely toxic and corrosive. The fluoride in toothpaste is safe, but small children should not swallow it.',
    },
  },
});
