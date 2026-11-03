// DANH MỤC BÀI TẬP
// Thêm bài: tạo data/<slug>.js rồi thêm một dòng vào "lessons" của chương tương ứng.
// Thêm chương: thêm một khối { id, so, title, lessons: [...] } theo đúng thứ tự trong sách.
// Bài chưa soạn xong: thêm soon: true để hiện "Sắp có".
// de: số mã đề soạn sẵn của bài (khớp với số phần tử của sets trong data/<slug>.js).
window.CATALOG = {
  title: "Toán 11",
  chapters: [
    {
      id: "c2",
      so: "Chương II",
      title: "Dãy số. Cấp số cộng. Cấp số nhân",
      lessons: [
        { slug: "day-so",      so: "Bài 5", title: "Dãy số",      formula: "(u<sub>n</sub>)",
          desc: "Số hạng, hệ thức truy hồi, dãy tăng/giảm, bị chặn, bài toán thực tế.", minutes: 45, de: 3 },
        { slug: "cap-so-cong", so: "Bài 6", title: "Cấp số cộng", formula: "u<sub>n+1</sub> = u<sub>n</sub> + d",
          desc: "Công sai, số hạng tổng quát, tổng n số hạng đầu, bài toán thực tế.", minutes: 45, de: 3 },
        { slug: "cap-so-nhan", so: "Bài 7", title: "Cấp số nhân", formula: "u<sub>n+1</sub> = u<sub>n</sub> · q",
          desc: "Công bội, số hạng tổng quát, tổng n số hạng đầu, bài toán thực tế.", minutes: 45, de: 3 }
      ]
    }
  ]
};
