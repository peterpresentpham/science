import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Phóng xạ mạnh đến mức tự phát ánh sáng xanh lam mờ trong bóng tối.',
    en: 'So radioactive that it glows a faint blue in the dark.',
  },
  uses: [
    {
      icon: 'Hospital',
      text: {
        vi: 'Điều trị ung thư',
        en: 'Cancer treatment',
      },
    },
  ],
  facts: [],
});
