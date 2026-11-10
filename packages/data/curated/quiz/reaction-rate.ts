import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'reaction-rate',
  title: {
    vi: 'Tốc độ phản ứng',
    en: 'Reaction rates',
  },
  questions: [
    {
      id: 'reaction-rate-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Tốc độ phản ứng đặc trưng cho điều gì?',
        en: 'What does reaction rate describe?',
      },
      explain: {
        vi: 'Tốc độ mô tả mức thay đổi lượng hay nồng độ theo thời gian. Tổng sản phẩm, một giá trị nồng độ riêng lẻ hoặc nhiệt phản ứng đều chưa chứa thông tin thời gian cần có.',
        en: 'Rate describes amount or concentration change over time. Final yield, a single concentration or reaction heat lacks the necessary time information.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mức biến đổi lượng hoặc nồng độ chất theo thời gian',
          en: 'Change in amount or concentration over time',
        },
        {
          vi: 'Chỉ tổng lượng sản phẩm khi phản ứng kết thúc',
          en: 'Only the final total product amount',
        },
        {
          vi: 'Chỉ nồng độ chất đầu tại một thời điểm',
          en: 'Only reactant concentration at one instant',
        },
        {
          vi: 'Chỉ nhiệt toả ra trên một mol phản ứng',
          en: 'Only heat released per mole of reaction',
        },
      ],
      answer: 0,
    },
    {
      id: 'reaction-rate-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Vì sao khi tính tốc độ mất đi của chất đầu thường có dấu trừ trước ΔC/Δt?',
        en: 'Why is a minus sign commonly placed before ΔC/Δt for a disappearing reactant?',
      },
      explain: {
        vi: 'Chất đầu giảm nên ΔC âm; thêm dấu trừ cho tốc độ mất đi dương. Sản phẩm tăng không cần dấu trừ ấy; dấu trong biểu thức tốc độ không biểu diễn dấu ΔH.',
        en: 'Reactant ΔC is negative, so a minus sign gives positive disappearance. Increasing products do not need that sign, and it does not represent the sign of ΔH.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Vì mọi tốc độ sản phẩm cũng phải có dấu trừ',
          en: 'Because all product rates also need a minus sign',
        },
        {
          vi: 'Vì ΔC của chất đầu luôn dương',
          en: 'Because reactant ΔC is always positive',
        },
        {
          vi: 'Vì dấu trừ cho biết phản ứng toả nhiệt',
          en: 'Because the minus sign denotes exothermicity',
        },
        {
          vi: 'Vì nồng độ chất đầu giảm và muốn biểu diễn tốc độ dương',
          en: 'Reactant concentration falls and rate is expressed positively',
        },
      ],
      answer: 3,
    },
    {
      id: 'reaction-rate-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Tăng nhiệt độ thường làm tốc độ phản ứng tăng vì sao?',
        en: 'Why does increasing temperature generally raise reaction rate?',
      },
      explain: {
        vi: 'Tăng nhiệt độ thường tăng phần hạt có đủ năng lượng, bên cạnh tác động lên chuyển động và va chạm. Không phải mọi va chạm thành công, và không có quy tắc làm rào cản tự bằng 0.',
        en: 'Higher temperature generally increases the sufficiently energetic fraction as well as changing motion and collisions. Not every encounter succeeds, and the barrier does not automatically become zero.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ số lần va chạm tăng, phần va chạm đủ năng lượng luôn không đổi',
          en: 'Only collision frequency changes; the energetic fraction never changes',
        },
        {
          vi: 'Mọi va chạm đều đủ năng lượng ở nhiệt độ cao hơn',
          en: 'Every collision succeeds at a higher temperature',
        },
        {
          vi: 'Tăng phần va chạm đủ năng lượng và thay đổi chuyển động hạt',
          en: 'More collisions have sufficient energy and particle motion changes',
        },
        {
          vi: 'Năng lượng hoạt hoá tự giảm bằng 0 khi làm nóng',
          en: 'Heating automatically reduces activation energy to zero',
        },
      ],
      answer: 2,
    },
    {
      id: 'reaction-rate-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nghiền nhỏ CaCO₃ rắn thường làm phản ứng với cùng dung dịch axit nhanh hơn nhờ yếu tố nào?',
        en: 'Why does powdered CaCO₃ often react faster with the same acid solution?',
      },
      explain: {
        vi: 'Nghiền làm tăng diện tích tiếp xúc khi còn pha rắn. Thành phần, khối lượng mol và hệ số không đổi; đó cũng không phải cách tăng nồng độ ban đầu của axit.',
        en: 'Grinding increases exposed area while a solid phase remains. Composition, molar mass and coefficients stay unchanged, and initial acid concentration is not raised by grinding.',
      },
      elements: ['Ca', 'C', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nồng độ axit tự tăng do nghiền CaCO₃',
          en: 'Grinding CaCO₃ automatically increases acid concentration',
        },
        {
          vi: 'Diện tích tiếp xúc tăng',
          en: 'Increased contact surface',
        },
        {
          vi: 'Khối lượng mol CaCO₃ giảm khi hạt nhỏ hơn',
          en: 'Smaller grains have lower CaCO₃ molar mass',
        },
        {
          vi: 'Hệ số phương trình đổi khi chất rắn bị nghiền',
          en: 'Grinding changes the equation coefficients',
        },
      ],
      answer: 1,
    },
    {
      id: 'reaction-rate-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Xúc tác làm tăng tốc độ bằng cách nào trong mô hình phổ thông?',
        en: 'How does a catalyst increase rate in the school model?',
      },
      explain: {
        vi: 'Xúc tác tạo đường khác có rào cản thấp hơn và được tái tạo trong chu trình. Nó không đổi ΔH, không chỉ tăng riêng chiều thuận và không bị tiêu hao theo phương trình tổng lí tưởng.',
        en: 'A catalyst provides a lower-barrier route and is regenerated. It does not change ΔH, accelerate only the forward direction or undergo net consumption in an ideal cycle.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tạo con đường có rào cản hoạt hoá thấp hơn',
          en: 'Provides a lower-activation-barrier pathway',
        },
        {
          vi: 'Làm ΔH âm hơn nên mọi phản ứng nhanh hơn',
          en: 'It makes ΔH more negative and therefore speeds every reaction',
        },
        {
          vi: 'Chỉ tăng tốc chiều thuận mà không tác động chiều nghịch',
          en: 'It accelerates only the forward direction',
        },
        {
          vi: 'Bị tiêu hao theo hệ số của phương trình tổng',
          en: 'It is consumed in the overall stoichiometry',
        },
      ],
      answer: 0,
    },
    {
      id: 'reaction-rate-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Tăng nồng độ một chất đầu trong nhiều phản ứng dung dịch thường gây tác dụng nào?',
        en: 'What does increasing a reactant concentration often do in solution reactions?',
      },
      explain: {
        vi: 'Nồng độ cao hơn thường tạo thêm cơ hội tương tác. Mức tăng tốc độ cần định luật tốc độ, không suy từ hệ số; thay nồng độ không đồng nghĩa đổi rào cản hay chỉ đổi lượng sản phẩm cuối.',
        en: 'Higher concentration often provides more interactions. The rate law determines the quantitative effect, not stoichiometric coefficients; changing concentration does not itself mean lowering a barrier or affecting only final yield.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tự làm giảm năng lượng hoạt hoá trong mọi trường hợp',
          en: 'It always lowers activation energy',
        },
        {
          vi: 'Luôn nhân tốc độ đúng bằng hệ số phương trình',
          en: 'It always multiplies rate by the equation coefficient',
        },
        {
          vi: 'Chỉ làm tăng lượng sản phẩm cuối, không thể đổi tốc độ',
          en: 'It changes only final yield and never rate',
        },
        {
          vi: 'Tăng số cơ hội tương tác giữa các hạt',
          en: 'Raises opportunities for particle interactions',
        },
      ],
      answer: 3,
    },
    {
      id: 'reaction-rate-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Đơn vị thường dùng cho tốc độ biến đổi nồng độ là gì?',
        en: 'Which unit commonly expresses a concentration-change rate?',
      },
      explain: {
        vi: 'Tốc độ là nồng độ chia thời gian; mol/L thiếu phần thời gian.',
        en: 'Rate is concentration divided by time; mol/L alone lacks the time dimension.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'g/mol',
          en: 'g/mol',
        },
        {
          vi: 'kJ/mol',
          en: 'kJ/mol',
        },
        {
          vi: 'mol/(L·s)',
          en: 'mol/(L·s)',
        },
        {
          vi: 'mol/L',
          en: 'mol/L',
        },
      ],
      answer: 2,
    },
    {
      id: 'reaction-rate-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nén hỗn hợp khí phản ứng ở cùng nhiệt độ thường làm tăng tốc độ khi nào?',
        en: 'When can compressing reacting gases at fixed temperature raise their reaction rate?',
      },
      explain: {
        vi: 'Nén ở cùng nhiệt độ có thể tăng nồng độ các khí phản ứng. Chỉ tăng áp suất tổng chưa đủ nếu nồng độ liên quan không đổi; không cần hai vế có cùng số mol và không mặc định rào cản giảm.',
        en: 'Compression at fixed temperature can raise reacting-gas concentrations. Total pressure alone is insufficient if relevant concentrations stay fixed; equal gas coefficients or a lowered barrier are not requirements.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ cần áp suất tổng tăng dù nồng độ chất phản ứng không đổi',
          en: 'Whenever total pressure rises, even at unchanged reactant concentrations',
        },
        {
          vi: 'Khi làm tăng nồng độ khí có ảnh hưởng đến tốc độ',
          en: 'When it raises concentrations relevant to the rate law',
        },
        {
          vi: 'Chỉ khi hệ số khí ở hai vế bằng nhau',
          en: 'Only if both sides have equal gas coefficients',
        },
        {
          vi: 'Vì nén luôn làm giảm năng lượng hoạt hoá',
          en: 'Because compression always lowers activation energy',
        },
      ],
      answer: 1,
    },
    {
      id: 'reaction-rate-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Hai mẫu Mg cùng khối lượng, một dải lớn và một mẫu chia nhỏ. Muốn so sánh riêng diện tích tiếp xúc cần giữ gì?',
        en: 'To compare only surface-area effects for equal masses of bulk and divided Mg, what should be controlled?',
      },
      explain: {
        vi: 'Chỉ thay một yếu tố giúp quy khác biệt tốc độ cho diện tích; đổi nhiều yếu tố tạo nhiễu.',
        en: 'Changing one factor helps attribute rate differences to area; changing several factors introduces confounding.',
      },
      elements: ['Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cùng loại và nồng độ axit, nhiệt độ và điều kiện khuấy',
          en: 'Acid type and concentration, temperature and stirring',
        },
        {
          vi: 'Đổi luôn cả axit lẫn nhiệt độ',
          en: 'Change both acid and temperature',
        },
        {
          vi: 'Tăng khối lượng mẫu nhỏ',
          en: 'Increase the divided sample’s mass',
        },
        {
          vi: 'Dùng thể tích dung dịch bất kì',
          en: 'Use arbitrary solution volumes',
        },
      ],
      answer: 0,
    },
    {
      id: 'reaction-rate-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong đồ thị nồng độ chất đầu theo thời gian, đoạn giảm dốc hơn thường cho biết điều gì?',
        en: 'On a reactant concentration–time graph, what does a steeper downward section generally indicate?',
      },
      explain: {
        vi: 'Độ lớn độ dốc lớn hơn biểu thị chất đầu mất nhanh hơn tại đoạn xét. Nó không tự cho tổng sản phẩm cuối, dấu nhiệt hay xu hướng tốc độ trong mọi thời điểm khác.',
        en: 'A larger slope magnitude indicates faster local disappearance. It does not determine final yield, reaction heat or the rate trend at every other time.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tổng sản phẩm cuối chắc chắn lớn hơn',
          en: 'Final product amount must be larger',
        },
        {
          vi: 'Tốc độ phản ứng luôn tăng theo thời gian',
          en: 'Reaction rate must increase throughout the experiment',
        },
        {
          vi: 'Phản ứng chắc chắn toả nhiệt mạnh hơn',
          en: 'The reaction must release more heat',
        },
        {
          vi: 'Tốc độ mất chất đầu lớn hơn',
          en: 'Faster reactant disappearance',
        },
      ],
      answer: 3,
    },
    {
      id: 'reaction-rate-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Cho hệ số nhiệt độ giả định γ = 2 trong khoảng khảo sát. Tăng 20 °C làm tốc độ xấp xỉ tăng mấy lần?',
        en: 'Assume a temperature coefficient γ = 2 over the interval studied. A 20 °C rise increases the rate by approximately what factor?',
      },
      explain: {
        vi: 'Theo mô hình đã cho, mỗi 10 °C nhân 2; hai khoảng 10 °C cho 2² = 4. Đây không phải hằng số chung cho mọi phản ứng.',
        en: 'In the stated model, each 10 °C doubles the rate; two intervals give 2² = 4. This is not universal for every reaction.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '20',
          en: '20',
        },
        {
          vi: '1/4',
          en: '1/4',
        },
        {
          vi: '4',
          en: '4',
        },
        {
          vi: '2',
          en: '2',
        },
      ],
      answer: 2,
    },
    {
      id: 'reaction-rate-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Xúc tác có làm tăng lượng sản phẩm ở trạng thái cân bằng tại cùng nhiệt độ không?',
        en: 'Does a catalyst increase the equilibrium product amount at the same temperature?',
      },
      explain: {
        vi: 'Xúc tác tăng tốc đạt cân bằng nhờ tác động cả hai chiều. Nó không tự đổi hằng số cân bằng hay ΔH ở cùng điều kiện, nên không tăng lượng sản phẩm cân bằng.',
        en: 'A catalyst accelerates both directions and the approach to equilibrium. It does not itself change the equilibrium constant or ΔH under the same conditions, so equilibrium yield is unchanged.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Có, vì chỉ tăng tốc chiều thuận',
          en: 'Yes, because only the forward rate increases',
        },
        {
          vi: 'Không, nó giúp đạt cân bằng nhanh hơn',
          en: 'No, it reaches equilibrium faster',
        },
        {
          vi: 'Có, vì làm tăng hằng số cân bằng ở cùng nhiệt độ',
          en: 'Yes, because the equilibrium constant rises at the same temperature',
        },
        {
          vi: 'Có, vì làm ΔH âm hơn',
          en: 'Yes, because ΔH becomes more negative',
        },
      ],
      answer: 1,
    },
    {
      id: 'reaction-rate-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Một phản ứng toả nhiều nhiệt có bắt buộc diễn ra nhanh ở nhiệt độ phòng không?',
        en: 'Must a strongly exothermic reaction be fast at room temperature?',
      },
      explain: {
        vi: 'Tốc độ còn phụ thuộc rào cản và cơ chế. Toả nhiệt không xoá năng lượng hoạt hoá; cũng không có quy tắc mọi phản ứng toả nhiệt đều phải có xúc tác.',
        en: 'Barriers and mechanisms also determine rate. Exothermicity does not eliminate activation energy, and not every exothermic reaction requires a catalyst.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Không, còn phụ thuộc rào cản và cơ chế',
          en: 'No, barriers and mechanism still matter',
        },
        {
          vi: 'Có, độ lớn ΔH quyết định toàn bộ tốc độ',
          en: 'Yes, ΔH magnitude completely determines rate',
        },
        {
          vi: 'Có, vì toả nhiệt nghĩa là không có rào cản',
          en: 'Yes, exothermicity means no barrier',
        },
        {
          vi: 'Không, vì mọi phản ứng toả nhiệt đều cần xúc tác',
          en: 'No, because every exothermic reaction needs a catalyst',
        },
      ],
      answer: 0,
    },
    {
      id: 'reaction-rate-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao chỉ tăng áp suất ngoài thường ít ảnh hưởng phản ứng giữa các chất rắn, lỏng khó nén?',
        en: 'Why does external pressure often have little effect on reactions of hard-to-compress solids and liquids?',
      },
      explain: {
        vi: 'Rắn và lỏng khó nén nên thay đổi nồng độ thường nhỏ ở điều kiện thông thường. Áp suất vẫn tồn tại và truyền qua chất lỏng; không cần giả định có cân bằng để giải thích tác động nhỏ.',
        en: 'Solids and liquids are nearly incompressible, so ordinary pressure changes alter concentrations little. Pressure still exists and is transmitted in liquids; an equilibrium cancellation is not the explanation.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Áp suất chỉ tồn tại trong pha khí',
          en: 'Pressure exists only in gases',
        },
        {
          vi: 'Tăng áp suất luôn bị cân bằng bù hoàn toàn',
          en: 'Every pressure increase is completely cancelled by equilibrium',
        },
        {
          vi: 'Áp suất không thể truyền qua chất lỏng',
          en: 'Pressure cannot be transmitted through liquids',
        },
        {
          vi: 'Nồng độ và thể tích thay đổi rất ít',
          en: 'Their concentration and volume change little',
        },
      ],
      answer: 3,
    },
    {
      id: 'reaction-rate-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Khi so tốc độ giữa hai dung dịch đã hoà tan hoàn toàn và có cùng thành phần, cỡ hạt chất rắn ban đầu còn là yếu tố tiếp xúc trực tiếp không?',
        en: 'For fully dissolved solutions with identical compositions, does the original solid’s grain size remain a direct contact-area factor?',
      },
      explain: {
        vi: 'Khi đã hoà tan hoàn toàn và cùng thành phần, không còn bề mặt pha rắn ban đầu. Không suy nồng độ hay bậc phản ứng chỉ từ cỡ hạt đã biến mất trong quá trình hoà tan.',
        en: 'After complete dissolution at identical composition, the original solid surfaces are gone. Initial grain size alone does not determine the resulting concentration or reaction order.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Có, bề mặt hạt ban đầu vẫn tồn tại nguyên vẹn trong dung dịch',
          en: 'Yes, the original grain surfaces remain intact in solution',
        },
        {
          vi: 'Có, hạt ban đầu nhỏ luôn làm nồng độ cân bằng lớn hơn',
          en: 'Yes, smaller original grains always give a higher final concentration',
        },
        {
          vi: 'Không như trong phản ứng có pha rắn còn hiện diện',
          en: 'Not as it does when a solid phase remains',
        },
        {
          vi: 'Có, cỡ hạt quyết định bậc phản ứng sau hoà tan',
          en: 'Yes, grain size determines reaction order after dissolution',
        },
      ],
      answer: 2,
    },
    {
      id: 'reaction-rate-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các phát biểu đúng về việc khảo sát tốc độ.',
        en: 'Select the correct statements about studying rates.',
      },
      explain: {
        vi: 'Không suy bậc phản ứng chỉ từ phương trình tổng. Mối liên hệ đơn giản cần điều kiện cơ chế phù hợp hoặc số liệu thực nghiệm.',
        en: 'Reaction order cannot generally be inferred from the overall equation; simple correspondences require suitable mechanisms or experimental evidence.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Nên kiểm soát các yếu tố khác khi khảo sát một yếu tố',
          en: 'Control other factors when studying one variable',
        },
        {
          vi: 'Tăng nhiệt độ luôn làm ΔH đổi dấu',
          en: 'Raising temperature always reverses ΔH',
        },
        {
          vi: 'Xúc tác có thể tham gia trung gian rồi được tái tạo',
          en: 'A catalyst may form intermediates and be regenerated',
        },
        {
          vi: 'Hệ số phương trình luôn chính là bậc phản ứng thực nghiệm',
          en: 'Stoichiometric coefficients always equal experimental reaction orders',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'reaction-rate-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong 20 s, 0,40 mol H₂O₂ bị tiêu thụ trong 2,0 L theo 2H2O2 -> 2H2O + O2. Tính tốc độ trung bình v = −Δ[H₂O₂]/(2Δt).',
        en: 'In 20 s, 0.40 mol H₂O₂ is consumed in 2.0 L by 2H2O2 -> 2H2O + O2. Find the mean rate v = −Δ[H₂O₂]/(2Δt).',
      },
      explain: {
        vi: 'Độ giảm nồng độ là 0,40/2,0 = 0,20 mol/L; v = 0,20/(2 × 20) = 0,005 mol/(L·s).',
        en: 'The concentration falls by 0.40/2.0 = 0.20 mol/L; v = 0.20/(2 × 20) = 0.005 mol/(L·s).',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['H2O2 -> H2O + O2'],
      type: 'number',
      answer: 0.005,
      tolerance: 1e-9,
      calculation: {
        kind: 'reaction-rate',
        equation: 'H2O2 -> H2O + O2',
        consumedMol: [0.4],
        timeS: 20,
        volumeL: 2,
      },
      unit: 'mol/(L*s)',
    },
    {
      id: 'reaction-rate-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Cân bằng Zn + HCl -> ZnCl2 + H2. Hệ số HCl cần dùng khi chuẩn hoá tốc độ theo phương trình là bao nhiêu?',
        en: 'Balance Zn + HCl -> ZnCl2 + H2. What HCl coefficient is used when normalising rates to the equation?',
      },
      explain: {
        vi: 'Một Zn tạo ZnCl₂ cần hai Cl và hai H tạo H₂, nên hệ số HCl là 2.',
        en: 'One Zn forms ZnCl₂, requiring two Cl, while two H form H₂. HCl therefore has coefficient two.',
      },
      elements: ['Zn', 'H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Zn + HCl -> ZnCl2 + H2'],
      type: 'number',
      answer: 2,
      tolerance: 0,
      calculation: {
        kind: 'coefficient',
        equation: 'Zn + HCl -> ZnCl2 + H2',
        species: 1,
      },
    },
    {
      id: 'reaction-rate-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Với 2H2O2 -> 2H2O + O2, tốc độ mất H₂O₂ theo mol/s so với tốc độ tạo O₂ là thế nào?',
        en: 'For 2H2O2 -> 2H2O + O2, how does H₂O₂ disappearance in mol/s compare with O₂ formation?',
      },
      explain: {
        vi: 'Mỗi 2 mol H₂O₂ bị tiêu thụ tạo 1 mol O₂. Tốc độ của từng chất khác tốc độ phản ứng đã chuẩn hoá hệ số.',
        en: 'Two moles of H₂O₂ produce one mole of O₂. Species rates differ from the stoichiometrically normalised reaction rate.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['H2O2 -> H2O + O2'],
      type: 'single',
      options: [
        {
          vi: 'Bằng một nửa',
          en: 'Half as large',
        },
        {
          vi: 'Không liên quan hệ số',
          en: 'Unrelated to stoichiometry',
        },
        {
          vi: 'Gấp 2',
          en: 'Twice as large',
        },
        {
          vi: 'Bằng nhau',
          en: 'Equal',
        },
      ],
      answer: 2,
    },
    {
      id: 'reaction-rate-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một nhóm vừa tăng nồng độ axit vừa nghiền nhỏ đá vôi, rồi kết luận nồng độ là nguyên nhân duy nhất phản ứng nhanh hơn. Đánh giá nào đúng?',
        en: 'A group raises acid concentration and powders limestone, then claims concentration alone caused the faster reaction. Which assessment is correct?',
      },
      explain: {
        vi: 'Hai biến cùng thay đổi nên kết quả không cho biết riêng tác động của nồng độ; cần phép so sánh có kiểm soát.',
        en: 'Changing two variables prevents isolating concentration’s effect; a controlled comparison is needed.',
      },
      elements: ['Ca', 'C', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nồng độ không bao giờ ảnh hưởng',
          en: 'Concentration never affects rate',
        },
        {
          vi: 'Chưa tách được ảnh hưởng của hai yếu tố',
          en: 'The two effects have not been separated',
        },
        {
          vi: 'Kết luận chắc chắn đúng',
          en: 'The conclusion is certain',
        },
        {
          vi: 'Diện tích không bao giờ ảnh hưởng',
          en: 'Area never affects rate',
        },
      ],
      answer: 1,
    },
  ],
});
