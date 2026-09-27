// كل تصنيف عبارة عن مصفوفة أسئلة
// كل سؤال: { question, options: [4 اختيارات], correctIndex }

module.exports = {
  javascript: {
    label: "🟨 JavaScript",
    questions: [
      {
        question: "إيه ناتج: typeof null",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        correctIndex: 1,
      },
      {
        question: "أنهي كلمة بتستخدم لتعريف متغير مايتغيرش؟",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
      },
      {
        question: "إيه بتعمل الدالة map()؟",
        options: [
          "بتفلتر عناصر المصفوفة",
          "بترجع مصفوفة جديدة بنفس الطول بعد تعديل كل عنصر",
          "بتحذف عنصر من المصفوفة",
          "بترتب المصفوفة",
        ],
        correctIndex: 1,
      },
      {
        question: "إيه هو الفرق بين == و ===؟",
        options: [
          "مفيش فرق",
          "=== بتقارن القيمة بس، == بتقارن القيمة والنوع",
          "== بتقارن القيمة بس، === بتقارن القيمة والنوع",
          "=== بتستخدم للنصوص فقط",
        ],
        correctIndex: 2,
      },
      {
        question: "إيه ناتج: [1,2,3].length",
        options: ["2", "3", "4", "undefined"],
        correctIndex: 1,
      },
    ],
  },
  python: {
    label: "🐍 Python",
    questions: [
      {
        question: "إزاي بتعمل تعليق (comment) في بايثون؟",
        options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
        correctIndex: 1,
      },
      {
        question: "إيه نوع البيانات الناتج من: type([])",
        options: ["dict", "tuple", "list", "set"],
        correctIndex: 2,
      },
      {
        question: "إزاي بتضيف عنصر لآخر list؟",
        options: ["list.push(x)", "list.add(x)", "list.append(x)", "list.insert(x)"],
        correctIndex: 2,
      },
      {
        question: "إيه ناتج: len('Raghad')",
        options: ["5", "6", "7", "خطأ"],
        correctIndex: 1,
      },
      {
        question: "أنهي دي مش نوع بيانات أساسي في بايثون؟",
        options: ["int", "float", "char", "bool"],
        correctIndex: 2,
      },
    ],
  },
  general: {
    label: "💡 أساسيات برمجة عامة",
    questions: [
      {
        question: "إيه هو الـ Big O لعملية البحث الثنائي (Binary Search)؟",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctIndex: 2,
      },
      {
        question: "أنهي دي بنية بيانات بتشتغل بنظام LIFO؟",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctIndex: 1,
      },
      {
        question: "إيه معنى API؟",
        options: [
          "Application Programming Interface",
          "Advanced Programming Instruction",
          "Automated Program Integration",
          "Application Process Integration",
        ],
        correctIndex: 0,
      },
      {
        question: "إيه هو الغرض من الـ Git؟",
        options: [
          "تصميم واجهات المستخدم",
          "إدارة قواعد البيانات",
          "تتبع التغييرات في الكود والتحكم في الإصدارات",
          "كتابة اختبارات الكود فقط",
        ],
        correctIndex: 2,
      },
      {
        question: "أنهي دي مش من مبادئ البرمجة الكائنية (OOP)؟",
        options: ["Inheritance", "Encapsulation", "Compilation", "Polymorphism"],
        correctIndex: 2,
      },
    ],
  },
};
