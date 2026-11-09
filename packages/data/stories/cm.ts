import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo vợ chồng Curie; phóng xạ mạnh đến mức tự phát sáng màu tím trong bóng tối.',
    en: 'Named after Marie and Pierre Curie; so radioactive it glows purple in the dark.',
  },
  uses: [
    {
      icon: 'Rocket',
      text: {
        vi: 'Thiết bị đo đất đá trên robot sao Hoả',
        en: 'Rock analysers on Mars rovers',
      },
    },
  ],
  facts: [],
});
