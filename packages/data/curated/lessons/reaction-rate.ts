import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 6, Bài 19. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
export default defineLesson({
  id: 'reaction-rate',
  grade: 10,
  order: 6,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 6: Tốc độ phản ứng; Bài 19.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 6: Reaction rates; Lessons 19.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 19: Tốc độ phản ứng',
      en: 'Lesson 19: Reaction rates',
    },
  ],
  title: {
    vi: 'Phản ứng nhanh hay chậm vì đâu?',
    en: 'What makes reactions fast or slow?',
  },
  goals: [
    {
      vi: 'Tính tốc độ trung bình và chuẩn hoá theo hệ số.',
      en: 'Calculate average rates and normalise by coefficients.',
    },
    {
      vi: 'Giải thích tác động của nồng độ, nhiệt độ, bề mặt và xúc tác.',
      en: 'Explain concentration, temperature, surface and catalyst effects.',
    },
    {
      vi: 'Nhận ra phép so sánh có kiểm soát và phân biệt tốc độ với lượng sản phẩm.',
      en: 'Recognise controlled comparisons and distinguish rate from yield.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Cùng tạo khí, nhưng nhanh đến đâu?\nHai mẫu đá vôi cùng khối lượng có thể cho khí thoát ra nhanh chậm khác nhau khi tiếp xúc với axit. Muốn mô tả sự khác biệt, không chỉ hỏi cuối cùng tạo bao nhiêu khí mà còn hỏi lượng chất thay đổi trong bao lâu. Đó là ý nghĩa của tốc độ phản ứng. Tổng lượng sản phẩm và tốc độ tạo ra sản phẩm là hai đại lượng cần được phân biệt.\nTrong dung dịch, ta thường theo dõi mức biến đổi nồng độ theo thời gian. Có thể dùng lượng khí, khối lượng hay một tín hiệu thích hợp khác, nhưng cần biết tín hiệu ấy liên hệ thế nào với lượng chất phản ứng. Nhiều bọt khí nhìn bằng mắt chưa đủ để so định lượng nếu bình, nhiệt độ hay cách thu khí khác nhau. Một phép đo tốt phải chỉ rõ đại lượng đang đo, đơn vị, khoảng thời gian và điều kiện so sánh.',
        en: '## Gas is forming, but how quickly?\nEqual masses of limestone can release gas at different speeds when exposed to acid. To describe the difference, ask not only how much gas eventually forms but also how long the change takes. Reaction rate addresses that second question. Total product amount and the speed of product formation are distinct quantities.\nIn solution, concentration change over time is a common measure. Gas amount, mass or another suitable signal can also be followed, but its connection to reacting amounts must be understood. More visible bubbles alone cannot support a quantitative comparison if containers, temperatures or gas-collection methods differ. A useful measurement identifies the quantity observed, its units, the time interval and the conditions being compared.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Đọc một tốc độ trung bình\nNếu nồng độ chất đầu giảm, hiệu nồng độ sau trừ trước là số âm. Vì muốn biểu diễn tốc độ mất đi bằng số dương, ta dùng dấu trừ trước ΔC/Δt. Với sản phẩm tăng lên, không cần dấu trừ ấy. Luôn kiểm chất nào đang được theo dõi thay vì học một dấu trừ cho mọi trường hợp.\nTốc độ trung bình tính trên một khoảng thời gian. Nếu đường nồng độ theo thời gian cong, hai khoảng khác nhau có thể cho hai tốc độ trung bình khác nhau. Độ dốc tại một thời điểm mô tả tốc độ tức thời, không phải toàn bộ đoạn từ lúc bắt đầu. Khi đọc đồ thị, nhìn cả độ lớn độ dốc và chiều tăng giảm; một đường đi xuống dốc hơn nghĩa là chất đầu mất nhanh hơn, không có nghĩa nồng độ của nó đã trở thành số âm.',
        en: '## Reading an average rate\nA disappearing reactant has a negative final-minus-initial concentration change. A minus sign before ΔC/Δt therefore expresses its disappearance rate as positive. A product whose concentration rises does not need that minus sign. Check which species is monitored rather than attaching a minus sign to every rate expression.\nAn average rate belongs to a time interval. If a concentration–time curve bends, different intervals can have different average rates. The slope at one point describes an instantaneous rate rather than the whole interval since the start. When reading a graph, consider both slope magnitude and whether concentration rises or falls. A steeper downward reactant curve means faster disappearance, not that the concentration itself has become negative.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Hệ số giúp các phép đo nói cùng một ngôn ngữ\nKhi H₂O₂ phân huỷ, phương trình cân bằng có tỉ lệ 2 H₂O₂ tạo 2 H₂O và 1 O₂. Vì vậy tốc độ mất H₂O₂ theo mol mỗi giây gấp hai tốc độ tạo O₂, nếu chỉ xét phản ứng này. Muốn có cùng một tốc độ phản ứng, ta chia tốc độ biến đổi của từng chất cho hệ số tương ứng.\nTrong bài toán giả định, 0,40 mol H₂O₂ bị tiêu thụ trong 20 s ở thể tích dung dịch không đổi 2,0 L. Độ giảm nồng độ là 0,20 mol/L. Tốc độ mất H₂O₂ trung bình là 0,010 mol/(L·s), còn tốc độ phản ứng chuẩn hoá theo hệ số 2 là 0,005 mol/(L·s). Hai giá trị không mâu thuẫn: chúng trả lời hai cách định nghĩa. Đọc rõ đề hỏi tốc độ của chất hay tốc độ phản ứng trước khi tính và ghi đơn vị.',
        en: '## Coefficients put measurements on a common basis\nFor H₂O₂ decomposition, the balanced equation consumes 2 H₂O₂ and forms 2 H₂O plus 1 O₂. Its peroxide disappearance rate in moles per second is therefore twice the oxygen formation rate if this is the only reaction. Dividing each species rate by its coefficient gives one common reaction rate.\nIn a hypothetical exercise, 0.40 mol H₂O₂ is consumed in 20 s in a constant solution volume of 2.0 L. Concentration falls by 0.20 mol/L. Mean peroxide disappearance is 0.010 mol/(L·s), while reaction rate normalised by coefficient two is 0.005 mol/(L·s). These values are consistent: they use different definitions. Read whether the problem asks for a species rate or a normalised reaction rate before calculating and reporting units.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'H2O2 -> H2O + O2',
      },
      caption: {
        vi: 'Từ hệ số, so tốc độ mất H₂O₂ với tốc độ tạo O₂ trong cùng khoảng thời gian.',
        en: 'Use coefficients to compare peroxide disappearance and oxygen formation over the same interval.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['reaction-rate-001', 'reaction-rate-002', 'reaction-rate-007'],
    },
    {
      type: 'text',
      md: {
        vi: '## Va chạm nhiều hơn chưa phải toàn bộ câu chuyện\nTrong mô hình va chạm, các tiểu phân cần gặp nhau với năng lượng và định hướng thích hợp để phản ứng. Không phải mọi lần gặp đều tạo sản phẩm. Tăng nồng độ thường làm tăng cơ hội tương tác, nhưng quan hệ định lượng giữa nồng độ và tốc độ còn phụ thuộc phản ứng cụ thể.\nKhông được lấy hệ số của phương trình tổng rồi tự xem đó là số mũ trong định luật tốc độ. Phương trình tổng cho tỉ lệ vật chất, chưa cho cơ chế từng bước. Với khí, nén ở cùng nhiệt độ có thể tăng nồng độ các chất khí và tác động đến tốc độ. Lập luận ấy không chuyển nguyên xi sang chất rắn hoặc chất lỏng gần như không nén được. Khi nêu yếu tố ảnh hưởng, hãy giải thích đại lượng nào thực sự thay đổi trong hệ đang xét.',
        en: '## More collisions are only part of the explanation\nIn the collision model, particles must meet with suitable energy and orientation to react. Not every encounter produces products. Increasing concentration often raises opportunities for interaction, but the quantitative relationship between concentration and rate depends on the particular reaction.\nDo not simply turn overall stoichiometric coefficients into exponents in a rate law. The overall equation gives material ratios rather than the mechanism of individual steps. Compressing gases at constant temperature can increase gas concentrations and affect the rate. That argument does not transfer unchanged to nearly incompressible solids or liquids. When naming an influencing factor, explain what quantity actually changes in the system studied. An appropriate model connects the experimental change to particle behaviour instead of merely reciting a list of factors.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Nhiệt độ tác động qua năng lượng của tiểu phân\nKhi tăng nhiệt độ, chuyển động của tiểu phân thay đổi và phần va chạm có đủ năng lượng vượt rào cản thường tăng. Tốc độ vì thế thường tăng. Điều này không nói mọi va chạm đều thành công, cũng không có nghĩa phản ứng đổi từ thu nhiệt sang toả nhiệt chỉ vì được làm nóng.\nỞ một khoảng nhiệt độ phù hợp, bài tập có thể cho hệ số nhiệt độ γ: mỗi lần tăng 10 °C thì tốc độ tăng γ lần. Nếu dữ kiện giả định là γ = 2, tăng 20 °C ứng với hai khoảng nên tăng khoảng bốn lần. Đây là mô hình áp dụng với điều kiện đã nêu, không phải quy tắc hai lần cho mọi phản ứng ở mọi nhiệt độ. Đọc miền áp dụng trước khi kéo dài phép tính sang một khoảng nhiệt độ khác hoặc suy ra điều gì về độ bền của chất.',
        en: '## Temperature changes the particle-energy picture\nRaising temperature changes particle motion and generally increases the fraction of collisions energetic enough to cross an activation barrier. Rates therefore commonly increase. This does not mean every collision succeeds, nor does heating alone turn an endothermic reaction into an exothermic one.\nOver a suitable interval, an exercise may supply a temperature coefficient γ: each 10 °C increase multiplies the rate by γ. For the hypothetical value γ = 2, a 20 °C increase spans two intervals and gives an approximate fourfold change. This is a conditional model, not a universal doubling rule at every temperature. Read its range of application before extending a calculation to a different interval or drawing conclusions about substance stability. Numerical convenience is not evidence that the approximation applies everywhere.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Bề mặt chỉ có ý nghĩa khi còn bề mặt để phản ứng\nVới cùng khối lượng đá vôi, nghiền nhỏ thường làm tăng diện tích tiếp xúc với dung dịch axit. Nhiều vị trí trên chất rắn có thể tham gia cùng lúc hơn nên tốc độ tăng trong điều kiện thích hợp. Công thức CaCO₃ và khối lượng mol của nó không vì nghiền nhỏ mà thay đổi.\nNếu chất đã hoà tan hoàn toàn, không còn bề mặt của những hạt rắn ban đầu để giải thích tốc độ theo cùng cách ấy. Cần phân biệt phản ứng có pha rắn với phản ứng giữa các tiểu phân đã ở trong dung dịch. Khi so đá vôi cục và bột, giữ cùng khối lượng, thành phần mẫu, lượng và nồng độ axit, nhiệt độ, cách khuấy và cách thu khí. Thay đổi đồng thời nhiều yếu tố khiến kết luận không còn chỉ phản ánh diện tích tiếp xúc, dù hai bình cho hiện tượng khác nhau rõ rệt.',
        en: '## Surface area matters when a reactive surface remains\nFor equal limestone masses, grinding commonly increases the area exposed to acid solution. More sites on the solid can interact at once, raising the rate under suitable conditions. Grinding does not change the CaCO₃ formula or its molar mass.\nAfter complete dissolution, the original solid-grain surface no longer exists to explain the rate in that way. Distinguish a reaction involving a solid phase from one between species already in solution. To compare limestone lumps and powder, control mass, sample composition, acid amount and concentration, temperature, stirring and gas collection. Changing several factors together prevents attributing the result to surface area alone, even if the vessels look strikingly different. A controlled comparison isolates a cause rather than simply creating an observable contrast.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'CaCO3 + HCl -> CaCl2 + CO2 + H2O',
      },
      caption: {
        vi: 'Cùng lượng CaCO₃ có thể phản ứng nhanh chậm khác nhau; hệ số không đổi khi nghiền nhỏ.',
        en: 'Equal amounts of CaCO₃ can react at different rates; grinding leaves stoichiometric ratios unchanged.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Xúc tác đổi con đường, không đổi hai đầu\nChất xúc tác có thể tham gia vào những bước trung gian rồi được tái tạo trong chu trình phản ứng. Vì có con đường phản ứng khác với năng lượng hoạt hoá thấp hơn, hệ có thể chuyển hoá nhanh hơn. Cách diễn đạt “xúc tác không tham gia phản ứng” quá tuyệt đối: điều cần nhấn mạnh là nó không bị tiêu hao theo phương trình tổng của chu trình lí tưởng.\nVới cùng trạng thái đầu và cuối, xúc tác không làm đổi ΔH. Trong hệ thuận nghịch ở cùng nhiệt độ, nó giúp hệ đạt cân bằng nhanh hơn nhưng không tự làm thay đổi thành phần cân bằng. Phân biệt tốc độ với lượng sản phẩm cuối cùng rất cần ở đây. Một thí nghiệm dừng sau một thời gian ngắn có thể thu nhiều sản phẩm hơn khi có xúc tác vì phản ứng đã tiến xa hơn, chứ chưa đủ chứng minh cân bằng được chuyển dịch.',
        en: '## A catalyst changes the route, not the endpoints\nA catalyst can participate in intermediate steps and then be regenerated within a reaction cycle. An alternative pathway with lower activation energy can allow faster conversion. “A catalyst never participates in the reaction” is too absolute: the key point is that it is not consumed by the overall equation of an ideal catalytic cycle.\nFor identical initial and final states, a catalyst does not change ΔH. In a reversible system at the same temperature, it speeds the approach to equilibrium without itself changing equilibrium composition. Distinguishing rate from final product amount matters here. An experiment stopped early may contain more product with a catalyst because the system has progressed further; that alone does not demonstrate an equilibrium shift.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Kết luận từ phép so sánh nào?\nGiả sử một nhóm vừa tăng nồng độ axit vừa nghiền nhỏ đá vôi, rồi thấy khí thoát nhanh hơn. Kết quả phù hợp với việc tốc độ đã thay đổi, nhưng chưa tách được tác dụng của từng yếu tố. Muốn xét riêng nồng độ, cần giữ dạng và lượng đá vôi cùng những điều kiện khác như nhau, chỉ thay nồng độ theo kế hoạch so sánh.\nCũng cần phân biệt phản ứng diễn ra nhanh với tổng lượng khí khi phản ứng kết thúc. Nếu lượng chất giới hạn không đổi và phản ứng hoàn toàn theo cùng phương trình, một yếu tố chỉ tác động đến tốc độ không nhất thiết làm tăng tổng sản phẩm. Khi giải bài, hãy viết ba dòng: đo đại lượng nào theo thời gian, thay một yếu tố nào, giữ những điều kiện nào. Ba dòng ấy giúp nối mô hình va chạm với bằng chứng và tránh một kết luận vượt quá dữ liệu thực sự có.',
        en: '## What does the comparison establish?\nSuppose a group both increases acid concentration and powders limestone, then observes faster gas release. The result indicates a rate difference but does not separate the contributions of the two changes. To study concentration alone, keep limestone form and amount, together with other relevant conditions, the same while varying concentration deliberately.\nAlso distinguish faster gas evolution from the total gas collected after completion. If the limiting amount is unchanged and the same reaction goes to completion, a factor affecting rate alone need not increase final yield. When analysing an exercise, state three things: the quantity monitored over time, the single variable changed, and the conditions controlled. These statements link the collision model to evidence and prevent conclusions broader than the data support. A clear experiment is as important as a correct calculation.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: 'Tốc độ mất một chất, tốc độ phản ứng theo hệ số và tổng lượng sản phẩm là ba cách hỏi khác nhau. Kiểm đề trước khi chọn đại lượng.',
        en: 'A species disappearance rate, a coefficient-normalised reaction rate and final product amount answer different questions. Read the requested quantity first.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: [
        'reaction-rate-004',
        'reaction-rate-009',
        'reaction-rate-016',
        'reaction-rate-017',
        'reaction-rate-020',
      ],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
  ],
});
